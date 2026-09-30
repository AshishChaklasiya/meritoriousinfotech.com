const STATS = [
  { value: "96", label: "Projects Completed" },
  { value: "190", label: "Happy Customers" },
  { value: "12", label: "Experienced Staff" },
  { value: "46", label: "Ongoing Projects" },
]

export function StatsSection() {
  return (
    <section aria-label="Company at a glance" className="bg-surface">
      <dl
        data-anim="stagger"
        className="container-content grid grid-cols-2 lg:grid-cols-4 lg:py-4"
      >
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex justify-center border-divider p-6 even:border-l max-lg:nth-[n+3]:border-t sm:p-10 lg:border-l lg:p-12 lg:first:border-l-0"
          >
            {/* dt precedes dd in the DOM; reversed visually so the figure sits on top */}
            <div className="flex flex-col-reverse gap-1">
              <dt className="pt-2 text-caption font-medium tracking-[0.08em] text-ink uppercase">
                {stat.label}
              </dt>
              <dd className="text-stat font-semibold text-ink">
                {/* Server-rendered final value; counts up from 0 in view */}
                <span data-anim="counter" data-delay="0.2">
                  {stat.value}
                </span>{" "}
                <span className="text-brand">+</span>
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  )
}
