import { useEffect, useState } from "react";

type Shot = {
  id: string;
  createdAt: number;
  timeMs: number;
  dose?: number;
  grind?: number;
  yield?: number;
  note?: string;
};

const STORAGE_KEY = "espresso:shots";

const formatMs = (ms: number) => {
  const centi = Math.floor(ms / 10);
  const mm = String(Math.floor(centi / 6000)).padStart(2, "0");
  const ss = String(Math.floor((centi % 6000) / 100)).padStart(2, "0");
  const cc = String(centi % 100).padStart(2, "0");
  return `${mm}:${ss}:${cc}`;
};

export default function Logs() {
  const [shots, setShots] = useState<Shot[]>([]);

  const handleDelete = (id: string) => {
    setShots((prev) => {
      const next = prev.filter((s) => s.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = JSON.parse(raw ?? "[]");
    const list: Shot[] = Array.isArray(parsed) ? parsed : [];

    list.sort((a, b) => b.createdAt - a.createdAt);
    setShots(list);
  }, []);
  return (
    <>
      {shots.length === 0 ? (
        <p className="text-sm text-neutral-600">아직 기록이 없어요.</p>
      ) : (
        <ul className="space-y-2">
          {shots.map((s) => (
            <li
              key={s.id}
              className="rounded-xl bg-white p-4 border border-black/5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-sm font-medium">
                    {formatMs(s.timeMs)} 추출시간
                  </div>

                  <div className="text-sm text-neutral-600">
                    {s.dose && s.yield && `${s.dose}g 도징 → ${s.yield}g 추출`}
                  </div>

                  <div className="text-sm text-neutral-600">
                    {s.grind && ` · 분쇄도 ${s.grind}`}
                  </div>

                  <div className="text-xs text-neutral-500">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(s.id)}
                  className="text-xs px-2 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200"
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
