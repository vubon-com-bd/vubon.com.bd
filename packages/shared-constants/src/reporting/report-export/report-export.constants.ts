/**
 * Report Export Constants
 * Configuration for report exporting, formatting, and delivery
 */

export const REPORT_EXPORT = {
  // Export Formats
  FORMATS: {
    PDF: 'pdf',
    EXCEL: 'excel',
    CSV: 'csv',
    JSON: 'json',
    XML: 'xml',
    HTML: 'html',
    MARKDOWN: 'markdown',
    DOCX: 'docx',
    PPTX: 'pptx',
    PNG: 'png',
    JPEG: 'jpeg',
    SVG: 'svg',
    TXT: 'txt',
    ZIP: 'zip',
  } as const,

  // Export Types
  TYPES: {
    FULL: 'full',
    SUMMARY: 'summary',
    DETAILED: 'detailed',
    AGGREGATED: 'aggregated',
    RAW: 'raw',
    FILTERED: 'filtered',
    CUSTOM: 'custom',
  } as const,

  // Export Methods
  METHODS: {
    DOWNLOAD: 'download',
    EMAIL: 'email',
    API: 'api',
    WEBHOOK: 'webhook',
    FTP: 'ftp',
    S3: 's3',
    DASHBOARD: 'dashboard',
  } as const,

  // Export Compression
  COMPRESSION: {
    NONE: 'none',
    GZIP: 'gzip',
    ZIP: 'zip',
    TAR: 'tar',
    TAR_GZ: 'tar_gz',
    RAR: 'rar',
    SEVEN_ZIP: 'seven_zip',
  } as const,

  // Export Encryption
  ENCRYPTION: {
    NONE: 'none',
    AES_256: 'aes_256',
    AES_128: 'aes_128',
    RSA: 'rsa',
    PGP: 'pgp',
    SSL: 'ssl',
  } as const,

  // Export Page Sizes
  PAGE_SIZES: {
    A3: 'a3',
    A4: 'a4',
    A5: 'a5',
    LEGAL: 'legal',
    LETTER: 'letter',
    TABLOID: 'tabloid',
    EXECUTIVE: 'executive',
  } as const,

  // Export Orientations
  ORIENTATIONS: {
    PORTRAIT: 'portrait',
    LANDSCAPE: 'landscape',
  } as const,

  // Export Quality
  QUALITY: {
    DRAFT: 'draft',
    STANDARD: 'standard',
    HIGH: 'high',
    PREMIUM: 'premium',
  } as const,

  // Export DPI
  DPI: {
    LOW: 72,
    STANDARD: 150,
    HIGH: 300,
    PREMIUM: 600,
  } as const,

  // Export File Naming
  NAMING: {
    TIMESTAMP: 'timestamp',
    DATETIME: 'datetime',
    CUSTOM: 'custom',
    AUTO: 'auto',
  } as const,

  // Export Max Sizes (in MB)
  MAX_SIZES: {
    EMAIL: 25,
    API: 100,
    WEBHOOK: 50,
    FTP: 500,
    S3: 1000,
    DASHBOARD: 50,
    DOWNLOAD: 500,
  } as const,

  // Export Timeouts (in seconds)
  TIMEOUTS: {
    DOWNLOAD: 300,
    EMAIL: 120,
    API: 180,
    WEBHOOK: 60,
    FTP: 600,
    S3: 900,
    DASHBOARD: 60,
  } as const,

  // Export Defaults
  DEFAULTS: {
    FORMAT: 'pdf',
    TYPE: 'summary',
    METHOD: 'download',
    QUALITY: 'standard',
    PAGE_SIZE: 'a4',
    ORIENTATION: 'portrait',
    COMPRESSION: 'none',
    ENCRYPTION: 'none',
    DPI: 150,
    FILE_NAME_PREFIX: 'report_',
    INCLUDE_TIMESTAMP: true,
    INCLUDE_FILTERS: true,
    INCLUDE_METADATA: true,
  } as const,

  // Export Limits
  LIMITS: {
    MAX_ROWS: 100000,
    MAX_COLUMNS: 100,
    MAX_SHEETS: 50,
    MAX_ATTACHMENTS: 10,
    MAX_FILENAME_LENGTH: 255,
    MAX_DESCRIPTION_LENGTH: 500,
  } as const,
} as const;

// Export Formats
export type ReportExportFormat = (typeof REPORT_EXPORT.FORMATS)[keyof typeof REPORT_EXPORT.FORMATS];

// Export Types
export type ReportExportType = (typeof REPORT_EXPORT.TYPES)[keyof typeof REPORT_EXPORT.TYPES];

// Export Methods
export type ReportExportMethod = (typeof REPORT_EXPORT.METHODS)[keyof typeof REPORT_EXPORT.METHODS];

// Export Compression
export type ReportExportCompression =
  (typeof REPORT_EXPORT.COMPRESSION)[keyof typeof REPORT_EXPORT.COMPRESSION];

// Export Encryption
export type ReportExportEncryption =
  (typeof REPORT_EXPORT.ENCRYPTION)[keyof typeof REPORT_EXPORT.ENCRYPTION];

// Export Page Sizes
export type ReportExportPageSize =
  (typeof REPORT_EXPORT.PAGE_SIZES)[keyof typeof REPORT_EXPORT.PAGE_SIZES];

// Export Orientations
export type ReportExportOrientation =
  (typeof REPORT_EXPORT.ORIENTATIONS)[keyof typeof REPORT_EXPORT.ORIENTATIONS];

// Export Quality
export type ReportExportQuality =
  (typeof REPORT_EXPORT.QUALITY)[keyof typeof REPORT_EXPORT.QUALITY];

// Export DPI
export type ReportExportDPI = (typeof REPORT_EXPORT.DPI)[keyof typeof REPORT_EXPORT.DPI];

// Export Naming
export type ReportExportNaming = (typeof REPORT_EXPORT.NAMING)[keyof typeof REPORT_EXPORT.NAMING];

// Utility Functions
export function reportExportGetFormatLabel(format: ReportExportFormat): string {
  const labels: Record<ReportExportFormat, string> = {
    [REPORT_EXPORT.FORMATS.PDF]: 'PDF Document',
    [REPORT_EXPORT.FORMATS.EXCEL]: 'Excel Spreadsheet',
    [REPORT_EXPORT.FORMATS.CSV]: 'CSV File',
    [REPORT_EXPORT.FORMATS.JSON]: 'JSON File',
    [REPORT_EXPORT.FORMATS.XML]: 'XML File',
    [REPORT_EXPORT.FORMATS.HTML]: 'HTML Page',
    [REPORT_EXPORT.FORMATS.MARKDOWN]: 'Markdown Document',
    [REPORT_EXPORT.FORMATS.DOCX]: 'Word Document',
    [REPORT_EXPORT.FORMATS.PPTX]: 'PowerPoint Presentation',
    [REPORT_EXPORT.FORMATS.PNG]: 'PNG Image',
    [REPORT_EXPORT.FORMATS.JPEG]: 'JPEG Image',
    [REPORT_EXPORT.FORMATS.SVG]: 'SVG Image',
    [REPORT_EXPORT.FORMATS.TXT]: 'Text File',
    [REPORT_EXPORT.FORMATS.ZIP]: 'ZIP Archive',
  };
  return labels[format] || 'Unknown Format';
}

export function reportExportGetTypeLabel(type: ReportExportType): string {
  const labels: Record<ReportExportType, string> = {
    [REPORT_EXPORT.TYPES.FULL]: 'Full Export',
    [REPORT_EXPORT.TYPES.SUMMARY]: 'Summary Export',
    [REPORT_EXPORT.TYPES.DETAILED]: 'Detailed Export',
    [REPORT_EXPORT.TYPES.AGGREGATED]: 'Aggregated Export',
    [REPORT_EXPORT.TYPES.RAW]: 'Raw Data Export',
    [REPORT_EXPORT.TYPES.FILTERED]: 'Filtered Export',
    [REPORT_EXPORT.TYPES.CUSTOM]: 'Custom Export',
  };
  return labels[type] || 'Unknown Type';
}

export function reportExportGetMethodLabel(method: ReportExportMethod): string {
  const labels: Record<ReportExportMethod, string> = {
    [REPORT_EXPORT.METHODS.DOWNLOAD]: 'Download',
    [REPORT_EXPORT.METHODS.EMAIL]: 'Email',
    [REPORT_EXPORT.METHODS.API]: 'API',
    [REPORT_EXPORT.METHODS.WEBHOOK]: 'Webhook',
    [REPORT_EXPORT.METHODS.FTP]: 'FTP',
    [REPORT_EXPORT.METHODS.S3]: 'S3 Storage',
    [REPORT_EXPORT.METHODS.DASHBOARD]: 'Dashboard',
  };
  return labels[method] || 'Unknown Method';
}

export function reportExportGetCompressionLabel(compression: ReportExportCompression): string {
  const labels: Record<ReportExportCompression, string> = {
    [REPORT_EXPORT.COMPRESSION.NONE]: 'None',
    [REPORT_EXPORT.COMPRESSION.GZIP]: 'GZIP',
    [REPORT_EXPORT.COMPRESSION.ZIP]: 'ZIP',
    [REPORT_EXPORT.COMPRESSION.TAR]: 'TAR',
    [REPORT_EXPORT.COMPRESSION.TAR_GZ]: 'TAR.GZ',
    [REPORT_EXPORT.COMPRESSION.RAR]: 'RAR',
    [REPORT_EXPORT.COMPRESSION.SEVEN_ZIP]: '7-Zip',
  };
  return labels[compression] || 'Unknown Compression';
}

export function reportExportGetEncryptionLabel(encryption: ReportExportEncryption): string {
  const labels: Record<ReportExportEncryption, string> = {
    [REPORT_EXPORT.ENCRYPTION.NONE]: 'None',
    [REPORT_EXPORT.ENCRYPTION.AES_256]: 'AES-256',
    [REPORT_EXPORT.ENCRYPTION.AES_128]: 'AES-128',
    [REPORT_EXPORT.ENCRYPTION.RSA]: 'RSA',
    [REPORT_EXPORT.ENCRYPTION.PGP]: 'PGP',
    [REPORT_EXPORT.ENCRYPTION.SSL]: 'SSL/TLS',
  };
  return labels[encryption] || 'Unknown Encryption';
}

export function reportExportGetPageSizeLabel(pageSize: ReportExportPageSize): string {
  const labels: Record<ReportExportPageSize, string> = {
    [REPORT_EXPORT.PAGE_SIZES.A3]: 'A3',
    [REPORT_EXPORT.PAGE_SIZES.A4]: 'A4',
    [REPORT_EXPORT.PAGE_SIZES.A5]: 'A5',
    [REPORT_EXPORT.PAGE_SIZES.LEGAL]: 'Legal',
    [REPORT_EXPORT.PAGE_SIZES.LETTER]: 'Letter',
    [REPORT_EXPORT.PAGE_SIZES.TABLOID]: 'Tabloid',
    [REPORT_EXPORT.PAGE_SIZES.EXECUTIVE]: 'Executive',
  };
  return labels[pageSize] || 'Unknown Page Size';
}

export function reportExportGetOrientationLabel(orientation: ReportExportOrientation): string {
  const labels: Record<ReportExportOrientation, string> = {
    [REPORT_EXPORT.ORIENTATIONS.PORTRAIT]: 'Portrait',
    [REPORT_EXPORT.ORIENTATIONS.LANDSCAPE]: 'Landscape',
  };
  return labels[orientation] || 'Unknown Orientation';
}

export function reportExportGetQualityLabel(quality: ReportExportQuality): string {
  const labels: Record<ReportExportQuality, string> = {
    [REPORT_EXPORT.QUALITY.DRAFT]: 'Draft',
    [REPORT_EXPORT.QUALITY.STANDARD]: 'Standard',
    [REPORT_EXPORT.QUALITY.HIGH]: 'High',
    [REPORT_EXPORT.QUALITY.PREMIUM]: 'Premium',
  };
  return labels[quality] || 'Unknown Quality';
}

export function reportExportGetFileExtension(format: ReportExportFormat): string {
  const extensions: Record<ReportExportFormat, string> = {
    [REPORT_EXPORT.FORMATS.PDF]: '.pdf',
    [REPORT_EXPORT.FORMATS.EXCEL]: '.xlsx',
    [REPORT_EXPORT.FORMATS.CSV]: '.csv',
    [REPORT_EXPORT.FORMATS.JSON]: '.json',
    [REPORT_EXPORT.FORMATS.XML]: '.xml',
    [REPORT_EXPORT.FORMATS.HTML]: '.html',
    [REPORT_EXPORT.FORMATS.MARKDOWN]: '.md',
    [REPORT_EXPORT.FORMATS.DOCX]: '.docx',
    [REPORT_EXPORT.FORMATS.PPTX]: '.pptx',
    [REPORT_EXPORT.FORMATS.PNG]: '.png',
    [REPORT_EXPORT.FORMATS.JPEG]: '.jpg',
    [REPORT_EXPORT.FORMATS.SVG]: '.svg',
    [REPORT_EXPORT.FORMATS.TXT]: '.txt',
    [REPORT_EXPORT.FORMATS.ZIP]: '.zip',
  };
  return extensions[format] || '.pdf';
}

export function reportExportGetMimeType(format: ReportExportFormat): string {
  const mimeTypes: Record<ReportExportFormat, string> = {
    [REPORT_EXPORT.FORMATS.PDF]: 'application/pdf',
    [REPORT_EXPORT.FORMATS.EXCEL]:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    [REPORT_EXPORT.FORMATS.CSV]: 'text/csv',
    [REPORT_EXPORT.FORMATS.JSON]: 'application/json',
    [REPORT_EXPORT.FORMATS.XML]: 'application/xml',
    [REPORT_EXPORT.FORMATS.HTML]: 'text/html',
    [REPORT_EXPORT.FORMATS.MARKDOWN]: 'text/markdown',
    [REPORT_EXPORT.FORMATS.DOCX]:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    [REPORT_EXPORT.FORMATS.PPTX]:
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    [REPORT_EXPORT.FORMATS.PNG]: 'image/png',
    [REPORT_EXPORT.FORMATS.JPEG]: 'image/jpeg',
    [REPORT_EXPORT.FORMATS.SVG]: 'image/svg+xml',
    [REPORT_EXPORT.FORMATS.TXT]: 'text/plain',
    [REPORT_EXPORT.FORMATS.ZIP]: 'application/zip',
  };
  return mimeTypes[format] || 'application/octet-stream';
}

export function reportExportGetMaxSize(method: ReportExportMethod): number {
  const sizes: Record<ReportExportMethod, number> = {
    [REPORT_EXPORT.METHODS.DOWNLOAD]: REPORT_EXPORT.MAX_SIZES.DOWNLOAD,
    [REPORT_EXPORT.METHODS.EMAIL]: REPORT_EXPORT.MAX_SIZES.EMAIL,
    [REPORT_EXPORT.METHODS.API]: REPORT_EXPORT.MAX_SIZES.API,
    [REPORT_EXPORT.METHODS.WEBHOOK]: REPORT_EXPORT.MAX_SIZES.WEBHOOK,
    [REPORT_EXPORT.METHODS.FTP]: REPORT_EXPORT.MAX_SIZES.FTP,
    [REPORT_EXPORT.METHODS.S3]: REPORT_EXPORT.MAX_SIZES.S3,
    [REPORT_EXPORT.METHODS.DASHBOARD]: REPORT_EXPORT.MAX_SIZES.DASHBOARD,
  };
  return sizes[method] || REPORT_EXPORT.MAX_SIZES.DOWNLOAD;
}

export function reportExportGetTimeout(method: ReportExportMethod): number {
  const timeouts: Record<ReportExportMethod, number> = {
    [REPORT_EXPORT.METHODS.DOWNLOAD]: REPORT_EXPORT.TIMEOUTS.DOWNLOAD,
    [REPORT_EXPORT.METHODS.EMAIL]: REPORT_EXPORT.TIMEOUTS.EMAIL,
    [REPORT_EXPORT.METHODS.API]: REPORT_EXPORT.TIMEOUTS.API,
    [REPORT_EXPORT.METHODS.WEBHOOK]: REPORT_EXPORT.TIMEOUTS.WEBHOOK,
    [REPORT_EXPORT.METHODS.FTP]: REPORT_EXPORT.TIMEOUTS.FTP,
    [REPORT_EXPORT.METHODS.S3]: REPORT_EXPORT.TIMEOUTS.S3,
    [REPORT_EXPORT.METHODS.DASHBOARD]: REPORT_EXPORT.TIMEOUTS.DASHBOARD,
  };
  return timeouts[method] || REPORT_EXPORT.TIMEOUTS.DOWNLOAD;
}

export function reportExportIsValidFormat(format: string): format is ReportExportFormat {
  return Object.values(REPORT_EXPORT.FORMATS).includes(format as ReportExportFormat);
}

export function reportExportIsValidMethod(method: string): method is ReportExportMethod {
  return Object.values(REPORT_EXPORT.METHODS).includes(method as ReportExportMethod);
}

export function reportExportGetDefaultFormat(): ReportExportFormat {
  return REPORT_EXPORT.DEFAULTS.FORMAT as ReportExportFormat;
}

export function reportExportGetDefaultMethod(): ReportExportMethod {
  return REPORT_EXPORT.DEFAULTS.METHOD as ReportExportMethod;
}

export function reportExportGetDefaultQuality(): ReportExportQuality {
  return REPORT_EXPORT.DEFAULTS.QUALITY as ReportExportQuality;
}

export function reportExportGenerateFileName(
  reportName: string,
  format: ReportExportFormat,
  includeTimestamp: boolean
): string {
  const extension = reportExportGetFileExtension(format);
  let fileName = reportName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();

  if (includeTimestamp) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    fileName = `${fileName}_${timestamp}`;
  }

  return fileName + extension;
}
