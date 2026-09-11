export interface AnalyticsData {
  metric: string;
  value: number;
}

export const calculateContentAverage = (values: number[]): number => {
  if (values.length === 0) return 0;
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
};

export interface ContentAnalyticsSummary {
  totalViews: number;
  uniqueViews: number;
  averageReadTime: number;
  bounceRate: number;
  shareCount: number;
  commentCount: number;
  reactionCount: number;
  conversionRate: number;
}

export const calculateContentAnalytics = (analytics: AnalyticsData[]): ContentAnalyticsSummary => {
  const views = analytics.filter((a) => a.metric === 'totalViews');
  const uniqueViews = analytics.filter((a) => a.metric === 'uniqueViews');
  const readTimes = analytics.filter((a) => a.metric === 'averageReadTime');
  const bounces = analytics.filter((a) => a.metric === 'bounceRate');
  const shares = analytics.filter((a) => a.metric === 'shareCount');
  const comments = analytics.filter((a) => a.metric === 'commentCount');
  const reactions = analytics.filter((a) => a.metric === 'reactionCount');
  const conversions = analytics.filter((a) => a.metric === 'conversionRate');
  return {
    totalViews: views.reduce((sum, a) => sum + a.value, 0),
    uniqueViews: uniqueViews.reduce((sum, a) => sum + a.value, 0),
    averageReadTime: calculateContentAverage(readTimes.map((a) => a.value)),
    bounceRate: calculateContentAverage(bounces.map((a) => a.value)),
    shareCount: shares.reduce((sum, a) => sum + a.value, 0),
    commentCount: comments.reduce((sum, a) => sum + a.value, 0),
    reactionCount: reactions.reduce((sum, a) => sum + a.value, 0),
    conversionRate: calculateContentAverage(conversions.map((a) => a.value)),
  };
};

export const calculateContentEngagement = (content: {
  views: number;
  likes: number;
  shares: number;
  comments: number;
}): number => {
  if (content.views === 0) return 0;
  const engagement = content.likes + content.shares + content.comments;
  return (engagement / content.views) * 100;
};
