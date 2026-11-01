export const ANALYTICS_KPI_STATUS = {
  ON_TRACK: 'on_track',
  AT_RISK: 'at_risk',
  BREACHED: 'breached',
  ACHIEVED: 'achieved',
  EXCEEDED: 'exceeded',
} as const;

export const ANALYTICS_KPI_LIMIT = {
  MAX_KPIS: 200,
  MIN_DATA_POINTS: 7,
  MAX_DATA_POINTS: 365,
} as const;

export type AnalyticsKpiStatusType =
  (typeof ANALYTICS_KPI_STATUS)[keyof typeof ANALYTICS_KPI_STATUS];
