const particles = [
  {
    position: "left-[7%] top-[5%]",
    size: "size-1",
    delay: "delay-0",
    duration: "duration-[4000ms]",
  },
  {
    position: "left-[22%] top-[11%]",
    size: "size-1.5",
    delay: "delay-700",
    duration: "duration-[5000ms]",
  },
  {
    position: "right-[25%] top-[8%]",
    size: "size-1",
    delay: "delay-1000",
    duration: "duration-[6000ms]",
  },
  {
    position: "right-[7%] top-[19%]",
    size: "size-0.5",
    delay: "delay-300",
    duration: "duration-[4500ms]",
  },
  {
    position: "left-[14%] top-[34%]",
    size: "size-0.5",
    delay: "delay-500",
    duration: "duration-[5500ms]",
  },
  {
    position: "right-[16%] top-[42%]",
    size: "size-1",
    delay: "delay-1000",
    duration: "duration-[5000ms]",
  },
  {
    position: "left-[44%] top-[56%]",
    size: "size-1",
    delay: "delay-700",
    duration: "duration-[6500ms]",
  },
  {
    position: "right-[33%] top-[66%]",
    size: "size-0.5",
    delay: "delay-300",
    duration: "duration-[5000ms]",
  },
  {
    position: "left-[11%] top-[78%]",
    size: "size-1",
    delay: "delay-1000",
    duration: "duration-[6000ms]",
  },
  {
    position: "right-[9%] top-[87%]",
    size: "size-0.5",
    delay: "delay-500",
    duration: "duration-[5000ms]",
  },
];

export function DashboardAmbience() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="absolute -left-52 -top-60 size-[560px] rounded-full bg-violet-600/[0.09] blur-[140px]" />

      <div className="absolute -right-60 -top-10 size-[600px] rounded-full bg-fuchsia-500/[0.065] blur-[160px]" />

      <div className="absolute left-[24%] top-[38%] size-[700px] rounded-full bg-indigo-500/[0.045] blur-[180px]" />

      <div className="absolute -bottom-80 right-[8%] size-[620px] rounded-full bg-violet-500/[0.05] blur-[170px]" />

      <div className="absolute left-[41%] top-[-160px] h-[420px] w-[320px] rotate-12 bg-gradient-to-b from-violet-300/[0.055] to-transparent blur-3xl" />

      <div className="absolute right-[4%] top-[13%] size-44 rounded-full bg-purple-400/[0.035] blur-[70px]" />

      {particles.map((particle, index) => (
        <span
          key={index}
          className={`absolute animate-pulse rounded-full bg-violet-100/50 shadow-[0_0_12px_rgba(196,181,253,0.75)] ${particle.position} ${particle.size} ${particle.delay} ${particle.duration}`}
        />
      ))}

      <span className="absolute right-[13%] top-[14%] animate-pulse text-sm text-violet-200/25 delay-500 duration-[5000ms]">
        ✦
      </span>

      <span className="absolute left-[33%] top-[27%] animate-pulse text-[10px] text-violet-200/20 delay-1000 duration-[6000ms]">
        ✦
      </span>

      <span className="absolute bottom-[28%] right-[27%] animate-pulse text-xs text-violet-200/20 delay-700 duration-[5500ms]">
        ✦
      </span>

      <span className="absolute bottom-[10%] left-[10%] animate-pulse text-[9px] text-violet-100/15 duration-[6500ms]">
        ✦
      </span>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0d1a]/5 to-[#0b0d1a]/35" />
    </div>
  );
}