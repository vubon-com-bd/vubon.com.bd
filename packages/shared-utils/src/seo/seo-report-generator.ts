import { calculateSEOMetrics } from './seo-analytics-calculator';
import type { SEOAnalyticsData } from './seo-analytics-calculator';

export const generateSEOReportId = (prefix: string = 'SRPT'): string => {
  const random = Math.random().toString(36).substring(2, 14).toUpperCase();
  return `${prefix}-${random}`;
};

export interface SEOReportData {
  reportId: string;
  type: string;
  format: string;
  analytics: SEOAnalyticsData[];
  rankings: unknown[];
  scores: unknown[];
  summary: {
    totalKeywords: number;
    totalRankings: number;
    averagePosition: number;
    top3Keywords: number;
    top10Keywords: number;
    top20Keywords: number;
    averageScore: number;
    organicTraffic: number;
    organicConversions: number;
    bounceRate: number;
    pageViews: number;
    backlinkCount: number;
    domainAuthority: number;
  };
  insights: unknown[];
  recommendations: string[];
  schedule: string;
  generatedAt: Date;
  metadata: Record<string, unknown>;
}

export interface SEOReportInput {
  analytics?: SEOAnalyticsData[];
  rankings?: unknown[];
  scores?: unknown[];
  totalKeywords?: number;
  totalRankings?: number;
  averagePosition?: number;
  top3Keywords?: number;
  top10Keywords?: number;
  top20Keywords?: number;
  averageScore?: number;
  insights?: unknown[];
  recommendations?: string[];
  schedule?: string;
  metadata?: Record<string, unknown>;
}

export const generateSEOReport = (data: SEOReportInput, type: string): SEOReportData => {
  const analytics = data.analytics || [];
  const metrics = calculateSEOMetrics(analytics);
  return {
    reportId: generateSEOReportId(),
    type,
    format: 'pdf',
    analytics,
    rankings: data.rankings || [],
    scores: data.scores || [],
    summary: {
      totalKeywords: data.totalKeywords || 0,
      totalRankings: data.totalRankings || 0,
      averagePosition: data.averagePosition || 0,
      top3Keywords: data.top3Keywords || 0,
      top10Keywords: data.top10Keywords || 0,
      top20Keywords: data.top20Keywords || 0,
      averageScore: data.averageScore || 0,
      organicTraffic: metrics.organicTraffic,
      organicConversions: metrics.organicConversions,
      bounceRate: metrics.bounceRate,
      pageViews: metrics.pageViews,
      backlinkCount: metrics.backlinkCount,
      domainAuthority: metrics.domainAuthority,
    },
    insights: data.insights || [],
    recommendations: data.recommendations || [],
    schedule: data.schedule || 'monthly',
    generatedAt: new Date(),
    metadata: data.metadata || {},
  };
};
