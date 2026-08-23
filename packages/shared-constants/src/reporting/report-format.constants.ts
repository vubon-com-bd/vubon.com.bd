/**
 * Report Format Constants
 * Supported formats for report export and generation
 */

export const REPORT_FORMAT = {
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
  } as const,

  // File Extensions
  EXTENSIONS: {
    PDF: '.pdf',
    EXCEL: '.xlsx',
    CSV: '.csv',
    JSON: '.json',
    XML: '.xml',
    HTML: '.html',
    MARKDOWN: '.md',
    DOCX: '.docx',
    PPTX: '.pptx',
    PNG: '.png',
    JPEG: '.jpg',
    SVG: '.svg',
    TXT: '.txt',
  } as const,

  // MIME Types
  MIME_TYPES: {
    PDF: 'application/pdf',
    EXCEL: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    CSV: 'text/csv',
    JSON: 'application/json',
    XML: 'application/xml',
    HTML: 'text/html',
    MARKDOWN: 'text/markdown',
    DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    PPTX: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    PNG: 'image/png',
    JPEG: 'image/jpeg',
    SVG: 'image/svg+xml',
    TXT: 'text/plain',
  } as const,

  // Print Quality
  PRINT_QUALITY: {
    DRAFT: 'draft',
    STANDARD: 'standard',
    HIGH: 'high',
    PREMIUM: 'premium',
  } as const,

  // Page Sizes
  PAGE_SIZES: {
    A3: 'a3',
    A4: 'a4',
    A5: 'a5',
    LEGAL: 'legal',
    LETTER: 'letter',
    TABLOID: 'tabloid',
    EXECUTIVE: 'executive',
  } as const,

  // Orientation
  ORIENTATIONS: {
    PORTRAIT: 'portrait',
    LANDSCAPE: 'landscape',
  } as const,

  // Compression Levels
  COMPRESSION: {
    NONE: 'none',
    FAST: 'fast',
    NORMAL: 'normal',
    MAXIMUM: 'maximum',
  } as const,

  // Font Sizes
  FONT_SIZES: {
    TINY: 8,
    SMALL: 10,
    NORMAL: 12,
    MEDIUM: 14,
    LARGE: 16,
    XLARGE: 18,
    XXLARGE: 20,
  } as const,

  // Font Families
  FONT_FAMILIES: {
    ARIAL: 'Arial',
    HELVETICA: 'Helvetica',
    TIMES: 'Times New Roman',
    GEORGIA: 'Georgia',
    VERDANA: 'Verdana',
    CALIBRI: 'Calibri',
    TAHOMA: 'Tahoma',
    COURIER: 'Courier New',
    MONTSERRAT: 'Montserrat',
    ROBOTO: 'Roboto',
    SANS: 'Sans Serif',
    SERIF: 'Serif',
    MONO: 'Monospace',
  } as const,

  // Colors
  COLORS: {
    BLACK: '#000000',
    WHITE: '#FFFFFF',
    GRAY: '#808080',
    RED: '#FF0000',
    GREEN: '#00FF00',
    BLUE: '#0000FF',
    PRIMARY: '#4F46E5',
    SECONDARY: '#10B981',
    INFO: '#3B82F6',
    WARNING: '#F59E0B',
    DANGER: '#EF4444',
    SUCCESS: '#10B981',
    LIGHT: '#F3F4F6',
    DARK: '#1F2937',
  } as const,
} as const;

// Format Types
export type ReportFormatType = (typeof REPORT_FORMAT.FORMATS)[keyof typeof REPORT_FORMAT.FORMATS];

// File Extensions
export type ReportFileExtension =
  (typeof REPORT_FORMAT.EXTENSIONS)[keyof typeof REPORT_FORMAT.EXTENSIONS];

// MIME Types
export type ReportMimeType =
  (typeof REPORT_FORMAT.MIME_TYPES)[keyof typeof REPORT_FORMAT.MIME_TYPES];

// Print Quality
export type ReportPrintQuality =
  (typeof REPORT_FORMAT.PRINT_QUALITY)[keyof typeof REPORT_FORMAT.PRINT_QUALITY];

// Page Sizes
export type ReportPageSize =
  (typeof REPORT_FORMAT.PAGE_SIZES)[keyof typeof REPORT_FORMAT.PAGE_SIZES];

// Orientations
export type ReportOrientation =
  (typeof REPORT_FORMAT.ORIENTATIONS)[keyof typeof REPORT_FORMAT.ORIENTATIONS];

// Compression Levels
export type ReportCompression =
  (typeof REPORT_FORMAT.COMPRESSION)[keyof typeof REPORT_FORMAT.COMPRESSION];

// Font Sizes
export type ReportFontSize =
  (typeof REPORT_FORMAT.FONT_SIZES)[keyof typeof REPORT_FORMAT.FONT_SIZES];

// Font Families
export type ReportFontFamily =
  (typeof REPORT_FORMAT.FONT_FAMILIES)[keyof typeof REPORT_FORMAT.FONT_FAMILIES];

// Colors
export type ReportColor = (typeof REPORT_FORMAT.COLORS)[keyof typeof REPORT_FORMAT.COLORS];

// Utility Functions
export function getReportFormatExtension(format: ReportFormatType): ReportFileExtension {
  const extensions: Record<ReportFormatType, ReportFileExtension> = {
    [REPORT_FORMAT.FORMATS.PDF]: REPORT_FORMAT.EXTENSIONS.PDF,
    [REPORT_FORMAT.FORMATS.EXCEL]: REPORT_FORMAT.EXTENSIONS.EXCEL,
    [REPORT_FORMAT.FORMATS.CSV]: REPORT_FORMAT.EXTENSIONS.CSV,
    [REPORT_FORMAT.FORMATS.JSON]: REPORT_FORMAT.EXTENSIONS.JSON,
    [REPORT_FORMAT.FORMATS.XML]: REPORT_FORMAT.EXTENSIONS.XML,
    [REPORT_FORMAT.FORMATS.HTML]: REPORT_FORMAT.EXTENSIONS.HTML,
    [REPORT_FORMAT.FORMATS.MARKDOWN]: REPORT_FORMAT.EXTENSIONS.MARKDOWN,
    [REPORT_FORMAT.FORMATS.DOCX]: REPORT_FORMAT.EXTENSIONS.DOCX,
    [REPORT_FORMAT.FORMATS.PPTX]: REPORT_FORMAT.EXTENSIONS.PPTX,
    [REPORT_FORMAT.FORMATS.PNG]: REPORT_FORMAT.EXTENSIONS.PNG,
    [REPORT_FORMAT.FORMATS.JPEG]: REPORT_FORMAT.EXTENSIONS.JPEG,
    [REPORT_FORMAT.FORMATS.SVG]: REPORT_FORMAT.EXTENSIONS.SVG,
    [REPORT_FORMAT.FORMATS.TXT]: REPORT_FORMAT.EXTENSIONS.TXT,
  };
  return extensions[format] || REPORT_FORMAT.EXTENSIONS.PDF;
}

export function getReportFormatMimeType(format: ReportFormatType): ReportMimeType {
  const mimeTypes: Record<ReportFormatType, ReportMimeType> = {
    [REPORT_FORMAT.FORMATS.PDF]: REPORT_FORMAT.MIME_TYPES.PDF,
    [REPORT_FORMAT.FORMATS.EXCEL]: REPORT_FORMAT.MIME_TYPES.EXCEL,
    [REPORT_FORMAT.FORMATS.CSV]: REPORT_FORMAT.MIME_TYPES.CSV,
    [REPORT_FORMAT.FORMATS.JSON]: REPORT_FORMAT.MIME_TYPES.JSON,
    [REPORT_FORMAT.FORMATS.XML]: REPORT_FORMAT.MIME_TYPES.XML,
    [REPORT_FORMAT.FORMATS.HTML]: REPORT_FORMAT.MIME_TYPES.HTML,
    [REPORT_FORMAT.FORMATS.MARKDOWN]: REPORT_FORMAT.MIME_TYPES.MARKDOWN,
    [REPORT_FORMAT.FORMATS.DOCX]: REPORT_FORMAT.MIME_TYPES.DOCX,
    [REPORT_FORMAT.FORMATS.PPTX]: REPORT_FORMAT.MIME_TYPES.PPTX,
    [REPORT_FORMAT.FORMATS.PNG]: REPORT_FORMAT.MIME_TYPES.PNG,
    [REPORT_FORMAT.FORMATS.JPEG]: REPORT_FORMAT.MIME_TYPES.JPEG,
    [REPORT_FORMAT.FORMATS.SVG]: REPORT_FORMAT.MIME_TYPES.SVG,
    [REPORT_FORMAT.FORMATS.TXT]: REPORT_FORMAT.MIME_TYPES.TXT,
  };
  return mimeTypes[format] || REPORT_FORMAT.MIME_TYPES.PDF;
}

export function getReportFormatLabel(format: ReportFormatType): string {
  const labels: Record<ReportFormatType, string> = {
    [REPORT_FORMAT.FORMATS.PDF]: 'PDF Document',
    [REPORT_FORMAT.FORMATS.EXCEL]: 'Excel Spreadsheet',
    [REPORT_FORMAT.FORMATS.CSV]: 'CSV File',
    [REPORT_FORMAT.FORMATS.JSON]: 'JSON File',
    [REPORT_FORMAT.FORMATS.XML]: 'XML File',
    [REPORT_FORMAT.FORMATS.HTML]: 'HTML Page',
    [REPORT_FORMAT.FORMATS.MARKDOWN]: 'Markdown Document',
    [REPORT_FORMAT.FORMATS.DOCX]: 'Word Document',
    [REPORT_FORMAT.FORMATS.PPTX]: 'PowerPoint Presentation',
    [REPORT_FORMAT.FORMATS.PNG]: 'PNG Image',
    [REPORT_FORMAT.FORMATS.JPEG]: 'JPEG Image',
    [REPORT_FORMAT.FORMATS.SVG]: 'SVG Image',
    [REPORT_FORMAT.FORMATS.TXT]: 'Text File',
  };
  return labels[format] || 'Unknown Format';
}

export function getReportPageSizeLabel(pageSize: ReportPageSize): string {
  const labels: Record<ReportPageSize, string> = {
    [REPORT_FORMAT.PAGE_SIZES.A3]: 'A3',
    [REPORT_FORMAT.PAGE_SIZES.A4]: 'A4',
    [REPORT_FORMAT.PAGE_SIZES.A5]: 'A5',
    [REPORT_FORMAT.PAGE_SIZES.LEGAL]: 'Legal',
    [REPORT_FORMAT.PAGE_SIZES.LETTER]: 'Letter',
    [REPORT_FORMAT.PAGE_SIZES.TABLOID]: 'Tabloid',
    [REPORT_FORMAT.PAGE_SIZES.EXECUTIVE]: 'Executive',
  };
  return labels[pageSize] || 'Unknown Page Size';
}

export function getReportOrientationLabel(orientation: ReportOrientation): string {
  const labels: Record<ReportOrientation, string> = {
    [REPORT_FORMAT.ORIENTATIONS.PORTRAIT]: 'Portrait',
    [REPORT_FORMAT.ORIENTATIONS.LANDSCAPE]: 'Landscape',
  };
  return labels[orientation] || 'Unknown Orientation';
}

export function isImageFormat(format: ReportFormatType): boolean {
  const imageFormats: ReportFormatType[] = [
    REPORT_FORMAT.FORMATS.PNG,
    REPORT_FORMAT.FORMATS.JPEG,
    REPORT_FORMAT.FORMATS.SVG,
  ];
  return imageFormats.includes(format);
}

export function isSpreadsheetFormat(format: ReportFormatType): boolean {
  const spreadsheetFormats: ReportFormatType[] = [
    REPORT_FORMAT.FORMATS.EXCEL,
    REPORT_FORMAT.FORMATS.CSV,
  ];
  return spreadsheetFormats.includes(format);
}

export function isDocumentFormat(format: ReportFormatType): boolean {
  const documentFormats: ReportFormatType[] = [
    REPORT_FORMAT.FORMATS.PDF,
    REPORT_FORMAT.FORMATS.DOCX,
    REPORT_FORMAT.FORMATS.TXT,
    REPORT_FORMAT.FORMATS.MARKDOWN,
  ];
  return documentFormats.includes(format);
}
