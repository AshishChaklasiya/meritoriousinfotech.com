import {
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Plane,
  Points,
  Raycaster,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three"

/*
 * Home hero: a dot-matrix "terrain" — the site's engineering grid made
 * physical. Everything moves in the vertex shader (one draw call, no per-frame
 * CPU work per point). The pointer drops a ripple that heats dots to brand
 * orange; with no pointer the ripple wanders on its own.
 */

const COLS = 150
const ROWS = 70
const WIDTH = 30
const DEPTH = 16

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPointerStrength;
  uniform float uPixelRatio;
  uniform float uCalm;
  varying float vAlpha;
  varying float vHeat;

  void main() {
    vec3 p = position;
    float wave =
      sin(p.x * 0.42 + uTime * 0.55) * 0.32 +
      cos(p.z * 0.58 + uTime * 0.4) * 0.24 +
      sin((p.x + p.z) * 0.22 + uTime * 0.3) * 0.28;
    wave *= uCalm;

    float d = distance(p.xz, uPointer);
    float ripple = exp(-d * d * 0.4) * uPointerStrength;
    p.y += wave + ripple * 0.9 + sin(d * 2.6 - uTime * 3.2) * ripple * 0.25;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.9 + ripple * 1.3) * uPixelRatio * (9.0 / -mv.z);

    float far = smoothstep(22.0, 7.0, -mv.z);
    float sides = 1.0 - smoothstep(10.0, 15.0, abs(p.x));
    vAlpha = far * sides;
    vHeat = clamp(ripple * 1.2 + smoothstep(0.45, 0.85, wave) * 0.35, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uHot;
  uniform float uOpacity;
  uniform vec2 uResolution;
  varying float vAlpha;
  varying float vHeat;

  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float soft = smoothstep(0.5, 0.3, r);

    // Quiet zone behind the headline + lead copy: dots dim and stay cool
    // there so the text always reads cleanly.
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec2 q = (vec2(uv.x, 1.0 - uv.y) - vec2(0.5, 0.46)) / vec2(0.36, 0.3);
    float open = smoothstep(0.75, 1.25, length(q));
    float heat = vHeat * mix(0.15, 1.0, open);

    vec3 color = mix(uBase, uHot, heat);
    float alpha = soft * vAlpha * uOpacity * mix(0.45, 1.0, heat);
    gl_FragColor = vec4(color, alpha * mix(0.14, 1.0, open));
  }
`

export type HeroScene = {
  /** Pointer in canvas-relative NDC (-1..1), or null when it leaves */
  setPointer(ndc: { x: number; y: number } | null): void
  /** 0 at rest, 1 when the hero has scrolled away */
  setScroll(progress: number): void
  setActive(active: boolean): void
  dispose(): void
}

export function createHeroScene(
  canvas: HTMLCanvasElement,
  { onFirstFrame }: { onFirstFrame?: () => void } = {}
): HeroScene {
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: "high-performance",
  })
  let pixelRatio = Math.min(window.devicePixelRatio, 1.75)
  renderer.setPixelRatio(pixelRatio)

  const scene = new Scene()
  const camera = new PerspectiveCamera(42, 1, 0.1, 60)
  camera.position.set(0, 3.1, 10)
  camera.lookAt(0, -0.4, -2)

  const positions = new Float32Array(COLS * ROWS * 3)
  for (let row = 0, i = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++, i += 3) {
      positions[i] = (col / (COLS - 1) - 0.5) * WIDTH
      positions[i + 1] = 0
      positions[i + 2] = (row / (ROWS - 1) - 0.5) * DEPTH - 3
    }
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute("position", new BufferAttribute(positions, 3))

  const uniforms = {
    uTime: { value: 0 },
    uPointer: { value: new Vector2(0, 0) },
    uPointerStrength: { value: 0 },
    uPixelRatio: { value: pixelRatio },
    uResolution: { value: new Vector2(1, 1) },
    uCalm: { value: 1 },
    uOpacity: { value: 1 },
    uBase: { value: new Color("#8a8a8c") },
    uHot: { value: new Color("#ff7c1a") },
  }
  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
  })
  scene.add(new Points(geometry, material))

  // Pointer → point on the y=0 plane
  const raycaster = new Raycaster()
  const ground = new Plane(new Vector3(0, 1, 0), 0)
  const hit = new Vector3()
  const pointerTarget = new Vector2(0, 0)
  let pointerActive = false
  let scroll = 0

  function resize() {
    const { clientWidth: w, clientHeight: h } = canvas
    if (!w || !h) return
    renderer.setSize(w, h, false)
    renderer.getDrawingBufferSize(uniforms.uResolution.value)
    camera.aspect = w / h
    // Narrower viewports: pull back so the terrain still spans the width
    camera.position.z = w / h < 1.2 ? 13 : 10
    camera.updateProjectionMatrix()
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas)
  resize()

  let frames = 0
  let slowFrames = 0
  let last = performance.now()
  let elapsed = 0

  function frame(now: number) {
    const delta = Math.min((now - last) / 1000, 0.05)
    last = now
    elapsed += delta
    uniforms.uTime.value = elapsed

    if (!pointerActive) {
      // Idle: the ripple wanders a slow lissajous path
      pointerTarget.set(
        Math.sin(elapsed * 0.35) * 7,
        Math.cos(elapsed * 0.25) * 2.5
      )
    }
    uniforms.uPointer.value.lerp(pointerTarget, 0.06)
    const strength = pointerActive ? 1 : 0.55
    uniforms.uPointerStrength.value +=
      (strength - uniforms.uPointerStrength.value) * 0.05
    uniforms.uCalm.value = 1 - scroll * 0.6
    uniforms.uOpacity.value = 1 - scroll * 0.7
    camera.position.y = 3.1 + scroll * 1.4

    renderer.render(scene, camera)

    if (frames === 0) onFirstFrame?.()
    // Adaptive quality: sustained slow frames drop to 1x pixel ratio
    frames++
    if (delta > 1 / 40) slowFrames++
    if (frames === 90 && slowFrames > 30 && pixelRatio > 1) {
      pixelRatio = 1
      renderer.setPixelRatio(1)
      uniforms.uPixelRatio.value = 1
      resize()
    }
  }

  let running = false
  function setActive(active: boolean) {
    if (active === running) return
    running = active
    last = performance.now()
    renderer.setAnimationLoop(active ? frame : null)
  }

  return {
    setPointer(ndc) {
      if (!ndc) {
        pointerActive = false
        return
      }
      raycaster.setFromCamera(new Vector2(ndc.x, ndc.y), camera)
      if (raycaster.ray.intersectPlane(ground, hit)) {
        pointerActive = true
        pointerTarget.set(hit.x, hit.z)
      }
    },
    setScroll(progress) {
      scroll = progress
    },
    setActive,
    dispose() {
      setActive(false)
      resizeObserver.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    },
  }
}
