import { useEffect, useRef, useState } from "react";

export default function Brew() {
  const [accMs, setAccMs] = useState<number>(0);
  const [running, setRunning] = useState(false);
  const [tick, setTick] = useState(0);
  const [timeText, setTimeText] = useState("");

  const intervalRef = useRef<number | null>(null);
  const startMsRef = useRef<number | null>(null);

  const now = performance.now();
  const elapsedMs =
    running && startMsRef.current !== null
      ? accMs + (now - startMsRef.current)
      : accMs;

  const centi = Math.floor(elapsedMs / 10);
  const mm = String(Math.floor(centi / 6000)).padStart(2, "0");
  const ss = String(Math.floor((centi % 6000) / 100)).padStart(2, "0");
  const cc = String(centi % 100).padStart(2, "0");
  const display = `${mm}:${ss}:${cc}`;

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const handleStart = () => {
    if (running) return;
    if (intervalRef.current !== null) return;
    startMsRef.current = performance.now();
    setRunning(true);
    intervalRef.current = window.setInterval(() => {
      setTick((t) => t + 1);
    }, 50);
  };

  const handleStop = () => {
    if (!running) return;

    const start = startMsRef.current;
    if (start !== null) {
      const delta = performance.now() - start;
      const nextAccms = accMs + delta;

      setAccMs(nextAccms);
      setTimeText(formatMs(nextAccms));
    }

    startMsRef.current = null;
    setRunning(false);

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleReset = () => {
    if (running) handleStop();
    setAccMs(0);
  };

  const formatMs = (ms: number) => {
    return `${mm}:${ss}:${cc}`;
  };

  return (
    <div className="flex flex-col space-y-6">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold">추출</h2>
        <p className="text-sm text-neutral-600">샷을 기록해보자 ☕️</p>
      </header>
      <section className="rounded-2xl bg-white shadow-sm border border-black/5 p-4 space-y-3">
        <p className="text-sm font-medium">타이머</p>
        <div className="text-4xl font-bold tabular-nums">{display}</div>
        <div className="grid grid-cols-3 gap-2">
          <button
            className="py-2 rounded-xl bg-amber-800 text-white"
            onClick={handleStart}
            disabled={running}
          >
            Start
          </button>
          <button
            className="py-2 rounded-xl bg-neutral-200"
            onClick={handleStop}
            disabled={!running}
          >
            Stop
          </button>
          <button
            className="py-2 rounded-xl bg-neutral-200"
            onClick={handleReset}
            disabled={centi === 0}
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

        <div className="space-y-0.5">
          <label className="text-sm font-medium">추출량</label>
          <input
            placeholder="36g"
            className="w-full rounded-xl border border-black/10 py-2"
            inputMode="decimal"
          />
        </div>

        <div className="space-y-0.5">
          <label className="text-sm font-medium">추출시간</label>
          <input
            value={timeText}
            placeholder="28초"
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
      <button
        className="
        justify-center flex
        p-3 rounded-xl 
        bg-amber-700 active:bg-amber-800 
        font-semibold text-white shadow-md 
        hover:shadow-lg transition-shadow"
      >
        추출 기록 저장하기
      </button>
    </div>
  );
}
