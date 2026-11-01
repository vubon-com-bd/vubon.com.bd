export const REPORT_FORMAT = {
  PDF: 'pdf',
  CSV: 'csv',
  XLSX: 'xlsx',
  XLS: 'xls',
  JSON: 'json',
  XML: 'xml',
  HTML: 'html',
  DOCX: 'docx',
  TXT: 'txt',
} as const;

export const REPORT_FORMAT_MIME = {
  pdf: 'application/pdf',
  csv: 'text/csv',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  xls: 'application/vnd.ms-excel',
  json: 'application/json',
  xml: 'application/xml',
  html: 'text/html',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  txt: 'text/plain',
} as const;

export const REPORT_FORMAT_LIMIT = {
  MAX_PDF_SIZE_MB: 50,
  MAX_CSV_SIZE_MB: 100,
  MAX_XLSX_SIZE_MB: 100,
  MAX_JSON_SIZE_MB: 200,
  MAX_HTML_SIZE_MB: 50,
  MAX_ROWS_PDF: 10000,
  MAX_ROWS_CSV: 1000000,
  MAX_ROWS_XLSX: 500000,
  MAX_ROWS_JSON: 1000000,
} as const;

export type ReportFormatType = (typeof REPORT_FORMAT)[keyof typeof REPORT_FORMAT];
