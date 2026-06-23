export default function MaintenancePage() {
  return (
    <>
      {/* Abstract rotating rings */}
      <div
        className="maint-graphic pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.15]"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 70%)",
        }}
      >
        <svg
          className="h-[120vh] w-auto max-w-none"
          viewBox="-200 -200 1400 1400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ringGrad1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#0456FE" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle
            cx="500"
            cy="500"
            r="400"
            stroke="url(#ringGrad1)"
            strokeWidth="80"
            strokeLinecap="round"
            className="blur-[10px]"
            strokeDasharray="1600 2500"
          />
          <circle
            cx="500"
            cy="500"
            r="400"
            stroke="url(#ringGrad1)"
            strokeWidth="40"
            strokeLinecap="round"
            className="blur-[3px]"
            strokeDasharray="1600 2500"
          />
          <circle
            cx="500"
            cy="500"
            r="490"
            stroke="#0456FE"
            strokeWidth="20"
            strokeDasharray="0 60"
            strokeLinecap="round"
            className="opacity-40"
          />
          <circle
            cx="500"
            cy="500"
            r="530"
            stroke="#2563EB"
            strokeWidth="10"
            strokeDasharray="0 40"
            strokeLinecap="round"
            className="opacity-20"
          />
        </svg>
      </div>

      {/* Central content */}
      <main className="relative z-10 flex flex-grow flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border-l border-slate-300 bg-gradient-to-r from-slate-100 to-transparent py-2 pl-4 pr-12 backdrop-blur-md">
          <div className="h-2 w-2 animate-pulse rounded-full bg-[#2563EB] shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
          <span className="text-sm font-semibold uppercase tracking-wide text-[#0F172A]">
            System Maintenance
          </span>
        </div>

        <h1 className="mb-8 text-4xl font-bold leading-[1.15] tracking-tight text-[#0F172A] md:text-5xl lg:text-[4rem]">
          Ecosystem <br className="hidden md:block" /> temporarily offline.
        </h1>

        <div className="relative max-w-2xl">
          <p
            style={{ fontFamily: "var(--font-playfair), serif" }}
            className="text-lg italic leading-relaxed text-slate-500 md:text-xl lg:text-2xl"
          >
            This website is currently under development or scheduled technical
            maintenance. We will be back online very soon.
          </p>
        </div>
      </main>

      {/* Studio 17 signature */}
      <div className="relative z-20 mt-auto flex flex-col items-center justify-center gap-3 pb-10">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 md:text-xs">
          Developed and maintained by
        </span>
        <a
          href="https://www.studio17.world/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex select-none items-baseline opacity-80 transition-all duration-300 hover:scale-105 hover:opacity-100"
        >
          <span
            className="text-2xl font-extrabold text-[#0F172A] md:text-3xl"
            style={{ letterSpacing: "-0.05em" }}
          >
            Studio
          </span>
          <span
            className="ml-1.5 text-2xl font-extrabold text-[#0F172A] md:text-3xl"
            style={{ letterSpacing: "-0.12em" }}
          >
            17
          </span>
        </a>
      </div>
    </>
  );
}
