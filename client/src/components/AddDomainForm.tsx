import { useState, useEffect } from 'react';
import { domainApi } from '../services/api';
import type { Domain } from '../types';

interface AddDomainFormProps {
  onDomainAdded: () => void;
}

export default function AddDomainForm({ onDomainAdded }: AddDomainFormProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [domains, setDomains] = useState<Domain[]>([]);

  useEffect(() => {
    loadDomains();
  }, []);

  const loadDomains = async () => {
    try {
      const response = await domainApi.getAll();
      setDomains(response.data);
    } catch (err) {
      console.error('Failed to load domains:', err);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const urlObj = new URL(url);
      if (!urlObj.protocol.startsWith('http')) {
        setError('Invalid URL. Must start with http:// or https://');
        return;
      }
    } catch (err) {
      setError('Invalid URL format. Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    setLoading(true);

    try {
      await domainApi.create(url);
      setUrl('');
      await loadDomains();
      onDomainAdded();
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Failed to add domain';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="domain-section">
      <h2>📝 Add Domain</h2>
      <form onSubmit={handleSubmit} className="domain-form">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Domain'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}

      {domains.length > 0 && (
        <div className="domains-list">
          <h3>Monitored Domains ({domains.length})</h3>
          <ul>
            {domains.map((domain) => (
              <li key={domain._id}>
                <span>{domain.url}</span>
                <div className="domain-actions">
                  <button 
                    type="button"
                    className="visit-btn"
                    onClick={() => window.open(domain.url, '_blank')}
                    title="Visit Website"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                      <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                    </svg>
                  </button>
                  <button 
                    type="button"
                    className="copy-btn"
                    onClick={() => copyToClipboard(domain.url)}
                    title="Copy URL"
                  >
                    <svg width="16" height="16" viewBox="0 0 12 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.33845 0.75C3.63327 0.75 3.06067 1.3226 3.06067 2.02778C3.06067 2.36513 3.33206 2.6373 3.67019 2.6373C4.00813 2.6373 4.27971 2.36572 4.27971 2.02778C4.27971 1.99564 4.30631 1.96904 4.33845 1.96904H10.3816C10.4138 1.96904 10.4404 1.99566 10.4404 2.02778V10.6985C10.4404 10.7306 10.4139 10.7572 10.3816 10.7572C10.0443 10.7572 9.77209 11.0287 9.77209 11.3668C9.77209 11.7047 10.0437 11.9763 10.3816 11.9763C11.0869 11.9763 11.6594 11.4037 11.6594 10.6985V2.02778C11.6594 1.32261 11.0869 0.75 10.3816 0.75H4.33845ZM2.02778 3.02368C1.3226 3.02368 0.75 3.59628 0.75 4.30146V12.9722C0.75 13.6774 1.32259 14.25 2.02778 14.25H8.07097C8.77615 14.25 9.34875 13.6774 9.34875 12.9722L9.34875 4.30146L9.34875 4.30021C9.34521 3.59676 8.77446 3.02368 8.07097 3.02368H2.02778ZM1.9666 4.30106C1.9666 4.26892 1.9932 4.24232 2.02534 4.24232H8.06853C8.10067 4.24232 8.12727 4.26892 8.12727 4.30106V12.9693C8.12727 13.0015 8.10065 13.0281 8.06853 13.0281H2.02534C1.99322 13.0281 1.9666 13.0015 1.9666 12.9693V4.30106Z"/>
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
