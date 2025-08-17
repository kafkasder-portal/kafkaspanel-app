/**
 * Security Settings Page
 * TypeScript best practices ile güvenlik ayarları sayfası
 */

import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { SecurityDashboard } from '@/components/security/SecurityDashboard';
import { useAuth } from '@/hooks/useAuth';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function SecuritySettingsPage() {
  const { user } = useAuth();
  const { trackPageView, trackFeatureUsage } = useAnalytics();

  useEffect(() => {
    trackPageView('/security/settings', 'Security Settings');
    trackFeatureUsage('security_dashboard', 'view');
  }, [trackPageView, trackFeatureUsage]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-600">
            Please log in to access security settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Security Settings - NGO Management System</title>
        <meta name="description" content="Manage your account security settings including two-factor authentication" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <SecurityDashboard 
            userId={String(user.id || user.email)}
            className="max-w-4xl mx-auto"
          />
        </div>
      </div>
    </>
  );
}
