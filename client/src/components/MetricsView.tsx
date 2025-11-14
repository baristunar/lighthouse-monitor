import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { domainApi, metricsApi } from '../services/api';
import CustomSelect from './CustomSelect';
import type { Domain, Metric } from '../types';

export default function MetricsView() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [selectedDomainId, setSelectedDomainId] = useState('');
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);

  useEffect(() => {
    loadDomains();
  }, []);

  useEffect(() => {
    if (selectedDomainId) {
      loadMetrics(selectedDomainId);
    }
  }, [selectedDomainId]);

  const loadDomains = async () => {
    try {
      const response = await domainApi.getAll();
      setDomains(response.data);
      if (response.data.length > 0 && !selectedDomainId) {
        setSelectedDomainId(response.data[0]._id);
      }
    } catch (error) {
      console.error('Failed to load domains:', error);
    }
  };

  const loadMetrics = async (domainId: string) => {
    setLoading(true);
    try {
      const response = await metricsApi.getByDomainId(domainId);
      setMetrics(response.data);
    } catch (error) {
      console.error('Failed to load metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = metrics
    .map(m => ({
      date: format(new Date(m.created_at), 'MM/dd HH:mm'),
      performance: m.performance,
      lcp: m.lcp / 1000,
      fcp: m.fcp / 1000,
      cls: m.cls * 100,
      tbt: m.tbt / 10,
    }))
    .reverse();

  const latestMetric = metrics[0];

  const domainOptions = domains.map(d => ({
    value: d._id,
    label: d.url
  }));

  return (
    <div className="metrics-section">
      <h2>📊 Performance Reports</h2>
      
      <div className="info-notice" style={{ 
        backgroundColor: '#d1ecf1', 
        border: '1px solid #bee5eb', 
        padding: '12px 16px', 
        borderRadius: '6px', 
        marginBottom: '20px',
        fontSize: '14px',
        color: '#0c5460'
      }}>
        ℹ️ <strong>Important:</strong> Tests are performed from a free-tier cloud server. 
        Performance scores may be affected by server limitations and network latency, 
        not reflecting actual user experience from all locations.
      </div>
      
      {domains.length === 0 ? (
        <p className="no-data">No domains added yet. Please add a domain first.</p>
      ) : (
        <>
          <div className="domain-selector">
            <CustomSelect
              label="Select Domain:"
              value={selectedDomainId}
              onChange={setSelectedDomainId}
              options={domainOptions}
            />
          </div>

          {loading && (
            <div className="loading">
              <p>📊 Loading metrics...</p>
            </div>
          )}

          {!loading && metrics.length === 0 && selectedDomainId && (
            <p className="no-data">No metrics available for this domain yet. Run a manual test or wait for the cron job.</p>
          )}

          {!loading && metrics.length > 0 && (
            <>
              {latestMetric && (
                <div className="latest-metrics">
                  <h3>Latest Metrics</h3>
                  <div className="metrics-grid">
                    <div className="metric-card">
                      <span className="metric-label">Performance</span>
                      <span className={`metric-value ${getScoreClass(latestMetric.performance)}`}>
                        {latestMetric.performance.toFixed(0)}
                      </span>
                    </div>
                    <div className="metric-card">
                      <span className="metric-label">LCP</span>
                      <span className="metric-value">{(latestMetric.lcp / 1000).toFixed(2)}s</span>
                    </div>
                    <div className="metric-card">
                      <span className="metric-label">FCP</span>
                      <span className="metric-value">{(latestMetric.fcp / 1000).toFixed(2)}s</span>
                    </div>
                    <div className="metric-card">
                      <span className="metric-label">CLS</span>
                      <span className="metric-value">{latestMetric.cls.toFixed(3)}</span>
                    </div>
                    <div className="metric-card">
                      <span className="metric-label">TBT</span>
                      <span className="metric-value">{latestMetric.tbt.toFixed(0)}ms</span>
                    </div>
                  </div>
                  <p className="last-updated">
                    Last updated: {format(new Date(latestMetric.created_at), 'PPpp')}
                  </p>
                </div>
              )}

              <div className="chart-container">
                <h3>Performance Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="performance" stroke="#8884d8" name="Performance" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-container">
                <h3>Core Web Vitals (seconds)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="lcp" stroke="#82ca9d" name="LCP (s)" />
                    <Line type="monotone" dataKey="fcp" stroke="#ffc658" name="FCP (s)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {latestMetric?.opportunities && latestMetric.opportunities.length > 0 && (
                <div className="opportunities">
                  <h3>💡 Top Opportunities</h3>
                  <ul>
                    {latestMetric.opportunities.map((opp) => (
                      <li key={opp._id} className="opportunity-item">
                        <div className="opportunity-header" onClick={() => setExpandedMetric(expandedMetric === opp._id ? null : opp._id)}>
                          <strong>{opp.title}</strong>
                          <span className={`score ${getScoreClass(opp.score * 100)}`}>
                            {(opp.score * 100).toFixed(0)}
                          </span>
                        </div>
                        {expandedMetric === opp._id && (
                          <div className="opportunity-details">
                            <p>{opp.description}</p>
                            <p className="savings">{opp.displayValue}</p>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {latestMetric?.diagnostics && latestMetric.diagnostics.length > 0 && (
                <div className="diagnostics">
                  <h3>🔍 Diagnostics</h3>
                  <ul>
                    {latestMetric.diagnostics.map((diag) => (
                      <li key={diag._id} className="diagnostic-item">
                        <div className="diagnostic-header" onClick={() => setExpandedMetric(expandedMetric === diag._id ? null : diag._id)}>
                          <strong>{diag.title}</strong>
                          <span className={`score ${getScoreClass(diag.score * 100)}`}>
                            {(diag.score * 100).toFixed(0)}
                          </span>
                        </div>
                        {expandedMetric === diag._id && (
                          <div className="diagnostic-details">
                            <p>{diag.description}</p>
                            <p className="info">{diag.displayValue}</p>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

function getScoreClass(score: number): string {
  if (score >= 90) return 'good';
  if (score >= 50) return 'average';
  return 'poor';
}
