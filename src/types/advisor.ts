export interface AnswerSection {
  heading: string;
  bullets: string[];
}

export interface AnswerBlock {
  title: string;
  summary: string;
  sections: AnswerSection[];
}

export interface RedemptionOption {
  id: string;
  label: string;
  type: string;
  points_required: number;
  cash_value: number;
  availability: string;
  value_per_point: number;
}

export interface EvidenceBlock {
  points_balance: number;
  currency: string;
  redemption_options: RedemptionOption[];
}

export interface AnalysisBlock {
  best_option_id: string;
  best_option_label: string;
  value_per_point: number;
  remaining_points: number;
}

export interface AdvisorResponse {
  pillar: string;
  mode: string;
  tool_policy: { allowed_tools: string[] };
  answer: AnswerBlock;
  evidence: EvidenceBlock;
  analysis: AnalysisBlock;
}
