import { Coffee } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="space-y-8">
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
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">최근 샷</h2>
        <div className="text-sm text-neutral-500">아직 기록이 없어요</div>
      </section>
    </div>
  );
}
