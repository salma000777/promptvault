const activity = [
  {
    action: "Created Prompt",
    name: "Landing Page Generator",
    time: "2 min ago",
  },
  {
    action: "Improved Prompt",
    name: "Cold Email",
    time: "14 min ago",
  },
  {
    action: "Duplicated Prompt",
    name: "Medical Notes",
    time: "1 hour ago",
  },
];

export default function ActivityCard() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
      <h2 className="text-xl font-bold">
        Recent Activity
      </h2>

      <div className="mt-6 space-y-5">
        {activity.map((item) => (
          <div key={item.name}>
            <p className="font-semibold">
              {item.action}
            </p>

            <p className="text-slate-400">
              {item.name}
            </p>

            <p className="text-xs text-slate-500">
              {item.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}