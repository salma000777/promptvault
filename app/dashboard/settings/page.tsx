import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Settings
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your account and PromptVault preferences.
        </p>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Display name
            </label>

            <Input placeholder="Your name" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Default AI model
            </label>

            <Input
              value="Gemini"
              readOnly
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}