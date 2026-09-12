import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const REPORT_FORMAT = {
  TYPES: {
    ...COMMON_TYPES,
    PDF: 'pdf',
    EXCEL: 'excel',
    CSV: 'csv',
    JSON: 'json',
    XML: 'xml',
    HTML: 'html',
    PPTX: 'pptx',
    DOCX: 'docx',
  },
  FORMAT_EXTENSIONS: {
    PDF: '.pdf',
    EXCEL: '.xlsx',
    CSV: '.csv',
    JSON: '.json',
    XML: '.xml',
    HTML: '.html',
    PPTX: '.pptx',
    DOCX: '.docx',
  },
  DEFAULT_FORMAT: 'pdf',
  SUPPORTED_EXPORT_FORMATS: ['pdf', 'excel', 'csv', 'json'],
} as const;
