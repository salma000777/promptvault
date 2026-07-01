import PromptCard from "./PromptCard";

export default function PromptGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <PromptCard
        title="Landing Page Generator"
        category="Marketing"
      />

      <PromptCard
        title="Medical Flashcards"
        category="Education"
      />

      <PromptCard
        title="Cold Email"
        category="Business"
      />

      <PromptCard
        title="React Debugger"
        category="Coding"
      />

      <PromptCard
        title="YouTube Script"
        category="Content"
      />

      <PromptCard
        title="Instagram Caption"
        category="Social"
      />
    </div>
  );
}