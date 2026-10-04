export const DOCUMENT_FORMAT = {
  PDF: 'pdf',
  DOC: 'doc',
  DOCX: 'docx',
  XLS: 'xls',
  XLSX: 'xlsx',
  PPT: 'ppt',
  PPTX: 'pptx',
  TXT: 'txt',
  CSV: 'csv',
  JSON: 'json',
  XML: 'xml',
  ZIP: 'zip',
  RAR: 'rar',
} as const;

export const DOCUMENT_MIME = {
  PDF: 'application/pdf',
  DOC: 'application/msword',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  CSV: 'text/csv',
  TXT: 'text/plain',
  JSON: 'application/json',
  ZIP: 'application/zip',
} as const;

export type DocumentFormatType = (typeof DOCUMENT_FORMAT)[keyof typeof DOCUMENT_FORMAT];
