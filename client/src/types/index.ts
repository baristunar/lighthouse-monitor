export interface Domain {
  _id: string;
  url: string;
  createdAt?: string;
}

export interface Opportunity {
  _id: string;
  auditId: string;
  title: string;
  description: string;
  score: number;
  displayValue: string;
  numericValue: number;
  numericUnit: string;
}

export interface Diagnostic {
  _id: string;
  auditId: string;
  title: string;
  description: string;
  score: number;
  displayValue: string;
}

export interface Metric {
  _id: string;
  domain: string;
  performance: number;
  lcp: number;
  fcp: number;
  cls: number;
  tbt: number;
  opportunities: Opportunity[];
  diagnostics: Diagnostic[];
  created_at: string;
}
