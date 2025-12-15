export default function Home() {
  return (
    <>
      <header>
        <h1>Espresso Log에 오신걸 환영합니다.</h1>
      </header>
      <button className="p-3 rounded-xl bg-amber-700 active:bg-amber-800 font-semibold text-white">
        추출하러 가기
      </button>
      <div>최근 샷</div>
    </>
  );
}
