/**
 * Real-time Analytics Widget
 * TypeScript best practices ile gerçek zamanlı analytics widget'ı
 */

import React from 'react';
import { Users, Activity, Clock, AlertCircle, Globe, Zap } from 'lucide-react';
import type { RealTimeAnalytics } from '@/lib/analytics/analyticsEngine';

interface RealTimeWidgetProps {
  readonly data: RealTimeAnalytics | null;
  readonly className?: string;
}

export const RealTimeWidget: React.FC<RealTimeWidgetProps> = ({
  data,
  className = ''
}) => {
  if (!data) {
    return (
      <div className={`bg-gray-50 border border-gray-200 rounded-lg p-8 text-center ${className}`}>
        <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">No Real-time Data</h3>
        <p className="text-gray-500">Real-time analytics data is not available yet.</p>
      </div>
    );
  }

  const formatLatency = (ms: number): string => {
    if (ms < 100) return 'Excellent';
    if (ms < 300) return 'Good';
    if (ms < 1000) return 'Fair';
    return 'Poor';
  };

  const getLatencyColor = (ms: number): string => {
    if (ms < 100) return 'text-green-600';
    if (ms < 300) return 'text-yellow-600';
    if (ms < 1000) return 'text-orange-600';
    return 'text-red-600';
  };

  const getErrorRateColor = (rate: number): string => {
    if (rate < 1) return 'text-green-600';
    if (rate < 5) return 'text-yellow-600';
    if (rate < 10) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <h2 className="text-xl font-bold text-gray-900">Real-time Analytics</h2>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Users */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Active Users</h3>
              <div className="text-2xl font-bold text-gray-900">{data.activeUsers}</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">Currently online</div>
        </div>

        {/* Performance */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Avg Load Time</h3>
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-bold text-gray-900">
                  {data.performanceMetrics.avgLoadTime.toFixed(0)}ms
                </div>
                <div className={`text-xs font-medium ${getLatencyColor(data.performanceMetrics.avgLoadTime)}`}>
                  {formatLatency(data.performanceMetrics.avgLoadTime)}
                </div>
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500">Response time</div>
        </div>

        {/* Error Rate */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Error Rate</h3>
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-bold text-gray-900">
                  {data.performanceMetrics.errorRate.toFixed(1)}%
                </div>
                <div className={`text-xs font-medium ${getErrorRateColor(data.performanceMetrics.errorRate)}`}>
                  {data.performanceMetrics.errorRate < 5 ? 'Good' : 'High'}
                </div>
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500">Last 5 minutes</div>
        </div>
      </div>

      {/* Active Pages */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Active Pages</h3>
        </div>
        
        {data.activePages.length > 0 ? (
          <div className="space-y-3">
            {data.activePages.slice(0, 8).map((page, index) => (
              <div key={page.page} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-medium text-gray-600">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{page.page}</div>
                    <div className="text-sm text-gray-500">
                      {page.users} {page.users === 1 ? 'user' : 'users'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min((page.users / Math.max(...data.activePages.map(p => p.users))) * 100, 100)}%` 
                      }}
                    />
                  </div>
                  <div className="text-sm font-medium text-gray-900 w-8 text-right">
                    {page.users}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <Globe className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p>No active pages</p>
          </div>
        )}
      </div>

      {/* Recent Events */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Recent Events</h3>
        </div>
        
        {data.currentEvents.length > 0 ? (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {data.currentEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">{event.event}</span>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                      {event.category}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    {event.action} {event.label && `• ${event.label}`}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{event.timestamp.toLocaleTimeString()}</span>
                    {event.userId && <span>User: {event.userId}</span>}
                    <span>Page: {event.metadata.page}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <Clock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p>No recent events</p>
          </div>
        )}
      </div>

      {/* System Performance */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Performance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {data.performanceMetrics.throughput.toFixed(1)}
            </div>
            <div className="text-sm text-blue-600">Events/min</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {(100 - data.performanceMetrics.errorRate).toFixed(1)}%
            </div>
            <div className="text-sm text-green-600">Success Rate</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {data.activeUsers > 0 ? (data.currentEvents.length / data.activeUsers).toFixed(1) : '0'}
            </div>
            <div className="text-sm text-purple-600">Events/User</div>
          </div>
        </div>
      </div>
    </div>
  );
};
