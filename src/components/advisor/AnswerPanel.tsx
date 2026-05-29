"use client";

import type { AnswerBlock } from "@/types/advisor";

interface AnswerPanelProps {
  answer: AnswerBlock;
}

export function AnswerPanel({ answer }: AnswerPanelProps) {
  return (
    <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-800">{answer.title}</h2>
        <p className="mt-1 text-slate-600 text-sm leading-relaxed">{answer.summary}</p>
      </div>

      <div className="space-y-4">
        {answer.sections.map((section, i) => (
          <div key={i}>
            <h3 className="text-sm font-semibold text-slate-700 mb-1.5">
              {section.heading}
            </h3>
            <ul className="space-y-1">
              {section.bullets.map((bullet, j) => (
                <li key={j} className="flex gap-2 text-sm text-slate-600">
                  <span className="mt-1 shrink-0 h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
