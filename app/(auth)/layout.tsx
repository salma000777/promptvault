export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-12">
      <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />

      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />

      <div className="relative z-10 flex w-full justify-center">
        {children}
      </div>
    </main>
  );
}