"use client";

import type { AnalysisBlock, EvidenceBlock } from "@/types/advisor";

const AVAILABILITY_STYLE: Record<string, string> = {
  available: "bg-emerald-100 text-emerald-700",
  limited:   "bg-amber-100  text-amber-700",
  unavailable: "bg-red-100  text-red-700",
};

interface EvidencePanelProps {
  evidence: EvidenceBlock;
  analysis: AnalysisBlock;
}

export function EvidencePanel({ evidence, analysis }: EvidencePanelProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-5">
      <h2 className="text-base font-semibold text-slate-700">Evidence Panel</h2>

      {/* Points balance */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
        <span className="text-sm text-slate-500">Points balance</span>
        <span className="font-bold text-indigo-700 text-lg">
          {evidence.points_balance.toLocaleString()}
          <span className="ml-1 text-xs font-normal text-slate-400">{evidence.currency}</span>
        </span>
      </div>

      {/* Redemption options */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Redemption options
        </p>
        {evidence.redemption_options.map((opt) => {
          const isBest = opt.id === analysis.best_option_id;
          return (
            <div
              key={opt.id}
              className={`
                rounded-xl border px-4 py-3 text-sm space-y-1 transition-all
                ${isBest
                  ? "border-indigo-400 bg-indigo-50"
                  : "border-slate-200 bg-white"
                }
              `}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-800">
                  {opt.label}
                  {isBest && (
                    <span className="ml-2 rounded-full bg-indigo-600 px-2 py-0.5 text-xs text-white">
                      Best pick
                    </span>
                  )}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                    AVAILABILITY_STYLE[opt.availability] ?? "bg-slate-100 text-slate-600"
                  }`}
                >
                  {opt.availability}
                </span>
              </div>
              <div className="flex gap-4 text-slate-500 flex-wrap">
                <span>{opt.points_required.toLocaleString()} pts</span>
                <span>₹{opt.cash_value.toLocaleString()} value</span>
                <span className="font-semibold text-indigo-600">
                  ₹{opt.value_per_point.toFixed(2)}/pt
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analysis summary */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm space-y-1">
        <p className="font-semibold text-emerald-700">Analysis Summary</p>
        <p className="text-slate-600">
          Best: <span className="font-medium">{analysis.best_option_label}</span>
        </p>
        <p className="text-slate-600">
          Value: <span className="font-medium text-indigo-600">₹{analysis.value_per_point.toFixed(2)}/pt</span>
        </p>
        <p className="text-slate-600">
          Remaining after redemption:{" "}
          <span className="font-medium">{analysis.remaining_points.toLocaleString()} pts</span>
        </p>
      </div>
    </div>
  );
}
