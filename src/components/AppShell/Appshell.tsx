import { NavLink, Outlet } from "react-router-dom";

type TabKey = "home" | "brew" | "logs";

// 타입 객체 선언 다음에 붙어있는 빈배열은 배열 선언을 위함.
const TABS: { key: TabKey; label: string; to: string }[] = [
  // 각 페이지의 고유한 값을 key값으로 지정
  { key: "home", label: "홈", to: "/" },
  { key: "brew", label: "추출", to: "/brew" },
  { key: "logs", label: "기록", to: "/logs" },
];

export default function AppShell() {
  return (
    <div className="min-h-screen bg-neutral-900 flex justify-center">
      <div className="w-full max-w-[420px] bg-amber-100 shadow-lg sm:rounded-2xl overflow-hidden min-h-screen flex flex-col">
        <main className="overflow-y-auto px-4 pt-6 pb-20 flex-1 min-h-0">
          <Outlet />
        </main>

        <nav className="shrink-0 h-16 bg-white border-t border-black/10">
          <div className="h-full grid grid-cols-3">
            {/* TABS.map이 가능한 이유는 위에 TABS를 배열로 선언 해놨기 때문이다.*/}
            {/* tab 다음에 화살표 함수 이후 return이 없는 이유는 () 값 인식 떄문이다. */}
            {TABS.map((tab) => (
              <NavLink
                key={tab.key}
                to={tab.to}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center text-xs
           ${isActive ? "text-amber-800 font-semibold" : "text-neutral-400"}`
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
