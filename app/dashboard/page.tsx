import ActivityCard from "@/components/dashboard/cards/ActivityCard";
import PromptEditor from "@/components/dashboard/prompts/PromptEditor";
import PromptPreview from "@/components/dashboard/prompts/PromptPreview";
import PromptToolbar from "@/components/dashboard/prompts/PromptToolbar";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PromptToolbar />

      <div className="grid gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <PromptEditor />
        </div>

        <div>
          <PromptPreview />
        </div>
      </div>

      <ActivityCard />
    </div>
  );
}