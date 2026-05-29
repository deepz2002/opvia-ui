"use client";

import { useAdvisor } from "@/hooks/useAdvisor";
import { PillarCard } from "@/components/advisor/PillarCard";
import { AnswerPanel } from "@/components/advisor/AnswerPanel";
import { EvidencePanel } from "@/components/advisor/EvidencePanel";

const PILLARS = [
  {
    id: "status",
    title: "Status",
    description: "Track your elite tier and qualifying activity.",
    icon: "🏅",
  },
  {
    id: "points",
    title: "Points",
    description: "Monitor accrual, expiry, and earning opportunities.",
    icon: "💰",
  },
  {
    id: "cards",
    title: "Cards",
    description: "Compare co-branded cards and their benefits.",
    icon: "💳",
  },
  {
    id: "promotions",
    title: "Promotions",
    description: "Discover bonus point offers and limited deals.",
    icon: "🎁",
  },
  {
    id: "redemption",
    title: "Redemption",
    description: "Find the highest-value use of your points.",
    icon: "✈️",
    active: true,
  },
];

export default function DashboardPage() {
  const { data, loading, error, ask, reset } = useAdvisor();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-10">

        {/* Header */}
        <header className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✈️</span>
            <h1 className="text-2xl font-bold text-slate-900">TravelSmarter AI Advisor</h1>
          </div>
          <p className="text-slate-500 text-sm">
            Assessment demo — Redemption pillar only. Other pillars are disabled.
          </p>
        </header>

        {/* Pillar grid */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Dashboard Pillars
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PILLARS.map((p) => (
              <PillarCard
                key={p.id}
                title={p.title}
                description={p.description}
                icon={p.icon}
                active={p.active}
                loading={loading}
                onClick={p.active ? ask : undefined}
              />
            ))}
          </div>
        </section>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center gap-3 py-12 text-indigo-600">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span className="text-sm font-medium">Consulting redemption advisor…</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 flex items-start gap-3">
            <span className="text-red-500 text-lg">⚠️</span>
            <div>
              <p className="font-semibold text-red-700 text-sm">Advisor error</p>
              <p className="text-red-600 text-sm mt-0.5">{error}</p>
              <button
                onClick={reset}
                className="mt-2 text-xs text-red-500 underline hover:text-red-700"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Result */}
        {data && !loading && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Advisor Response
              </h2>
              <button
                onClick={reset}
                className="text-xs text-slate-400 hover:text-slate-600 underline"
              >
                Clear
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-3">
                <AnswerPanel answer={data.answer} />
              </div>
              <div className="lg:col-span-2">
                <EvidencePanel evidence={data.evidence} analysis={data.analysis} />
              </div>
            </div>

            {/* Tool policy badge */}
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="text-xs text-slate-400">Tools used:</span>
              {data.tool_policy.allowed_tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500 font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
