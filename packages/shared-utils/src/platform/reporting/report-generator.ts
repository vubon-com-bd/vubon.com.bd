const generateReportIdOnly = (prefix: string, length: number): string => {
  const random = Math.random()
    .toString(36)
    .substring(2, 2 + length)
    .toUpperCase();
  return `${prefix}-${random}`;
};

export interface ReportData {
  name?: string;
  description?: string;
  template?: unknown;
  filters?: unknown[];
  export?: unknown;
  email?: unknown;
  schedule?: unknown;
  createdBy?: string;
}

export interface GeneratedReport {
  reportId: string;
  name: string;
  description: string;
  status: string;
  type: string;
  category: string;
  priority: string;
  template: unknown;
  filters: unknown[];
  export: unknown;
  email: unknown;
  schedule: unknown;
  createdBy: string;
  generatedAt: Date;
  fileUrl: string;
  fileSize: number;
  rowCount: number;
  isActive: boolean;
  isArchived: boolean;
  metadata: {
    timezone: string;
    locale: string;
    tags: string[];
    notes: string;
    version: number;
  };
}

export const generatePlatformReport = (data: ReportData, type: string): GeneratedReport => {
  return {
    reportId: generateReportIdOnly('RPT', 12),
    name: data.name || 'Report',
    description: data.description || '',
    status: 'draft',
    type,
    category: type,
    priority: 'medium',
    template: data.template || {},
    filters: data.filters || [],
    export: data.export || {},
    email: data.email || {},
    schedule: data.schedule || {},
    createdBy: data.createdBy || '',
    generatedAt: new Date(),
    fileUrl: '',
    fileSize: 0,
    rowCount: 0,
    isActive: true,
    isArchived: false,
    metadata: {
      timezone: 'Asia/Dhaka',
      locale: 'en_BD',
      tags: [],
      notes: '',
      version: 1,
    },
  };
};

export const generateUniqueReportId = (prefix: string = 'RPT'): string => {
  return generateReportIdOnly(prefix, 12);
};
