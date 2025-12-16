import { Coffee, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { History } from "lucide-react";

export default function Home() {
  return (
    <>
      <header>
        <h1>Espresso Log에 오신걸 환영합니다.</h1>
      </header>
      <Link
        to="/brew"
        className="
        justify-center flex
        p-3 rounded-xl 
        bg-amber-700 active:bg-amber-800 
        font-semibold text-white shadow-md 
        hover:shadow-lg transition-shadow"
      >
        <Coffee size={18} className="px-1" />
        <span>추출하러 가기</span>
      </Link>
      <section>
        <div className="flex items-center gap-2">
          <History size={18} />
          <h2 className="text-lg font-semibold mb-3">최근 샷</h2>
        </div>
        <div className="rounded-2xl bg-white shadow-sm border border-black/5 p-4">
          <div className="flex item-start gap-3">
            <FileText size={18} />
            <div className="space-y-3">
              <p className="font-medium m-0">아직 기록이 없어요</p>
              <p className="text-sm text-neutral-500">
                첫 샷을 기록해보면 여기서 바로 확인할 수 있어요.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
