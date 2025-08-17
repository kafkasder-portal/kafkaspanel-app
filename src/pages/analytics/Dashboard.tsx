/**
 * Analytics Dashboard Page
 * TypeScript best practices ile analytics dashboard sayfası
 */

import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';
import { useAnalytics, usePageTracking } from '@/hooks/useAnalytics';

export default function AnalyticsDashboardPage() {
  usePageTracking(); // Auto-track page view
  
  const { setUser } = useAnalytics();

  useEffect(() => {
    // Set user for analytics if available
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        setUser(userData.id || userData.email);
      } catch (error) {
        console.error('Failed to parse user data for analytics:', error);
      }
    }
  }, [setUser]);

  return (
    <>
      <Helmet>
        <title>Analytics Dashboard - NGO Management System</title>
        <meta name="description" content="Advanced analytics and insights for NGO management system" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <AnalyticsDashboard 
            className="max-w-7xl mx-auto"
            defaultDateRange={{
              start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
              end: new Date()
            }}
          />
        </div>
      </div>
    </>
  );
}
