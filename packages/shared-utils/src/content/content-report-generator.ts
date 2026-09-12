export const generateContentReportId = (prefix: string, length: number): string => {
  const random = Math.random()
    .toString(36)
    .substring(2, 2 + length)
    .toUpperCase();
  return `${prefix}-${random}`;
};

export interface ContentReportData {
  reportId: string;
  contentId: string;
  type: string;
  format: string;
  analytics: unknown[];
  summary: {
    totalViews: number;
    uniqueViews: number;
    averageReadTime: number;
    bounceRate: number;
    shareCount: number;
    commentCount: number;
    reactionCount: number;
    conversionRate: number;
  };
  insights: unknown[];
  recommendations: string[];
  generatedAt: Date;
  metadata: Record<string, unknown>;
}

export const generateContentReport = (
  contentId: string,
  type: string,
  data: Partial<ContentReportData>
): ContentReportData => {
  return {
    reportId: generateContentReportId('CRPT', 12),
    contentId,
    type,
    format: 'pdf',
    analytics: data.analytics || [],
    summary: data.summary || {
      totalViews: 0,
      uniqueViews: 0,
      averageReadTime: 0,
      bounceRate: 0,
      shareCount: 0,
      commentCount: 0,
      reactionCount: 0,
      conversionRate: 0,
    },
    insights: data.insights || [],
    recommendations: data.recommendations || [],
    generatedAt: new Date(),
    metadata: data.metadata || {},
  };
};
