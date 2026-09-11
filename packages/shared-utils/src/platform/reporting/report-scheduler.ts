export interface ReportScheduleInput {
  reportId?: string;
}

export interface ReportScheduleData {
  scheduleId: string;
  reportId: string;
  status: string;
  type: string;
  frequency: string;
  cronExpression: string;
  startDate: Date;
  endDate: Date;
  lastRunAt?: Date;
  nextRunAt: Date;
  runCount: number;
  maxRuns?: number;
  isActive: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  metadata: Record<string, unknown>;
}

export const scheduleReport = (
  data: ReportScheduleInput,
  frequency: string,
  startDate: Date
): ReportScheduleData => {
  return {
    scheduleId: crypto.randomUUID(),
    reportId: data.reportId || '',
    status: 'active',
    type: 'recurring',
    frequency,
    cronExpression: getCronExpression(frequency),
    startDate,
    endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    lastRunAt: undefined,
    nextRunAt: startDate,
    runCount: 0,
    maxRuns: 52,
    isActive: true,
    isPaused: false,
    isCompleted: false,
    metadata: {},
  };
};

export const getCronExpression = (frequency: string): string => {
  const expressions: Record<string, string> = {
    hourly: '0 * * * *',
    daily: '0 0 * * *',
    weekly: '0 0 * * 0',
    monthly: '0 0 1 * *',
    quarterly: '0 0 1 */3 *',
    annual: '0 0 1 1 *',
  };
  return expressions[frequency] || '0 0 * * *';
};
