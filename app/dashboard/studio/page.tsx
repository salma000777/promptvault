import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Copy,
  Sparkles,
  WandSparkles,
} from "lucide-react";

export default function StudioPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          AI Prompt Studio
        </h1>

        <p className="mt-2 text-muted-foreground">
          Analyze, score and improve your prompts.
        </p>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your prompt</CardTitle>
          </CardHeader>

          <CardContent>
            <Textarea
              placeholder="Paste your prompt here..."
              className="min-h-96 resize-none"
            />

            <Button className="mt-5 w-full">
              <WandSparkles className="size-4" />
              Optimize Prompt
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Optimized result</CardTitle>

            <Button
              variant="ghost"
              size="icon"
              disabled
            >
              <Copy className="size-4" />
            </Button>
          </CardHeader>

          <CardContent>
            <div className="flex min-h-96 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
              <Sparkles className="size-10 text-primary" />

              <p className="mt-4 font-medium">
                Your optimized prompt will appear here
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Submit a prompt to receive improvements, scoring and recommendations.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}