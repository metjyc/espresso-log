import { useRef, useState } from "react";

export default function Brew() {
  const [tenth, setTenth] = useState<number>(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const handleStart = () => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setTenth((prev) => prev + 1);
    }, 100);
    setRunning(true);
  };

  const handleStop = () => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setRunning(false);
  };

  const handleReset = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setRunning(false);
    setTenth(0);
  };

  return (
    <div className="flex flex-col space-y-6">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">추출</h2>
        <p className="text-sm text-neutral-600">샷을 기록해보자 ☕️</p>
      </header>
      <section className="rounded-2xl bg-white shadow-sm border border-black/5 p-4 space-y-3">
        <p className="text-sm font-medium">타이머</p>
        <div className="text-4xl font-bold tabular-nums">00 : 00 : 00</div>
        <div className="grid grid-cols-3 gap-2">
          <button
            className="py-2 rounded-xl bg-amber-800 text-white"
            onClick={handleStart}
          >
            Start
          </button>
          <button
            className="py-2 rounded-xl bg-neutral-200"
            onClick={handleStop}
          >
            Stop
          </button>
          <button
            className="py-2 rounded-xl bg-neutral-200"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </section>

      <section className="rounded-2xl bg-white shadow-sm border border-black/5 p-4 space-y-4">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">도징량(g)</label>
          <input
            id="dose"
            placeholder="18g"
            className="w-full rounded-xl border border-black/10 py-2"
            inputMode="decimal"
          />
        </div>

        <div className="space-y-0.5">
          <label className="text-sm font-medium">분쇄도</label>
          <input
            placeholder="2.5"
            className="w-full rounded-xl border border-black/10 py-2"
            inputMode="decimal"
          />
        </div>

        <div className="space-y-0.5 ">
          <label className="text-sm font-medium">노트</label>
          <textarea
            placeholder="메모를 남기세요."
            className="w-full rounded-xl border border-black/10"
          />
        </div>
      </section>
      <button className="w-full rounded-xl bg-amber-700 text-white py-3 font-semibold shadow-md active:translate-y-[1px] transition ">
        추출 기록 저장하기
      </button>
    </div>
  );
}
