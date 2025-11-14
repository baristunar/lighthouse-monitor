import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="app">
      <Header />
      <div className="header-description">
        <p>
          Monitor your website's Core Web Vitals, performance scores, and get actionable insights 
          to improve user experience. Automated testing every 3 hours with detailed historical data.
        </p>
      </div>
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
