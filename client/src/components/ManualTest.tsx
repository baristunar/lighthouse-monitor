import { useState, useEffect } from 'react';
import { domainApi, metricsApi } from '../services/api';
import CustomSelect from './CustomSelect';
import type { Domain, Metric } from '../types';

interface ManualTestProps {
  onTestComplete: () => void;
}

export default function ManualTest({ onTestComplete }: ManualTestProps) {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [selectedDomainId, setSelectedDomainId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<Metric | null>(null);

  useEffect(() => {
    loadDomains();
  }, []);

  const loadDomains = async () => {
    try {
      const response = await domainApi.getAll();
      setDomains(response.data);
      if (response.data.length > 0) {
        setSelectedDomainId(response.data[0]._id);
      }
    } catch (error) {
      console.error('Failed to load domains:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDomainId) {
      setError('Please select a domain');
      return;
    }
    
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const response = await metricsApi.runTest(selectedDomainId);
      setResult(response.data);
      onTestComplete();
    } catch (err) {
      setError('Failed to run test. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const domainOptions = domains.map(d => ({
    value: d._id,
    label: d.url
  }));

  return (
    <div className="manual-test-section">
      <h2>⚡ Manual Test</h2>
      <div className="info-notice" style={{ 
        backgroundColor: '#fff3cd', 
        border: '1px solid #ffc107', 
        padding: '12px 16px', 
        borderRadius: '6px', 
        marginBottom: '20px',
        fontSize: '14px',
        color: '#856404'
      }}>
        ℹ️ <strong>Note:</strong> Tests run on a free-tier server with limited resources. 
        Scores may be lower than actual site performance due to server constraints, not your website.
      </div>
      <form onSubmit={handleSubmit} className="test-form">
        <CustomSelect
          label="Select Domain:"
          value={selectedDomainId}
          onChange={setSelectedDomainId}
          options={domainOptions}
        />
        <button type="submit" disabled={loading || !selectedDomainId}>
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
