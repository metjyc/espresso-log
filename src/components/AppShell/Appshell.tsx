type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-start">
      <div className="w-full max-w-[420px] bg-white shadow-lg sm:rounded-2xl overflow-hidden min-h-screen">
        {children}
      </div>
    </div>
  );
}
