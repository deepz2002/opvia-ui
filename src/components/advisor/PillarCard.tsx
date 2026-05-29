"use client";

interface PillarCardProps {
  title: string;
  description: string;
  icon: string;
  active?: boolean;
  onClick?: () => void;
  loading?: boolean;
}

export function PillarCard({
  title,
  description,
  icon,
  active = false,
  onClick,
  loading = false,
}: PillarCardProps) {
  return (
    <div
      className={`
        relative rounded-2xl border p-6 flex flex-col gap-4 transition-all duration-200
        ${active
          ? "border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-100"
          : "border-slate-200 bg-white"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{icon}</span>
        <div>
          <h3 className="font-semibold text-slate-800 text-lg">{title}</h3>
          <p className="text-slate-500 text-sm">{description}</p>
        </div>
      </div>

      {active ? (
        <button
          onClick={onClick}
          disabled={loading}
          className={`
            mt-auto w-full rounded-xl py-2.5 text-sm font-medium transition-colors
            ${loading
              ? "bg-indigo-300 text-white cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
            }
          `}
        >
          {loading ? "Asking advisor…" : "Ask advisor"}
        </button>
      ) : (
        <button
          disabled
          className="mt-auto w-full rounded-xl py-2.5 text-sm font-medium bg-slate-100 text-slate-400 cursor-not-allowed"
        >
          Demo disabled
        </button>
      )}
    </div>
  );
}
