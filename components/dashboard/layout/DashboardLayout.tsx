import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
  sidebar: ReactNode;
  topbar: ReactNode;
};

export default function DashboardLayout({
  children,
  sidebar,
  topbar,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      {sidebar}

      <div className="flex flex-1 flex-col">
        {topbar}

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}