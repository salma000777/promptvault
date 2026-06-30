import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import Topbar from "@/components/dashboard/topbar/Topbar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout
      sidebar={<Sidebar />}
      topbar={<Topbar />}
    >
      {children}
    </DashboardLayout>
  );
}