type Domain = string;

interface Opportunity {
  auditId: string;
  title: string;
  description: string;
  score: number;
  displayValue: string;
  numericValue: number;
  numericUnit: string;
}

interface Diagnostic {
  auditId: string;
  title: string;
  description: string;
  score: number;
  displayValue: string;
}

interface MetricsData {
    domain: Domain;
    performance?: number;
    lcp?: number;
    fcp?: number;
    cls?: number;
    tbt?: number;
    opportunities?: Opportunity[];
    diagnostics?: Diagnostic[];
}

export { MetricsData, Domain, Opportunity, Diagnostic };