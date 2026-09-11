export interface ReportExportData {
  exportId: string;
  reportId: string;
  type: string;
  format: string;
  destination: string;
  fileUrl: string;
  fileSize: number;
  rowCount: number;
  isCompleted: boolean;
  isFailed: boolean;
  exportedAt: Date;
  metadata: Record<string, unknown>;
}

export interface ExportInput {
  reportId?: string;
  size?: number;
  rowCount?: number;
}

export const exportReport = (
  data: ExportInput,
  format: string,
  destination: string
): ReportExportData => {
  return {
    exportId: crypto.randomUUID(),
    reportId: data.reportId || '',
    type: 'download',
    format,
    destination,
    fileUrl: `https://example.com/reports/${data.reportId}.${format}`,
    fileSize: data.size || 0,
    rowCount: data.rowCount || 0,
    isCompleted: false,
    isFailed: false,
    exportedAt: new Date(),
    metadata: {},
  };
};

export const getExportFormat = (format: string): string => {
  const extensions: Record<string, string> = {
    pdf: '.pdf',
    excel: '.xlsx',
    csv: '.csv',
    json: '.json',
  };
  return extensions[format] || '.pdf';
};
