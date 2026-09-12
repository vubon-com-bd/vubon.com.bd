export interface ReportAnalyticsData {
  isActive: boolean;
  isArchived: boolean;
  type: string;
  status: string;
}

export interface ReportMetrics {
  total: number;
  active: number;
  archived: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
}

export const calculateReportMetrics = (reports: ReportAnalyticsData[]): ReportMetrics => {
  const total = reports.length;
  const active = reports.filter((r) => r.isActive).length;
  const archived = reports.filter((r) => r.isArchived).length;
  const byType = reports.reduce(
    (acc, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  const byStatus = reports.reduce(
    (acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  return { total, active, archived, byType, byStatus };
};
