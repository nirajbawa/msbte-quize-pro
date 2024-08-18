import DashboardSidebar from "@/components/DashboardSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashboardSidebar />
      {children}
    </>
  );
}
