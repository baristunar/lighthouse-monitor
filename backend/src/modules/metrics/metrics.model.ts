import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema({
  auditId: String,  // Lighthouse audit ID
  title: String,
  description: String,
  score: Number,
  displayValue: String,
  numericValue: Number,
  numericUnit: String,
});

const diagnosticSchema = new mongoose.Schema({
  auditId: String,  // Lighthouse audit ID
  title: String,
  description: String,
  score: Number,
  displayValue: String,
});

const metricsSchema = new mongoose.Schema({
  domain: { type: String, required: true },
  performance: Number,
  lcp: Number,
  fcp: Number,
  cls: Number,
  tbt: Number,
  opportunities: [opportunitySchema],
  diagnostics: [diagnosticSchema],
  created_at: { type: Date, default: Date.now },
});

export const MetricsModel = mongoose.model("Metrics", metricsSchema);
