"use client";

import { useEffect } from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/metadata";

/**
 * Task 1: TECHNICAL SEO (Global 500 / Error Page)
 * Gracefully handles server-side or client-side errors.
 * Required for modern user experience and keeping SEO value.
 */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service like Sentry
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-bold mb-4 text-red-600">500</h1>
      <h2 className="text-2xl font-semibold mb-6">Something went wrong!</h2>
      <p className="text-slate-600 mb-8 max-w-md">
        An unexpected error occurred. Our technical team has been notified.
        Please try refreshing the page or contact support if the issue persists.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="bg-blue-600 px-8 py-3 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Try Again
        </button>
        <Link 
          href="/"
          className="bg-slate-100 px-8 py-3 text-slate-800 font-semibold rounded-lg hover:bg-slate-200 transition"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
