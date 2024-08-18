import DashboardNavbar from "@/components/DashboardNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <DashboardNavbar />
      <div className="w-full h-screen fixed bg-white z-50 lg:hidden flex justify-center items-center text-xl">
        <h1>Not supported on this screen size</h1>
      </div>
      {children}
    </main>
  );
}
