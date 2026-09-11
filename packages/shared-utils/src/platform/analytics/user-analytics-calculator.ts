export interface UserAnalyticsData {
  createdAt: Date;
  isActive: boolean;
}

export interface UserAnalyticsResult {
  totalUsers: number;
  newUsers: number;
  activeUsers: number;
  bounceRate: number;
  sessionDuration: number;
  retentionRate: number;
}

export const calculateUserAnalytics = (users: UserAnalyticsData[]): UserAnalyticsResult => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const totalUsers = users.length;
  const newUsers = users.filter((u) => new Date(u.createdAt) >= thirtyDaysAgo).length;
  const activeUsers = users.filter((u) => u.isActive).length;
  return {
    totalUsers,
    newUsers,
    activeUsers,
    bounceRate: 0,
    sessionDuration: 0,
    retentionRate: 0,
  };
};
