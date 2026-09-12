import { SECURITY } from '@vubon/shared-constants/src/common/security.constants';

export const securityHeadersConfig = {
  'X-Content-Type-Options': SECURITY.HEADERS.X_CONTENT_TYPE_OPTIONS,
  'X-Frame-Options': SECURITY.HEADERS.X_FRAME_OPTIONS,
  'X-XSS-Protection': SECURITY.HEADERS.X_XSS_PROTECTION,
  'Referrer-Policy': SECURITY.HEADERS.REFERRER_POLICY,
  'Permissions-Policy': SECURITY.HEADERS.PERMISSIONS_POLICY,
  'Strict-Transport-Security': SECURITY.HEADERS.STRICT_TRANSPORT_SECURITY,
  'Content-Security-Policy': SECURITY.HEADERS.CONTENT_SECURITY_POLICY,
} as const;
