/**
 * Analytics Insights Panel
 * TypeScript best practices ile insights gösterimi
 */

import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Lightbulb,
  Target,
  Zap
} from 'lucide-react';
import type { AnalyticsInsight } from '@/lib/analytics/analyticsEngine';

interface InsightsPanelProps {
  readonly insights: readonly AnalyticsInsight[];
  readonly className?: string;
}

export const InsightsPanel: React.FC<InsightsPanelProps> = ({
  insights,
  className = ''
}) => {
  const getInsightIcon = (type: AnalyticsInsight['type']) => {
    switch (type) {
      case 'positive':
        return <TrendingUp className="w-5 h-5" />;
      case 'negative':
        return <TrendingDown className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getInsightColors = (type: AnalyticsInsight['type']) => {
    switch (type) {
      case 'positive':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-600',
          title: 'text-green-900',
          text: 'text-green-700'
        };
      case 'negative':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: 'text-red-600',
          title: 'text-red-900',
          text: 'text-red-700'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: 'text-yellow-600',
          title: 'text-yellow-900',
          text: 'text-yellow-700'
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-600',
          title: 'text-blue-900',
          text: 'text-blue-700'
        };
    }
  };

  const getImpactBadge = (impact: AnalyticsInsight['impact']) => {
    switch (impact) {
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
            <Zap className="w-3 h-3" />
            High Impact
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
            <Target className="w-3 h-3" />
            Medium Impact
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
            <Info className="w-3 h-3" />
            Low Impact
          </span>
        );
    }
  };

  if (insights.length === 0) {
    return (
      <div className={`bg-gray-50 border border-gray-200 rounded-lg p-8 text-center ${className}`}>
        <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">No Insights Available</h3>
        <p className="text-gray-500">
          Analytics insights will appear here once enough data is collected.
        </p>
      </div>
    );
  }

  // Group insights by type
  const groupedInsights = insights.reduce((acc, insight) => {
    if (!acc[insight.type]) {
      acc[insight.type] = [];
    }
    acc[insight.type].push(insight);
    return acc;
  }, {} as Record<AnalyticsInsight['type'], AnalyticsInsight[]>);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <Lightbulb className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">Analytics Insights</h2>
        <div className="text-sm text-gray-500">
          {insights.length} insight{insights.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {(['positive', 'negative', 'warning', 'neutral'] as const).map(type => {
          const count = groupedInsights[type]?.length || 0;
          const colors = getInsightColors(type);
          
          return (
            <div key={type} className={`${colors.bg} ${colors.border} border rounded-lg p-4`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={colors.icon}>
                  {getInsightIcon(type)}
                </div>
                <span className={`text-sm font-medium capitalize ${colors.title}`}>
                  {type}
                </span>
              </div>
              <div className={`text-2xl font-bold ${colors.title}`}>
                {count}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Insights */}
      <div className="space-y-4">
        {([...insights] as AnalyticsInsight[])
          .sort((a: AnalyticsInsight, b: AnalyticsInsight) => {
            // Sort by impact (high -> medium -> low), then by type
            const impactOrder: Record<AnalyticsInsight['impact'], number> = { high: 3, medium: 2, low: 1 };
            const impactDiff = impactOrder[b.impact] - impactOrder[a.impact];
            if (impactDiff !== 0) return impactDiff;
            
            const typeOrder: Record<AnalyticsInsight['type'], number> = { negative: 4, warning: 3, neutral: 2, positive: 1 };
            return typeOrder[b.type] - typeOrder[a.type];
          })
          .map((insight: AnalyticsInsight) => {
            const colors = getInsightColors(insight.type);
            
            return (
              <div 
                key={insight.id} 
                className={`${colors.bg} ${colors.border} border rounded-lg p-6`}
              >
                <div className="flex items-start gap-4">
                  <div className={`${colors.icon} mt-1`}>
                    {getInsightIcon(insight.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`font-semibold ${colors.title}`}>
                        {insight.title}
                      </h3>
                      {getImpactBadge(insight.impact)}
                      {insight.actionable && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                          <CheckCircle className="w-3 h-3" />
                          Actionable
                        </span>
                      )}
                    </div>
                    
                    <p className={`${colors.text} mb-4`}>
                      {insight.description}
                    </p>
                    
                    {insight.suggestions && insight.suggestions.length > 0 && (
                      <div className="space-y-2">
                        <h4 className={`text-sm font-medium ${colors.title}`}>
                          Recommended Actions:
                        </h4>
                        <ul className="space-y-1">
                          {insight.suggestions.map((suggestion: string, index: number) => (
                            <li key={index} className={`text-sm ${colors.text} flex items-start gap-2`}>
                              <span className="text-xs mt-1">•</span>
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.filter(insight => insight.actionable).map((insight) => (
            <button
              key={insight.id}
              className="text-left p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={getInsightColors(insight.type).icon}>
                  {getInsightIcon(insight.type)}
                </div>
                <span className="font-medium text-gray-900">
                  {insight.title}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {insight.suggestions?.[0] || 'View details'}
              </p>
            </button>
          ))}
          
          {insights.filter(insight => insight.actionable).length === 0 && (
            <div className="col-span-full text-center py-6 text-gray-500">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p>No actionable insights at this time</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
