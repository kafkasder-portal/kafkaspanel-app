/**
 * Analytics Dashboard Component
 * TypeScript best practices ile gelişmiş analytics dashboard
 */

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Activity, 
  AlertTriangle, 
  Download, 
  RefreshCw,
  BarChart3,
  LineChart
} from 'lucide-react';
import { useAnalytics, useRealTimeAnalytics } from '@/hooks/useAnalytics';
import { AnalyticsMetricCard } from './AnalyticsMetricCard';
import { AnalyticsChart } from './AnalyticsChart';
import { RealTimeWidget } from './RealTimeWidget';
import { InsightsPanel } from './InsightsPanel';

interface AnalyticsDashboardProps {
  readonly className?: string;
  readonly defaultDateRange?: {
    readonly start: Date;
    readonly end: Date;
  };
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  className = '',
  defaultDateRange
}) => {
  const {
    isLoading,
    dashboardData,
    error,
    loadDashboardData,
    exportData,
    clearData
  } = useAnalytics();

  const { realTimeData, refreshRealTimeData } = useRealTimeAnalytics();

  const [dateRange, setDateRange] = useState(defaultDateRange || {
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    end: new Date()
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'charts' | 'realtime' | 'insights'>('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load dashboard data on mount and when date range changes
  useEffect(() => {
    loadDashboardData(dateRange);
  }, [dateRange, loadDashboardData]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadDashboardData(dateRange);
      refreshRealTimeData();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleExport = (format: 'json' | 'csv') => {
    const data = exportData(format);
    const blob = new Blob([data], { 
      type: format === 'json' ? 'application/json' : 'text/csv' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${Date.now()}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDateRangeChange = (range: 'week' | 'month' | 'quarter' | 'year') => {
    const end = new Date();
    let start: Date;
    
    switch (range) {
      case 'week':
        start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        start = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'quarter':
        start = new Date(end.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case 'year':
        start = new Date(end.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
    }
    
    setDateRange({ start, end });
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center gap-2 text-red-600 mb-2">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="font-medium">Analytics Error</h3>
        </div>
        <p className="text-red-600 text-sm">{error}</p>
        <button
          onClick={handleRefresh}
          className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow border ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
            <p className="text-gray-600 mt-1">
              {dateRange.start.toLocaleDateString()} - {dateRange.end.toLocaleDateString()}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Date Range Selector */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {(['week', 'month', 'quarter', 'year'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => handleDateRangeChange(range)}
                  className="px-3 py-1 text-sm rounded capitalize hover:bg-white hover:shadow-sm transition-all"
                >
                  {range}
                </button>
              ))}
            </div>
            
            {/* Action Buttons */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                <Download className="w-4 h-4" />
                Export
              </button>
              
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <button
                  onClick={() => handleExport('json')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-50"
                >
                  Export JSON
                </button>
                <button
                  onClick={() => handleExport('csv')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-50"
                >
                  Export CSV
                </button>
              </div>
            </div>
            
            <button
              onClick={clearData}
              className="px-4 py-2 text-red-600 border border-red-200 rounded hover:bg-red-50"
            >
              Clear Data
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 mt-6 bg-gray-100 rounded-lg p-1">
          {[
            { key: 'overview', label: 'Overview', icon: BarChart3 },
            { key: 'charts', label: 'Charts', icon: LineChart },
            { key: 'realtime', label: 'Real-time', icon: Activity },
            { key: 'insights', label: 'Insights', icon: TrendingUp }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${
                activeTab === key
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-gray-600">
              <RefreshCw className="w-6 h-6 animate-spin" />
              <span>Loading analytics data...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && dashboardData && (
              <div className="space-y-6">
                {/* Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {dashboardData.metrics.map((metric) => (
                    <AnalyticsMetricCard key={metric.name} metric={metric} />
                  ))}
                </div>

                {/* Quick Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {dashboardData.charts.slice(0, 2).map((chart) => (
                    <div key={chart.id} className="bg-gray-50 rounded-lg p-4">
                      <AnalyticsChart chart={chart} height={300} />
                    </div>
                  ))}
                </div>

                {/* Real-time Summary */}
                {realTimeData && (
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">
                      Real-time Activity
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {realTimeData.activeUsers}
                        </div>
                        <div className="text-sm text-blue-600">Active Users</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {realTimeData.currentEvents.length}
                        </div>
                        <div className="text-sm text-blue-600">Recent Events</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {realTimeData.performanceMetrics.avgLoadTime.toFixed(0)}ms
                        </div>
                        <div className="text-sm text-blue-600">Avg Load Time</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Charts Tab */}
            {activeTab === 'charts' && dashboardData && (
              <div className="space-y-6">
                {dashboardData.charts.map((chart) => (
                  <div key={chart.id} className="bg-gray-50 rounded-lg p-6">
                    <AnalyticsChart chart={chart} height={400} />
                  </div>
                ))}
              </div>
            )}

            {/* Real-time Tab */}
            {activeTab === 'realtime' && (
              <div className="space-y-6">
                <RealTimeWidget data={realTimeData} />
              </div>
            )}

            {/* Insights Tab */}
            {activeTab === 'insights' && dashboardData && (
              <div className="space-y-6">
                <InsightsPanel insights={dashboardData.insights} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
