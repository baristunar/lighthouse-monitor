import { useState } from 'react';
import { metricsApi } from '../services/api';
import type { Metric } from '../types';

interface ManualTestProps {
  onTestComplete: () => void;
}

export default function ManualTest({ onTestComplete }: ManualTestProps) {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<Metric | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const response = await metricsApi.runTest(domain);
      setResult(response.data);
      onTestComplete();
    } catch (err) {
      setError('Failed to run test. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manual-test-section">
      <h2>⚡ Manual Test</h2>
      <form onSubmit={handleSubmit} className="test-form">
        <input
          type="url"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="https://example.com"
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Running Test...' : 'Run Test'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      
      {loading && (
        <div className="loading">
          <p>🔄 Running Lighthouse test... This may take 30-60 seconds.</p>
        </div>
      )}

      {result && (
        <div className="test-result">
          <h3>Test Result for {result.domain}</h3>
          <div className="metrics-grid">
            <div className="metric-card">
              <span className="metric-label">Performance</span>
              <span className={`metric-value ${getScoreClass(result.performance)}`}>
                {result.performance.toFixed(0)}
              </span>
            </div>
            <div className="metric-card">
              <span className="metric-label">LCP</span>
              <span className="metric-value">{(result.lcp / 1000).toFixed(2)}s</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">FCP</span>
              <span className="metric-value">{(result.fcp / 1000).toFixed(2)}s</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">CLS</span>
              <span className="metric-value">{result.cls.toFixed(3)}</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">TBT</span>
              <span className="metric-value">{result.tbt.toFixed(0)}ms</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getScoreClass(score: number): string {
  if (score >= 90) return 'good';
  if (score >= 50) return 'average';
  return 'poor';
}
