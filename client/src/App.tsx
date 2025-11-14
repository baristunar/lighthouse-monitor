import { useState } from 'react';
import Layout from './components/Layout';
import AddDomainForm from './components/AddDomainForm';
import ManualTest from './components/ManualTest';
import MetricsView from './components/MetricsView';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Layout>
      <div className="top-section">
        <AddDomainForm onDomainAdded={handleRefresh} />
        <ManualTest onTestComplete={handleRefresh} />
      </div>

      <MetricsView key={refreshKey} />
    </Layout>
  );
}

export default App;
