export const ERROR_CODE = {
  // ─── Auth ──────────────────────────────────────────────
  AUTH_INVALID_CREDENTIALS: 'AUTH-001',
  AUTH_TOKEN_EXPIRED: 'AUTH-002',
  AUTH_TOKEN_INVALID: 'AUTH-003',
  AUTH_UNAUTHORIZED: 'AUTH-004',
  AUTH_FORBIDDEN: 'AUTH-005',
  AUTH_MFA_REQUIRED: 'AUTH-006',
  AUTH_ACCOUNT_LOCKED: 'AUTH-007',
  AUTH_SESSION_EXPIRED: 'AUTH-008',
  AUTH_SESSION_REVOKED: 'AUTH-009',
  AUTH_MFA_INVALID: 'AUTH-010',
  AUTH_UNTRUSTED_DEVICE: 'AUTH-011',
  AUTH_SOCIAL_ALREADY_LINKED: 'AUTH-012',
  AUTH_OAUTH_FAILED: 'AUTH-013',
  AUTH_SSO_FAILED: 'AUTH-014',
  AUTH_BIOMETRIC_FAILED: 'AUTH-015',
  AUTH_VERIFICATION_EXPIRED: 'AUTH-016',
  AUTH_WEAK_PASSWORD: 'AUTH-017',
  AUTH_INVALID_ROLE: 'AUTH-018',
  AUTH_INVALID_EMAIL: 'AUTH-019',
  AUTH_INVALID_NAME: 'AUTH-020',
  AUTH_INVALID_PHONE: 'AUTH-021',
  AUTH_INVALID_STATUS: 'AUTH-022',
  AUTH_INVALID_TYPE: 'AUTH-023',
  AUTH_INVALID_TOKEN_FORMAT: 'AUTH-024',
  AUTH_TOO_MANY_ATTEMPTS: 'AUTH-025',

  // ─── Validation ────────────────────────────────────────
  VAL_REQUIRED: 'VAL-001',
  VAL_INVALID_FORMAT: 'VAL-002',
  VAL_OUT_OF_RANGE: 'VAL-003',
  VAL_DUPLICATE: 'VAL-004',

  // ─── User ──────────────────────────────────────────────
  USER_NOT_FOUND: 'USR-001',
  USER_ALREADY_EXISTS: 'USR-002',
  USER_INACTIVE: 'USR-003',

  // ─── Product ───────────────────────────────────────────
  PRODUCT_NOT_FOUND: 'PRD-001',
  PRODUCT_OUT_OF_STOCK: 'PRD-002',

  // ─── Cart ──────────────────────────────────────────────
  CART_EMPTY: 'CRT-001',
  CART_ITEM_NOT_FOUND: 'CRT-002',

  // ─── Order ─────────────────────────────────────────────
  ORDER_NOT_FOUND: 'ORD-001',
  ORDER_ALREADY_CANCELLED: 'ORD-002',

  // ─── Payment (Basic) ───────────────────────────────────
  PAYMENT_FAILED: 'PAY-001',
  PAYMENT_DECLINED: 'PAY-002',

  // ─── Payment (Extended) ────────────────────────────────
  PAYMENT_NOT_FOUND: 'PAY-003',
  PAYMENT_ALREADY_COMPLETED: 'PAY-004',
  PAYMENT_OPERATION_FAILED: 'PAY-005',
  PAYMENT_INVALID_METHOD: 'PAY-006',
  PAYMENT_METHOD_NOT_SUPPORTED: 'PAY-007',
  PAYMENT_METHOD_OPERATION_FAILED: 'PAY-008',
  PAYMENT_GATEWAY_TIMEOUT: 'PAY-009',
  PAYMENT_GATEWAY_UNAVAILABLE: 'PAY-010',
  PAYMENT_VERIFICATION_FAILED: 'PAY-011',
  PAYMENT_SIGNATURE_INVALID: 'PAY-012',

  // ─── Transaction ───────────────────────────────────────
  TRANSACTION_NOT_FOUND: 'TXN-001',
  TRANSACTION_CONFLICT: 'TXN-002',
  TRANSACTION_OPERATION_FAILED: 'TXN-003',

  // ─── Refund ────────────────────────────────────────────
  REFUND_NOT_FOUND: 'RFD-001',
  REFUND_WINDOW_EXPIRED: 'RFD-002',
  REFUND_OPERATION_FAILED: 'RFD-003',

  // ─── Subscription ──────────────────────────────────────
  SUBSCRIPTION_NOT_FOUND: 'SUB-001',
  SUBSCRIPTION_EXPIRED: 'SUB-002',
  SUBSCRIPTION_OPERATION_FAILED: 'SUB-003',

  // ─── Invoice ───────────────────────────────────────────
  INVOICE_NOT_FOUND: 'INV-001',
  INVOICE_OVERDUE: 'INV-002',
  INVOICE_OPERATION_FAILED: 'INV-003',

  // ─── Idempotency ───────────────────────────────────────
  DUPLICATE_REQUEST: 'IDP-001',

  // ─── Webhook ───────────────────────────────────────────
  WEBHOOK_PROCESSING_FAILED: 'WHK-001',
  WEBHOOK_SIGNATURE_INVALID: 'WHK-002',

  // ─── Server ────────────────────────────────────────────
  SERVER_INTERNAL: 'SRV-001',
  SERVER_UNAVAILABLE: 'SRV-002',
  SERVER_TIMEOUT: 'SRV-003',

  // ─── Rate Limit ────────────────────────────────────────
  RATE_LIMIT_EXCEEDED: 'RATE-001',
} as const;

export type ErrorCodeType = (typeof ERROR_CODE)[keyof typeof ERROR_CODE];
