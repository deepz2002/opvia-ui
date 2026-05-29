"use client";

import { useState } from "react";
import type { AdvisorResponse } from "@/types/advisor";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";
const DEMO_USER_ID = "11111111-1111-1111-1111-111111111111";

interface UseAdvisorResult {
  data: AdvisorResponse | null;
  loading: boolean;
  error: string | null;
  ask: () => Promise<void>;
  reset: () => void;
}

export function useAdvisor(): UseAdvisorResult {
  const [data, setData] = useState<AdvisorResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function ask() {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`${API_BASE}/api/advisor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pillar: "redemption", user_id: DEMO_USER_ID }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.detail?.message ?? `HTTP ${res.status}`);
      }

      const json: AdvisorResponse = await res.json();
      setData(json);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setData(null);
    setError(null);
  }

  return { data, loading, error, ask, reset };
}
