/**
 * Analytics Hook
 * TypeScript best practices ile analytics state management
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  analyticsEngine, 
  type AnalyticsDashboardData, 
  type AnalyticsEvent,
  type RealTimeAnalytics
} from '@/lib/analytics/analyticsEngine';

// Types
interface AnalyticsState {
  readonly isLoading: boolean;
  readonly dashboardData: AnalyticsDashboardData | null;
  readonly realTimeData: RealTimeAnalytics | null;
  readonly events: readonly AnalyticsEvent[];
  readonly error: string | null;
}

interface AnalyticsActions {
  readonly trackEvent: (event: string, category: string, properties?: Record<string, unknown>) => void;
  readonly trackPageView: (page: string, title?: string) => void;
  readonly trackBusinessMetric: (metric: string, value: number, properties?: Record<string, unknown>) => void;
  readonly trackFeatureUsage: (feature: string, action: string, properties?: Record<string, unknown>) => void;
  readonly trackError: (error: Error | string, properties?: Record<string, unknown>) => void;
  readonly loadDashboardData: (dateRange: { start: Date; end: Date }) => Promise<void>;
  readonly refreshRealTimeData: () => void;
  readonly exportData: (format?: 'json' | 'csv') => string;
  readonly clearData: () => void;
  readonly setUser: (userId: string) => void;
}

export function useAnalytics(): AnalyticsState & AnalyticsActions {
  // State
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<AnalyticsDashboardData | null>(null);
  const [realTimeData, setRealTimeData] = useState<RealTimeAnalytics | null>(null);
  const [events, setEvents] = useState<readonly AnalyticsEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Actions
  const trackEvent = useCallback((
    event: string, 
    category: string, 
    properties?: Record<string, unknown>
  ) => {
    try {
      analyticsEngine.track(event, {
        category,
        properties
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to track event');
    }
  }, []);

  const trackPageView = useCallback((page: string, title?: string) => {
    try {
      analyticsEngine.trackPageView(page, title);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to track page view');
    }
  }, []);

  const trackBusinessMetric = useCallback((
    metric: string, 
    value: number, 
    properties?: Record<string, unknown>
  ) => {
    try {
      analyticsEngine.trackBusinessMetric(metric, value, properties);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to track business metric');
    }
  }, []);

  const trackFeatureUsage = useCallback((
    feature: string, 
    action: string, 
    properties?: Record<string, unknown>
  ) => {
    try {
      analyticsEngine.trackFeatureUsage(feature, action, properties);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to track feature usage');
    }
  }, []);

  const trackError = useCallback((
    error: Error | string, 
    properties?: Record<string, unknown>
  ) => {
    try {
      analyticsEngine.trackError(error, properties);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to track error');
    }
  }, []);

  const loadDashboardData = useCallback(async (dateRange: { start: Date; end: Date }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await analyticsEngine.getDashboardData(dateRange);
      setDashboardData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshRealTimeData = useCallback(() => {
    try {
      const data = analyticsEngine.getRealTimeData();
      setRealTimeData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh real-time data');
    }
  }, []);

  const exportData = useCallback((format: 'json' | 'csv' = 'json') => {
    return analyticsEngine.exportData(format);
  }, []);

  const clearData = useCallback(() => {
    analyticsEngine.clearData();
    setDashboardData(null);
    setRealTimeData(null);
    setEvents([]);
    setError(null);
  }, []);

  const setUser = useCallback((userId: string) => {
    analyticsEngine.setUser(userId);
  }, []);

  // Effects
  useEffect(() => {
    // Load initial real-time data
    refreshRealTimeData();
    
    // Setup real-time data refresh interval
    const interval = setInterval(refreshRealTimeData, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, [refreshRealTimeData]);

  // Auto-track page views
  useEffect(() => {
    const currentPath = window.location.pathname;
    trackPageView(currentPath);
  }, [trackPageView]);

  // Memoized state
  const state = useMemo(() => ({
    isLoading,
    dashboardData,
    realTimeData,
    events,
    error
  }), [isLoading, dashboardData, realTimeData, events, error]);

  // Memoized actions
  const actions = useMemo(() => ({
    trackEvent,
    trackPageView,
    trackBusinessMetric,
    trackFeatureUsage,
    trackError,
    loadDashboardData,
    refreshRealTimeData,
    exportData,
    clearData,
    setUser
  }), [
    trackEvent,
    trackPageView,
    trackBusinessMetric,
    trackFeatureUsage,
    trackError,
    loadDashboardData,
    refreshRealTimeData,
    exportData,
    clearData,
    setUser
  ]);

  return { ...state, ...actions };
}

// Specialized hooks
export function usePageTracking() {
  const { trackPageView } = useAnalytics();
  
  useEffect(() => {
    // Track current page
    const currentPath = window.location.pathname;
    trackPageView(currentPath);
    
    // Track page changes (for SPA routing)
    const handlePopState = () => {
      trackPageView(window.location.pathname);
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, [trackPageView]);
}

export function useBusinessMetrics() {
  const { trackBusinessMetric, dashboardData, loadDashboardData } = useAnalytics();
  
  const trackDonation = useCallback((amount: number, currency: string) => {
    trackBusinessMetric('donation_amount', amount, { currency });
  }, [trackBusinessMetric]);
  
  const trackBeneficiary = useCallback((type: string) => {
    trackBusinessMetric('beneficiary_added', 1, { type });
  }, [trackBusinessMetric]);
  
  const trackMeeting = useCallback((duration: number, participants: number) => {
    trackBusinessMetric('meeting_duration', duration, { participants });
  }, [trackBusinessMetric]);
  
  const trackTask = useCallback((priority: string, category: string) => {
    trackBusinessMetric('task_completed', 1, { priority, category });
  }, [trackBusinessMetric]);
  
  return {
    trackDonation,
    trackBeneficiary,
    trackMeeting,
    trackTask,
    dashboardData,
    loadDashboardData
  };
}

export function useFeatureTracking() {
  const { trackFeatureUsage } = useAnalytics();
  
  const trackButtonClick = useCallback((buttonName: string, location: string) => {
    trackFeatureUsage(buttonName, 'click', { location });
  }, [trackFeatureUsage]);
  
  const trackFormSubmit = useCallback((formName: string, success: boolean) => {
    trackFeatureUsage(formName, 'submit', { success });
  }, [trackFeatureUsage]);
  
  const trackSearch = useCallback((query: string, results: number) => {
    trackFeatureUsage('search', 'query', { query, results });
  }, [trackFeatureUsage]);
  
  const trackExport = useCallback((type: string, format: string) => {
    trackFeatureUsage('export', 'download', { type, format });
  }, [trackFeatureUsage]);
  
  const trackAIUsage = useCallback((feature: string, prompt: string) => {
    trackFeatureUsage('ai_assistant', feature, { prompt: prompt.substring(0, 100) });
  }, [trackFeatureUsage]);
  
  return {
    trackButtonClick,
    trackFormSubmit,
    trackSearch,
    trackExport,
    trackAIUsage
  };
}

export function useErrorTracking() {
  const { trackError } = useAnalytics();
  
  const trackAPIError = useCallback((endpoint: string, status: number, message: string) => {
    trackError(`API Error: ${endpoint}`, {
      endpoint,
      status,
      message,
      type: 'api_error'
    });
  }, [trackError]);
  
  const trackJSError = useCallback((error: Error, component?: string) => {
    trackError(error, {
      component,
      stack: error.stack,
      type: 'javascript_error'
    });
  }, [trackError]);
  
  const trackValidationError = useCallback((field: string, value: string, rule: string) => {
    trackError(`Validation Error: ${field}`, {
      field,
      value: value.substring(0, 50),
      rule,
      type: 'validation_error'
    });
  }, [trackError]);
  
  return {
    trackAPIError,
    trackJSError,
    trackValidationError
  };
}

export function useRealTimeAnalytics() {
  const { realTimeData, refreshRealTimeData } = useAnalytics();
  
  useEffect(() => {
    // Refresh more frequently for real-time view
    const interval = setInterval(refreshRealTimeData, 5000); // Every 5 seconds
    
    return () => clearInterval(interval);
  }, [refreshRealTimeData]);
  
  return {
    realTimeData,
    refreshRealTimeData
  };
}
