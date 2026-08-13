/**
 * @fileoverview Report format definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Report formats enum for different export formats
 */
export enum ReportExportFormat {
  /** PDF format */
  PDF = 'PDF',
  /** Excel XLSX format */
  EXCEL_XLSX = 'EXCEL_XLSX',
  /** Excel XLS format */
  EXCEL_XLS = 'EXCEL_XLS',
  /** CSV format */
  CSV = 'CSV',
  /** TSV format (Tab Separated Values) */
  TSV = 'TSV',
  /** HTML format */
  HTML = 'HTML',
  /** JSON format */
  JSON = 'JSON',
  /** XML format */
  XML = 'XML',
  /** Word DOCX format */
  WORD_DOCX = 'WORD_DOCX',
  /** Word DOC format */
  WORD_DOC = 'WORD_DOC',
  /** PowerPoint PPTX format */
  POWERPOINT_PPTX = 'POWERPOINT_PPTX',
  /** PNG image format */
  PNG = 'PNG',
  /** JPEG image format */
  JPEG = 'JPEG',
  /** SVG vector format */
  SVG = 'SVG',
  /** Plain text format */
  TXT = 'TXT',
  /** Rich Text Format */
  RTF = 'RTF',
  /** OpenDocument Text */
  ODT = 'ODT',
  /** OpenDocument Spreadsheet */
  ODS = 'ODS',
  /** XML Paper Specification */
  XPS = 'XPS',
  /** MIME HTML */
  MHTML = 'MHTML',
  /** TIFF image format */
  TIFF = 'TIFF',
  /** PostScript format */
  PS = 'PS',
  /** Encapsulated PostScript */
  EPS = 'EPS',
  /** MOBI ebook format */
  MOBI = 'MOBI',
  /** EPUB ebook format */
  EPUB = 'EPUB',
  /** Markdown format */
  MARKDOWN = 'MARKDOWN',
  /** YAML format */
  YAML = 'YAML',
  /** SQL format */
  SQL = 'SQL',
  /** LaTeX format */
  LATEX = 'LATEX',
}

/**
 * Report format category for grouping
 */
export enum ReportExportFormatCategory {
  /** Document formats */
  DOCUMENT = 'DOCUMENT',
  /** Spreadsheet formats */
  SPREADSHEET = 'SPREADSHEET',
  /** Data formats */
  DATA = 'DATA',
  /** Image formats */
  IMAGE = 'IMAGE',
  /** Web formats */
  WEB = 'WEB',
  /** Ebook formats */
  EBOOK = 'EBOOK',
  /** Text formats */
  TEXT = 'TEXT',
  /** Presentation formats */
  PRESENTATION = 'PRESENTATION',
  /** Markup formats */
  MARKUP = 'MARKUP',
}

/**
 * Report format category mapping
 */
export const REPORT_EXPORT_FORMAT_CATEGORY_MAP: Record<
  ReportExportFormat,
  ReportExportFormatCategory
> = {
  [ReportExportFormat.PDF]: ReportExportFormatCategory.DOCUMENT,
  [ReportExportFormat.EXCEL_XLSX]: ReportExportFormatCategory.SPREADSHEET,
  [ReportExportFormat.EXCEL_XLS]: ReportExportFormatCategory.SPREADSHEET,
  [ReportExportFormat.CSV]: ReportExportFormatCategory.DATA,
  [ReportExportFormat.TSV]: ReportExportFormatCategory.DATA,
  [ReportExportFormat.HTML]: ReportExportFormatCategory.WEB,
  [ReportExportFormat.JSON]: ReportExportFormatCategory.DATA,
  [ReportExportFormat.XML]: ReportExportFormatCategory.DATA,
  [ReportExportFormat.WORD_DOCX]: ReportExportFormatCategory.DOCUMENT,
  [ReportExportFormat.WORD_DOC]: ReportExportFormatCategory.DOCUMENT,
  [ReportExportFormat.POWERPOINT_PPTX]: ReportExportFormatCategory.PRESENTATION,
  [ReportExportFormat.PNG]: ReportExportFormatCategory.IMAGE,
  [ReportExportFormat.JPEG]: ReportExportFormatCategory.IMAGE,
  [ReportExportFormat.SVG]: ReportExportFormatCategory.IMAGE,
  [ReportExportFormat.TXT]: ReportExportFormatCategory.TEXT,
  [ReportExportFormat.RTF]: ReportExportFormatCategory.TEXT,
  [ReportExportFormat.ODT]: ReportExportFormatCategory.DOCUMENT,
  [ReportExportFormat.ODS]: ReportExportFormatCategory.SPREADSHEET,
  [ReportExportFormat.XPS]: ReportExportFormatCategory.DOCUMENT,
  [ReportExportFormat.MHTML]: ReportExportFormatCategory.WEB,
  [ReportExportFormat.TIFF]: ReportExportFormatCategory.IMAGE,
  [ReportExportFormat.PS]: ReportExportFormatCategory.DOCUMENT,
  [ReportExportFormat.EPS]: ReportExportFormatCategory.IMAGE,
  [ReportExportFormat.MOBI]: ReportExportFormatCategory.EBOOK,
  [ReportExportFormat.EPUB]: ReportExportFormatCategory.EBOOK,
  [ReportExportFormat.MARKDOWN]: ReportExportFormatCategory.MARKUP,
  [ReportExportFormat.YAML]: ReportExportFormatCategory.DATA,
  [ReportExportFormat.SQL]: ReportExportFormatCategory.DATA,
  [ReportExportFormat.LATEX]: ReportExportFormatCategory.DOCUMENT,
};

/**
 * Report format configuration
 */
export interface ReportExportFormatConfig {
  label: string;
  description: string;
  category: ReportExportFormatCategory;
  mimeType: string;
  fileExtension: string;
  icon?: string;
  color?: string;
  priority: number;
  supportsCompression: boolean;
  supportsEncryption: boolean;
  isVectorFormat: boolean;
}

export const REPORT_EXPORT_FORMAT_CONFIG: Record<ReportExportFormat, ReportExportFormatConfig> = {
  [ReportExportFormat.PDF]: {
    label: 'PDF',
    description: 'Portable Document Format',
    category: ReportExportFormatCategory.DOCUMENT,
    mimeType: 'application/pdf',
    fileExtension: 'pdf',
    icon: 'FileText',
    color: '#EF4444',
    priority: 1,
    supportsCompression: true,
    supportsEncryption: true,
    isVectorFormat: true,
  },
  [ReportExportFormat.EXCEL_XLSX]: {
    label: 'Excel XLSX',
    description: 'Microsoft Excel Open XML Spreadsheet',
    category: ReportExportFormatCategory.SPREADSHEET,
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    fileExtension: 'xlsx',
    icon: 'FileSpreadsheet',
    color: '#22C55E',
    priority: 1,
    supportsCompression: true,
    supportsEncryption: true,
    isVectorFormat: false,
  },
  [ReportExportFormat.EXCEL_XLS]: {
    label: 'Excel XLS',
    description: 'Microsoft Excel Binary Spreadsheet',
    category: ReportExportFormatCategory.SPREADSHEET,
    mimeType: 'application/vnd.ms-excel',
    fileExtension: 'xls',
    icon: 'FileSpreadsheet',
    color: '#10B981',
    priority: 2,
    supportsCompression: false,
    supportsEncryption: true,
    isVectorFormat: false,
  },
  [ReportExportFormat.CSV]: {
    label: 'CSV',
    description: 'Comma Separated Values',
    category: ReportExportFormatCategory.DATA,
    mimeType: 'text/csv',
    fileExtension: 'csv',
    icon: 'FileSpreadsheet',
    color: '#3B82F6',
    priority: 1,
    supportsCompression: true,
    supportsEncryption: false,
    isVectorFormat: false,
  },
  [ReportExportFormat.TSV]: {
    label: 'TSV',
    description: 'Tab Separated Values',
    category: ReportExportFormatCategory.DATA,
    mimeType: 'text/tab-separated-values',
    fileExtension: 'tsv',
    icon: 'FileSpreadsheet',
    color: '#6366F1',
    priority: 3,
    supportsCompression: true,
    supportsEncryption: false,
    isVectorFormat: false,
  },
  [ReportExportFormat.HTML]: {
    label: 'HTML',
    description: 'HyperText Markup Language',
    category: ReportExportFormatCategory.WEB,
    mimeType: 'text/html',
    fileExtension: 'html',
    icon: 'Globe',
    color: '#F59E0B',
    priority: 2,
    supportsCompression: true,
    supportsEncryption: false,
    isVectorFormat: true,
  },
  [ReportExportFormat.JSON]: {
    label: 'JSON',
    description: 'JavaScript Object Notation',
    category: ReportExportFormatCategory.DATA,
    mimeType: 'application/json',
    fileExtension: 'json',
    icon: 'Code',
    color: '#8B5CF6',
    priority: 2,
    supportsCompression: true,
    supportsEncryption: false,
    isVectorFormat: false,
  },
  [ReportExportFormat.XML]: {
    label: 'XML',
    description: 'eXtensible Markup Language',
    category: ReportExportFormatCategory.DATA,
    mimeType: 'application/xml',
    fileExtension: 'xml',
    icon: 'Code',
    color: '#6B7280',
    priority: 3,
    supportsCompression: true,
    supportsEncryption: false,
    isVectorFormat: false,
  },
  [ReportExportFormat.WORD_DOCX]: {
    label: 'Word DOCX',
    description: 'Microsoft Word Open XML Document',
    category: ReportExportFormatCategory.DOCUMENT,
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    fileExtension: 'docx',
    icon: 'FileText',
    color: '#3B82F6',
    priority: 2,
    supportsCompression: true,
    supportsEncryption: true,
    isVectorFormat: true,
  },
  [ReportExportFormat.WORD_DOC]: {
    label: 'Word DOC',
    description: 'Microsoft Word Binary Document',
    category: ReportExportFormatCategory.DOCUMENT,
    mimeType: 'application/msword',
    fileExtension: 'doc',
    icon: 'FileText',
    color: '#2563EB',
    priority: 3,
    supportsCompression: false,
    supportsEncryption: true,
    isVectorFormat: true,
  },
  [ReportExportFormat.POWERPOINT_PPTX]: {
    label: 'PowerPoint PPTX',
    description: 'Microsoft PowerPoint Open XML Presentation',
    category: ReportExportFormatCategory.PRESENTATION,
    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    fileExtension: 'pptx',
    icon: 'FilePresentation',
    color: '#F97316',
    priority: 2,
    supportsCompression: true,
    supportsEncryption: true,
    isVectorFormat: true,
  },
  [ReportExportFormat.PNG]: {
    label: 'PNG',
    description: 'Portable Network Graphics',
    category: ReportExportFormatCategory.IMAGE,
    mimeType: 'image/png',
    fileExtension: 'png',
    icon: 'Image',
    color: '#10B981',
    priority: 2,
    supportsCompression: true,
    supportsEncryption: false,
    isVectorFormat: false,
  },
  [ReportExportFormat.JPEG]: {
    label: 'JPEG',
    description: 'Joint Photographic Experts Group',
    category: ReportExportFormatCategory.IMAGE,
    mimeType: 'image/jpeg',
    fileExtension: 'jpg',
    icon: 'Image',
    color: '#F59E0B',
    priority: 3,
    supportsCompression: true,
    supportsEncryption: false,
    isVectorFormat: false,
  },
  [ReportExportFormat.SVG]: {
    label: 'SVG',
    description: 'Scalable Vector Graphics',
    category: ReportExportFormatCategory.IMAGE,
    mimeType: 'image/svg+xml',
    fileExtension: 'svg',
    icon: 'Image',
    color: '#8B5CF6',
    priority: 2,
    supportsCompression: true,
    supportsEncryption: false,
    isVectorFormat: true,
  },
  [ReportExportFormat.TXT]: {
    label: 'Plain Text',
    description: 'Plain text format',
    category: ReportExportFormatCategory.TEXT,
    mimeType: 'text/plain',
    fileExtension: 'txt',
    icon: 'FileText',
    color: '#6B7280',
    priority: 2,
    supportsCompression: true,
    supportsEncryption: false,
    isVectorFormat: false,
  },
  [ReportExportFormat.RTF]: {
    label: 'RTF',
    description: 'Rich Text Format',
    category: ReportExportFormatCategory.TEXT,
    mimeType: 'application/rtf',
    fileExtension: 'rtf',
    icon: 'FileText',
    color: '#6366F1',
    priority: 3,
    supportsCompression: true,
    supportsEncryption: false,
    isVectorFormat: true,
  },
  [ReportExportFormat.ODT]: {
    label: 'ODT',
    description: 'OpenDocument Text',
    category: ReportExportFormatCategory.DOCUMENT,
    mimeType: 'application/vnd.oasis.opendocument.text',
    fileExtension: 'odt',
    icon: 'FileText',
    color: '#10B981',
    priority: 3,
    supportsCompression: true,
    supportsEncryption: true,
    isVectorFormat: true,
  },
  [ReportExportFormat.ODS]: {
    label: 'ODS',
    description: 'OpenDocument Spreadsheet',
    category: ReportExportFormatCategory.SPREADSHEET,
    mimeType: 'application/vnd.oasis.opendocument.spreadsheet',
    fileExtension: 'ods',
    icon: 'FileSpreadsheet',
    color: '#22C55E',
    priority: 3,
    supportsCompression: true,
    supportsEncryption: true,
    isVectorFormat: false,
  },
  [ReportExportFormat.XPS]: {
    label: 'XPS',
    description: 'XML Paper Specification',
    category: ReportExportFormatCategory.DOCUMENT,
    mimeType: 'application/vnd.ms-xpsdocument',
    fileExtension: 'xps',
    icon: 'FileText',
    color: '#6B7280',
    priority: 3,
    supportsCompression: true,
    supportsEncryption: true,
    isVectorFormat: true,
  },
  [ReportExportFormat.MHTML]: {
    label: 'MHTML',
    description: 'MIME HTML (Web Archive)',
    category: ReportExportFormatCategory.WEB,
    mimeType: 'application/x-mimearchive',
    fileExtension: 'mht',
    icon: 'Globe',
    color: '#F59E0B',
    priority: 3,
    supportsCompression: true,
    supportsEncryption: false,
    isVectorFormat: true,
  },
  [ReportExportFormat.TIFF]: {
    label: 'TIFF',
    description: 'Tagged Image File Format',
    category: ReportExportFormatCategory.IMAGE,
    mimeType: 'image/tiff',
    fileExtension: 'tiff',
    icon: 'Image',
    color: '#8B5CF6',
    priority: 3,
    supportsCompression: true,
    supportsEncryption: false,
    isVectorFormat: false,
  },
  [ReportExportFormat.PS]: {
    label: 'PostScript',
    description: 'Adobe PostScript',
    category: ReportExportFormatCategory.DOCUMENT,
    mimeType: 'application/postscript',
    fileExtension: 'ps',
    icon: 'FileText',
    color: '#6B7280',
    priority: 3,
    supportsCompression: true,
    supportsEncryption: false,
    isVectorFormat: true,
  },
  [ReportExportFormat.EPS]: {
    label: 'EPS',
    description: 'Encapsulated PostScript',
    category: ReportExportFormatCategory.IMAGE,
    mimeType: 'application/postscript',
    fileExtension: 'eps',
    icon: 'Image',
    color: '#8B5CF6',
    priority: 3,
    supportsCompression: true,
    supportsEncryption: false,
    isVectorFormat: true,
  },
  [ReportExportFormat.MOBI]: {
    label: 'MOBI',
    description: 'Mobipocket ebook',
    category: ReportExportFormatCategory.EBOOK,
    mimeType: 'application/x-mobipocket-ebook',
    fileExtension: 'mobi',
    icon: 'Book',
    color: '#F472B6',
    priority: 3,
    supportsCompression: false,
    supportsEncryption: false,
    isVectorFormat: true,
  },
  [ReportExportFormat.EPUB]: {
    label: 'EPUB',
    description: 'Electronic Publication',
    category: ReportExportFormatCategory.EBOOK,
    mimeType: 'application/epub+zip',
    fileExtension: 'epub',
    icon: 'Book',
    color: '#EC4899',
    priority: 3,
    supportsCompression: true,
    supportsEncryption: false,
    isVectorFormat: true,
  },
  [ReportExportFormat.MARKDOWN]: {
    label: 'Markdown',
    description: 'Markdown text format',
    category: ReportExportFormatCategory.MARKUP,
    mimeType: 'text/markdown',
    fileExtension: 'md',
    icon: 'FileText',
    color: '#6B7280',
    priority: 3,
    supportsCompression: true,
    supportsEncryption: false,
    isVectorFormat: false,
  },
  [ReportExportFormat.YAML]: {
    label: 'YAML',
    description: "YAML Ain't Markup Language",
    category: ReportExportFormatCategory.DATA,
    mimeType: 'application/x-yaml',
    fileExtension: 'yaml',
    icon: 'Code',
    color: '#6366F1',
    priority: 3,
    supportsCompression: true,
    supportsEncryption: false,
    isVectorFormat: false,
  },
  [ReportExportFormat.SQL]: {
    label: 'SQL',
    description: 'Structured Query Language',
    category: ReportExportFormatCategory.DATA,
    mimeType: 'application/sql',
    fileExtension: 'sql',
    icon: 'Database',
    color: '#3B82F6',
    priority: 3,
    supportsCompression: true,
    supportsEncryption: false,
    isVectorFormat: false,
  },
  [ReportExportFormat.LATEX]: {
    label: 'LaTeX',
    description: 'LaTeX document format',
    category: ReportExportFormatCategory.DOCUMENT,
    mimeType: 'application/x-latex',
    fileExtension: 'tex',
    icon: 'FileText',
    color: '#10B981',
    priority: 3,
    supportsCompression: true,
    supportsEncryption: false,
    isVectorFormat: true,
  },
};

/**
 * Get report export format label
 */
export function getReportExportFormatLabel(format: ReportExportFormat): string {
  return REPORT_EXPORT_FORMAT_CONFIG[format]?.label || format;
}

/**
 * Get report export format description
 */
export function getReportExportFormatDescription(format: ReportExportFormat): string {
  return REPORT_EXPORT_FORMAT_CONFIG[format]?.description || '';
}

/**
 * Get report export format category
 */
export function getReportExportFormatCategory(
  format: ReportExportFormat
): ReportExportFormatCategory {
  return REPORT_EXPORT_FORMAT_CATEGORY_MAP[format];
}

/**
 * Get report export format mime type
 */
export function getReportExportFormatMimeType(format: ReportExportFormat): string {
  return REPORT_EXPORT_FORMAT_CONFIG[format]?.mimeType || 'application/octet-stream';
}

/**
 * Get report export format file extension
 */
export function getReportExportFormatFileExtension(format: ReportExportFormat): string {
  return REPORT_EXPORT_FORMAT_CONFIG[format]?.fileExtension || 'bin';
}

/**
 * Get report export formats by category
 */
export function getReportExportFormatsByCategory(
  category: ReportExportFormatCategory
): ReportExportFormat[] {
  return Object.entries(REPORT_EXPORT_FORMAT_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([format]) => format as ReportExportFormat);
}

/**
 * Get document formats
 */
export function getDocumentFormats(): ReportExportFormat[] {
  return getReportExportFormatsByCategory(ReportExportFormatCategory.DOCUMENT);
}

/**
 * Get spreadsheet formats
 */
export function getSpreadsheetFormats(): ReportExportFormat[] {
  return getReportExportFormatsByCategory(ReportExportFormatCategory.SPREADSHEET);
}

/**
 * Get data formats
 */
export function getDataFormats(): ReportExportFormat[] {
  return getReportExportFormatsByCategory(ReportExportFormatCategory.DATA);
}

/**
 * Get image formats
 */
export function getImageFormats(): ReportExportFormat[] {
  return getReportExportFormatsByCategory(ReportExportFormatCategory.IMAGE);
}

/**
 * Get web formats
 */
export function getWebFormats(): ReportExportFormat[] {
  return getReportExportFormatsByCategory(ReportExportFormatCategory.WEB);
}

/**
 * Get text formats
 */
export function getTextFormats(): ReportExportFormat[] {
  return getReportExportFormatsByCategory(ReportExportFormatCategory.TEXT);
}

/**
 * Get ebook formats
 */
export function getEbookFormats(): ReportExportFormat[] {
  return getReportExportFormatsByCategory(ReportExportFormatCategory.EBOOK);
}

/**
 * Get presentation formats
 */
export function getPresentationFormats(): ReportExportFormat[] {
  return getReportExportFormatsByCategory(ReportExportFormatCategory.PRESENTATION);
}

/**
 * Check if format supports compression
 */
export function formatSupportsCompression(format: ReportExportFormat): boolean {
  return REPORT_EXPORT_FORMAT_CONFIG[format]?.supportsCompression || false;
}

/**
 * Check if format supports encryption
 */
export function formatSupportsEncryption(format: ReportExportFormat): boolean {
  return REPORT_EXPORT_FORMAT_CONFIG[format]?.supportsEncryption || false;
}

/**
 * Check if format is vector format
 */
export function formatIsVectorFormat(format: ReportExportFormat): boolean {
  return REPORT_EXPORT_FORMAT_CONFIG[format]?.isVectorFormat || false;
}

/**
 * Get format priority
 */
export function getReportExportFormatPriority(format: ReportExportFormat): number {
  return REPORT_EXPORT_FORMAT_CONFIG[format]?.priority || 3;
}

/**
 * Get high priority formats
 */
export function getHighPriorityFormats(): ReportExportFormat[] {
  return Object.values(ReportExportFormat).filter(
    (format) => getReportExportFormatPriority(format) === 1
  );
}

/**
 * Common format groups for reporting
 */
export const COMMON_REPORT_FORMATS = {
  /** Standard document formats */
  DOCUMENT: [ReportExportFormat.PDF, ReportExportFormat.WORD_DOCX, ReportExportFormat.HTML],
  /** Data export formats */
  DATA_EXPORT: [
    ReportExportFormat.CSV,
    ReportExportFormat.EXCEL_XLSX,
    ReportExportFormat.JSON,
    ReportExportFormat.XML,
  ],
  /** Image formats */
  IMAGE: [ReportExportFormat.PNG, ReportExportFormat.JPEG, ReportExportFormat.SVG],
  /** Web formats */
  WEB: [ReportExportFormat.HTML, ReportExportFormat.MHTML, ReportExportFormat.JSON],
} as const;

/**
 * Get recommended format for report type
 */
export function getRecommendedFormatForReport(reportType: string): ReportExportFormat {
  const formatMap: Record<string, ReportExportFormat> = {
    EXECUTIVE_SUMMARY_REPORT: ReportExportFormat.PDF,
    OPERATIONAL_REPORT: ReportExportFormat.EXCEL_XLSX,
    ANALYTICAL_REPORT: ReportExportFormat.PDF,
    STRATEGIC_REPORT: ReportExportFormat.PDF,
    FORECAST_REPORT: ReportExportFormat.EXCEL_XLSX,
    KPI_REPORT: ReportExportFormat.PDF,
    DASHBOARD_REPORT: ReportExportFormat.HTML,
    DETAILED_REPORT: ReportExportFormat.EXCEL_XLSX,
    CHART_REPORT: ReportExportFormat.PNG,
    TABLE_REPORT: ReportExportFormat.CSV,
  };
  return formatMap[reportType] || ReportExportFormat.PDF;
}

/**
 * Default export formats by category
 */
export const DEFAULT_FORMATS_BY_CATEGORY = {
  [ReportExportFormatCategory.DOCUMENT]: ReportExportFormat.PDF,
  [ReportExportFormatCategory.SPREADSHEET]: ReportExportFormat.EXCEL_XLSX,
  [ReportExportFormatCategory.DATA]: ReportExportFormat.CSV,
  [ReportExportFormatCategory.IMAGE]: ReportExportFormat.PNG,
  [ReportExportFormatCategory.WEB]: ReportExportFormat.HTML,
  [ReportExportFormatCategory.TEXT]: ReportExportFormat.TXT,
  [ReportExportFormatCategory.EBOOK]: ReportExportFormat.EPUB,
  [ReportExportFormatCategory.PRESENTATION]: ReportExportFormat.POWERPOINT_PPTX,
  [ReportExportFormatCategory.MARKUP]: ReportExportFormat.MARKDOWN,
} as const;
