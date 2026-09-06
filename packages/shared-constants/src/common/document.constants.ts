/**
 * Document Constants
 * @module shared-constants/common/document.constants
 */

export const DOCUMENT = {
  // Document types
  TYPES: {
    PDF: 'pdf',
    WORD: 'word',
    EXCEL: 'excel',
    POWERPOINT: 'powerpoint',
    TEXT: 'text',
    CSV: 'csv',
    RTF: 'rtf',
    ODT: 'odt',
    ODS: 'ods',
    ODP: 'odp',
    MD: 'markdown',
    HTML: 'html',
    XML: 'xml',
    JSON: 'json',
  } as const,

  // Document formats
  FORMATS: {
    PDF: 'pdf',
    DOC: 'doc',
    DOCX: 'docx',
    XLS: 'xls',
    XLSX: 'xlsx',
    PPT: 'ppt',
    PPTX: 'pptx',
    TXT: 'txt',
    CSV: 'csv',
    RTF: 'rtf',
    ODT: 'odt',
    ODS: 'ods',
    ODP: 'odp',
    MD: 'md',
    HTML: 'html',
    XML: 'xml',
    JSON: 'json',
  } as const,

  // Document extensions
  EXTENSIONS: {
    PDF: ['pdf'],
    WORD: ['doc', 'docx'],
    EXCEL: ['xls', 'xlsx', 'xlsm', 'xlsb'],
    POWERPOINT: ['ppt', 'pptx', 'ppsx'],
    TEXT: ['txt'],
    CSV: ['csv'],
    RTF: ['rtf'],
    ODT: ['odt'],
    ODS: ['ods'],
    ODP: ['odp'],
    MARKDOWN: ['md', 'markdown'],
    HTML: ['html', 'htm'],
    XML: ['xml'],
    JSON: ['json'],
  } as const,

  // MIME types
  MIME_TYPES: {
    PDF: 'application/pdf',
    WORD: 'application/msword',
    DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    EXCEL: 'application/vnd.ms-excel',
    XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    POWERPOINT: 'application/vnd.ms-powerpoint',
    PPTX: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    TEXT: 'text/plain',
    CSV: 'text/csv',
    RTF: 'application/rtf',
    ODT: 'application/vnd.oasis.opendocument.text',
    ODS: 'application/vnd.oasis.opendocument.spreadsheet',
    ODP: 'application/vnd.oasis.opendocument.presentation',
    HTML: 'text/html',
    XML: 'application/xml',
    JSON: 'application/json',
  } as const,

  // Document settings
  SETTINGS: {
    MAX_FILE_SIZE_MB: 20,
    ALLOWED_EXTENSIONS: [
      'pdf',
      'doc',
      'docx',
      'xls',
      'xlsx',
      'ppt',
      'pptx',
      'txt',
      'csv',
      'rtf',
      'odt',
      'ods',
      'odp',
      'md',
      'html',
      'xml',
      'json',
    ],
    ALLOWED_MIME_TYPES: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'text/csv',
      'application/rtf',
      'application/vnd.oasis.opendocument.text',
      'application/vnd.oasis.opendocument.spreadsheet',
      'application/vnd.oasis.opendocument.presentation',
      'text/html',
      'application/xml',
      'application/json',
    ],
    MAX_PAGES: 1000,
    MAX_ROWS: 100000,
    MAX_SHEETS: 50,
    MAX_SLIDES: 100,
  },

  // Document processing
  PROCESSING: {
    EXTRACT_TEXT: true,
    EXTRACT_METADATA: true,
    GENERATE_PREVIEW: true,
    CONVERT_TO_PDF: false,
    OPTIMIZE: true,
    COMPRESS: false,
  },

  // Document features
  FEATURES: {
    THUMBNAIL: true,
    PREVIEW: true,
    SEARCHABLE: true,
    PRINTABLE: true,
    DOWNLOADABLE: true,
    SHAREABLE: true,
    EDITABLE: false,
  },

  // Default values
  DEFAULT: {
    FORMAT: 'pdf',
    SIZE_MB: 1,
  },
} as const;

export type DocumentType = (typeof DOCUMENT.TYPES)[keyof typeof DOCUMENT.TYPES];
export type DocumentFormat = (typeof DOCUMENT.FORMATS)[keyof typeof DOCUMENT.FORMATS];
export type DocumentExtension = keyof typeof DOCUMENT.EXTENSIONS;
export type DocumentMimeType = keyof typeof DOCUMENT.MIME_TYPES;
