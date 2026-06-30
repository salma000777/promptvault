import QuickActionCard from "@/components/dashboard/cards/QuickActionCard";
import RecentPromptCard from "@/components/dashboard/cards/RecentPromptCard";
import StatCard from "@/components/dashboard/cards/StatCard";

export default function DashboardPage() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl font-bold">
          Welcome back 👋
        </h1>

        <p className="mt-2 text-slate-400">
          Here's what's happening in your workspace.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Total Prompts"
          value="127"
          subtitle="+12 this week"
        />

        <StatCard
          title="Folders"
          value="8"
          subtitle="Organized workspaces"
        />

        <StatCard
          title="Favorites"
          value="19"
          subtitle="Your most used prompts"
        />
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold">
          Quick Actions
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <QuickActionCard
            title="New Prompt"
            description="Create a new prompt from scratch."
          />

          <QuickActionCard
            title="Browse Templates"
            description="Start from community templates."
          />

          <QuickActionCard
            title="AI Improve"
            description="Improve an existing prompt."
          />
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold">
          Recent Prompts
        </h2>

        <div className="space-y-4">
          <RecentPromptCard
            title="Cold Email Generator"
            category="Marketing"
          />

          <RecentPromptCard
            title="Medical Study Notes"
            category="Education"
          />

          <RecentPromptCard
            title="Landing Page Copy"
            category="Business"
          />
        </div>
      </section>
    </div>
  );
}