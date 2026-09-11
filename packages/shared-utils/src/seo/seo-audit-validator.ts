import { SEO_AUDIT } from '@vubon/shared-constants/src/platform/seo/seo-audit.constants';

export interface SEOAuditInput {
  seoId: string;
  status: string;
  type: string;
  frequency: string;
}

export const validateSEOAudit = (
  audit: Partial<SEOAuditInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!audit.seoId) errors.push('SEO ID is required');
  if (audit.status && !Object.keys(SEO_AUDIT.STATUS).includes(audit.status)) {
    errors.push('Invalid audit status');
  }
  if (audit.type && !Object.keys(SEO_AUDIT.TYPES).includes(audit.type)) {
    errors.push('Invalid audit type');
  }
  if (audit.frequency && !Object.keys(SEO_AUDIT.AUDIT_FREQUENCIES).includes(audit.frequency)) {
    errors.push('Invalid frequency');
  }
  return { isValid: errors.length === 0, errors };
};
