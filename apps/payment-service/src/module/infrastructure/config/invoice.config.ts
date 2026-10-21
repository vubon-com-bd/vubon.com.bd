/**
 * Invoice Infra Configuration
 * @module payment-service/infrastructure/config
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const INVOICE_INFRA_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('INVOICE_ENABLED', true),
  prefix: getOptionalEnv('INVOICE_PREFIX', 'INV'),
  dueDaysDefault: getOptionalEnvInt('INVOICE_DUE_DAYS', 15),
  overdueGraceDays: getOptionalEnvInt('INVOICE_OVERDUE_GRACE_DAYS', 3),
  emailEnabled: getOptionalEnvBool('INVOICE_EMAIL_ENABLED', true),
  attachmentEnabled: getOptionalEnvBool('INVOICE_ATTACHMENT_ENABLED', true),
  autoSendOnIssue: getOptionalEnvBool('INVOICE_AUTO_SEND', false),
  numberSequence: getOptionalEnvInt('INVOICE_NUMBER_SEQUENCE', 6),
});

export type InvoiceInfraConfig = typeof INVOICE_INFRA_CONFIG;
