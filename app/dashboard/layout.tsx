import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { CommandProvider } from "@/components/command/command-provider";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { getCommandPrompts } from "@/lib/command";
import { createClient } from "@/lib/supabase/server";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_pro")
    .eq("id", user.id)
    .maybeSingle();

  const isPro = profile?.is_pro === true;

  const prompts = await getCommandPrompts();

  return (
    <CommandProvider prompts={prompts}>
      <div className="min-h-screen bg-slate-950">
        <div className="flex min-h-screen">
          <DashboardSidebar isPro={isPro} />

          <div className="flex min-w-0 flex-1 flex-col">
            <DashboardTopbar
              email={user.email ?? "user"}
            />

            <main className="flex-1 overflow-y-auto">
              <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </CommandProvider>
  );
}