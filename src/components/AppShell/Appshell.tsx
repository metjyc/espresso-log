type TabKey = "home" | "brew" | "logs";

type AppShellProps = {
  children: React.ReactNode;
  activeTab: TabKey;
};

// 타입 객체 선언 다음에 붙어있는 빈배열은 배열 선언을 위함.
const TABS: { key: TabKey; label: string }[] = [
  { key: "home", label: "홈" },
  { key: "brew", label: "추출" },
  { key: "logs", label: "기록" },
];

export default function AppShell({ children, activeTab }: AppShellProps) {
  return (
    <div className="min-h-screen bg-neutral-900 flex justify-center">
      <div className="w-full max-w-[420px] bg-amber-100 shadow-lg sm:rounded-2xl overflow-hidden min-h-screen flex flex-col">
        <main className="overflow-y-auto px-4 pt-6 pb-20 flex-1 min-h-0">
          {children}
        </main>

        <nav className="shrink-0 h-16 bg-white border-t border-black/10">
          <div className="h-full grid grid-cols-3">
            {/* TABS.map이 가능한 이유는 위에 TABS를 배열로 선언 해놨기 때문이다.*/}
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  className={`flex flex-col items-center justify-center text-xs
            ${isActive ? "text-amber-800 font-semibold" : "text-neutral-400"}
          `}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
