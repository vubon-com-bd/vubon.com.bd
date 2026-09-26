import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const INVOICE_CONFIG = Object.freeze({
  prefix: getOptionalEnv('INVOICE_PREFIX', 'INV'),
  dueDaysDefault: getOptionalEnvInt('INVOICE_DUE_DAYS', 30),
  overdueGraceDays: getOptionalEnvInt('INVOICE_OVERDUE_GRACE_DAYS', 5),
  pdfStoragePath: getOptionalEnv('INVOICE_PDF_PATH', './storage/invoices'),
} as const);
