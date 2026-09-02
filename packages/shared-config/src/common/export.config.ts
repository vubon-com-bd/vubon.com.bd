/**
 * Export Configuration
 * এক্সপোর্ট কনফিগারেশন
 */
export interface ExportConfig {
  enabled: boolean;
  formats: {
    csv: boolean;
    excel: boolean;
    pdf: boolean;
    json: boolean;
    xml: boolean;
  };
  defaultFormat: 'csv' | 'excel' | 'pdf' | 'json' | 'xml';
  maxRows: number;
  chunkSize: number;
  compression: boolean;
  encryption: {
    enabled: boolean;
    algorithm: string;
  };
  delivery: {
    method: 'download' | 'email' | 's3' | 'webhook';
    email: string[];
  };
}

export const createExportConfig = (): ExportConfig => ({
  enabled: true,
  formats: {
    csv: true,
    excel: true,
    pdf: true,
    json: true,
    xml: true,
  },
  defaultFormat: 'csv',
  maxRows: 100000,
  chunkSize: 1000,
  compression: true,
  encryption: {
    enabled: false,
    algorithm: 'aes-256-cbc',
  },
  delivery: {
    method: 'download',
    email: [],
  },
});
