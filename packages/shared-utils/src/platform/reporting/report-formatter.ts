export const formatReportDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-GB');
};

export interface ReportFormatData {
  reportId: string;
  name: string;
  status: string;
  generatedAt?: Date;
  createdAt?: Date;
}

export const formatReportSummary = (report: ReportFormatData): string => {
  return `#${report.reportId} | ${report.name} | ${report.status} | ${formatReportDate(report.generatedAt || report.createdAt || new Date())}`;
};

export const formatReportStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const formatReportPriority = (priority: string): string => {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
};

export const formatReportSize = (bytes: number): string => {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};
