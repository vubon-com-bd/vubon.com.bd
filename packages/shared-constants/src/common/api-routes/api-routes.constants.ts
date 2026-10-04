/**
 * API route constants.
 *
 * Rule: ALL endpoint paths live here.
 * shared-api imports from here — NEVER hardcodes URLs.
 *
 * Dynamic segments use `:param` syntax.
 * Example: '/products/:id' → paramEndpoint(template, { id })
 *
 * @module shared-constants/common/api-routes
 */

export const API_ROUTES = Object.freeze({
  // ─────────────────────────────────────────────
  // Health / Metrics / Version (Infrastructure)
  // ─────────────────────────────────────────────
  HEALTH: Object.freeze({
    LIVE: '/health/live',
    READY: '/health/ready',
    FULL: '/health',
  }),

  METRICS: Object.freeze({
    SNAPSHOT: '/metrics',
    PROMETHEUS: '/metrics/prometheus',
  }),

  VERSION: Object.freeze({
    CURRENT: '/version',
  }),

  // ─────────────────────────────────────────────
  // Auth
  // ─────────────────────────────────────────────
  AUTH: Object.freeze({
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',

    MFA_SETUP: '/auth/mfa/setup',
    MFA_VERIFY: '/auth/mfa/verify',
    MFA_DISABLE: '/auth/mfa/disable',

    SOCIAL_LOGIN: '/auth/social/:provider',
    OAUTH_AUTHORIZE: '/auth/oauth/authorize',
    OAUTH_CALLBACK: '/auth/oauth/callback',
    SSO_LOGIN: '/auth/sso/login',
    SSO_CALLBACK: '/auth/sso/callback',

    BIOMETRIC_REGISTER: '/auth/biometric/register',
    BIOMETRIC_VERIFY: '/auth/biometric/verify',

    SESSION_LIST: '/auth/sessions',
    SESSION_DETAIL: '/auth/sessions/:id',
    SESSION_REVOKE: '/auth/sessions/:id',
  }),

  // ─────────────────────────────────────────────
  // User
  // ─────────────────────────────────────────────
  USER: Object.freeze({
    PROFILE: '/user/profile',
    PROFILE_UPDATE: '/user/profile',
    SETTINGS: '/user/settings',
    PREFERENCES: '/user/preferences',

    ADDRESS_LIST: '/user/addresses',
    ADDRESS_CREATE: '/user/addresses',
    ADDRESS_DETAIL: '/user/addresses/:id',
    ADDRESS_UPDATE: '/user/addresses/:id',
    ADDRESS_DELETE: '/user/addresses/:id',

    CONTACT_LIST: '/user/contacts',
    CONTACT_CREATE: '/user/contacts',
    CONTACT_DELETE: '/user/contacts/:id',

    VERIFICATION_START: '/user/verification/start',
    VERIFICATION_STATUS: '/user/verification/status',

    KYC_SUBMIT: '/user/kyc',
    KYC_STATUS: '/user/kyc/status',

    ACTIVITY_LIST: '/user/activity',
    ACTIVITY_DETAIL: '/user/activity/:id',
  }),

  // ─────────────────────────────────────────────
  // Business — Product
  // ─────────────────────────────────────────────
  PRODUCT: Object.freeze({
    LIST: '/products',
    DETAIL: '/products/:id',
    CREATE: '/products',
    UPDATE: '/products/:id',
    DELETE: '/products/:id',
    SEARCH: '/products/search',
  }),

  CATEGORY: Object.freeze({
    LIST: '/categories',
    DETAIL: '/categories/:id',
  }),

  BRAND: Object.freeze({
    LIST: '/brands',
    DETAIL: '/brands/:id',
  }),

  VARIANT: Object.freeze({
    LIST: '/products/:productId/variants',
    DETAIL: '/products/:productId/variants/:id',
  }),

  INVENTORY: Object.freeze({
    LIST: '/inventory',
    DETAIL: '/inventory/:productId',
    UPDATE: '/inventory/:productId',
  }),

  PRICING: Object.freeze({
    GET: '/pricing/:productId',
    UPDATE: '/pricing/:productId',
  }),

  REVIEW: Object.freeze({
    LIST: '/products/:productId/reviews',
    CREATE: '/products/:productId/reviews',
    DELETE: '/products/:productId/reviews/:id',
  }),

  // ─────────────────────────────────────────────
  // Business — Cart / Checkout / Payment / Order
  // ─────────────────────────────────────────────
  CART: Object.freeze({
    GET: '/cart',
    ADD_ITEM: '/cart/items',
    UPDATE_ITEM: '/cart/items/:id',
    REMOVE_ITEM: '/cart/items/:id',
    CLEAR: '/cart',
    APPLY_COUPON: '/cart/coupon',
    REMOVE_COUPON: '/cart/coupon',
  }),

  COUPON: Object.freeze({
    LIST: '/coupons',
    VALIDATE: '/coupons/validate',
  }),

  VOUCHER: Object.freeze({
    LIST: '/vouchers',
    VALIDATE: '/vouchers/validate',
  }),

  CHECKOUT: Object.freeze({
    INITIATE: '/checkout',
    CONFIRM: '/checkout/confirm',
    CANCEL: '/checkout/cancel',
  }),

  PAYMENT: Object.freeze({
    CREATE: '/payments',
    DETAIL: '/payments/:id',
    REFUND: '/payments/:id/refund',
    METHODS: '/payments/methods',
  }),

  TRANSACTION: Object.freeze({
    LIST: '/transactions',
    DETAIL: '/transactions/:id',
  }),

  ORDER: Object.freeze({
    LIST: '/orders',
    DETAIL: '/orders/:id',
    CREATE: '/orders',
    CANCEL: '/orders/:id/cancel',
    RETURN: '/orders/:id/return',
    TRACKING: '/orders/:id/tracking',
  }),

  TAX: Object.freeze({
    CALCULATE: '/tax/calculate',
    LIST: '/tax',
  }),

  FLASH_SALE: Object.freeze({
    LIST: '/flash-sales',
    DETAIL: '/flash-sales/:id',
  }),

  DEAL: Object.freeze({
    LIST: '/deals',
    DETAIL: '/deals/:id',
  }),

  BUNDLE_DEAL: Object.freeze({
    LIST: '/bundle-deals',
    DETAIL: '/bundle-deals/:id',
  }),

  // ─────────────────────────────────────────────
  // Business — Vendor
  // ─────────────────────────────────────────────
  VENDOR: Object.freeze({
    LIST: '/vendors',
    DETAIL: '/vendors/:id',
    CREATE: '/vendors',
    UPDATE: '/vendors/:id',

    COMMISSION_LIST: '/vendors/:id/commissions',
    PAYOUT_LIST: '/vendors/:id/payouts',
    PERFORMANCE: '/vendors/:id/performance',

    DOCUMENT_LIST: '/vendors/:id/documents',
    DOCUMENT_UPLOAD: '/vendors/:id/documents',

    TEAM_LIST: '/vendors/:id/team',
    TEAM_INVITE: '/vendors/:id/team/invite',

    SUBSCRIPTION: '/vendors/:id/subscription',
  }),

  // ─────────────────────────────────────────────
  // Platform
  // ─────────────────────────────────────────────
  ANALYTICS: Object.freeze({
    TRACK: '/analytics/track',
    REPORT: '/analytics/report',
  }),

  NOTIFICATION: Object.freeze({
    LIST: '/notifications',
    DETAIL: '/notifications/:id',
    MARK_READ: '/notifications/:id/read',
    MARK_ALL_READ: '/notifications/read-all',
    PREFERENCES: '/notifications/preferences',
  }),

  EMAIL: Object.freeze({
    SEND: '/email/send',
    TEMPLATES: '/email/templates',
  }),

  SMS: Object.freeze({
    SEND: '/sms/send',
  }),

  PUSH: Object.freeze({
    SEND: '/push/send',
    SUBSCRIBE: '/push/subscribe',
  }),

  REPORTING: Object.freeze({
    REPORT_LIST: '/reports',
    REPORT_DETAIL: '/reports/:id',
    DASHBOARD: '/reports/dashboard',
    WIDGET: '/reports/widgets/:id',
  }),

  SEARCH: Object.freeze({
    QUERY: '/search',
    AUTOCOMPLETE: '/search/autocomplete',
    FACET: '/search/facets',
  }),

  SEO: Object.freeze({
    GET: '/seo/:path',
    SITEMAP: '/seo/sitemap',
    ROBOTS: '/seo/robots',
  }),

  DISCOVERY: Object.freeze({
    FEED: '/discovery/feed',
    RECOMMENDATION: '/discovery/recommendations',
    TRENDING: '/discovery/trending',
  }),

  WEBHOOK: Object.freeze({
    LIST: '/webhooks',
    CREATE: '/webhooks',
    DETAIL: '/webhooks/:id',
    UPDATE: '/webhooks/:id',
    DELETE: '/webhooks/:id',
  }),

  // ─────────────────────────────────────────────
  // AI
  // ─────────────────────────────────────────────
  AI_MODEL: Object.freeze({
    LIST: '/ai/models',
    DETAIL: '/ai/models/:id',
    INFER: '/ai/models/:id/infer',
  }),

  AI_RECOMMENDATION: Object.freeze({
    GET: '/ai/recommendations',
  }),

  AI_PERSONALIZATION: Object.freeze({
    GET: '/ai/personalization',
  }),

  AI_RANKING: Object.freeze({
    RANK: '/ai/ranking',
  }),

  AI_TRAINING: Object.freeze({
    START: '/ai/training/start',
    STATUS: '/ai/training/:jobId',
  }),

  AI_EMBEDDING: Object.freeze({
    CREATE: '/ai/embeddings',
  }),

  AI_VECTOR: Object.freeze({
    SEARCH: '/ai/vectors/search',
    UPSERT: '/ai/vectors',
  }),

  AI_FORECAST: Object.freeze({
    GET: '/ai/forecast',
  }),

  AI_INSIGHT: Object.freeze({
    LIST: '/ai/insights',
  }),

  // ─────────────────────────────────────────────
  // Marketing
  // ─────────────────────────────────────────────
  CAMPAIGN: Object.freeze({
    LIST: '/marketing/campaigns',
    DETAIL: '/marketing/campaigns/:id',
    CREATE: '/marketing/campaigns',
  }),

  PROMOTION: Object.freeze({
    LIST: '/marketing/promotions',
    DETAIL: '/marketing/promotions/:id',
  }),

  AFFILIATE: Object.freeze({
    LIST: '/marketing/affiliates',
    DETAIL: '/marketing/affiliates/:id',
    REGISTER: '/marketing/affiliates/register',
  }),

  REFERRAL: Object.freeze({
    GET: '/marketing/referrals',
    INVITE: '/marketing/referrals/invite',
  }),

  LOYALTY: Object.freeze({
    GET: '/marketing/loyalty',
    REDEEM: '/marketing/loyalty/redeem',
  }),

  EMAIL_MARKETING: Object.freeze({
    LIST: '/marketing/email',
    SEND: '/marketing/email/send',
  }),

  SMS_MARKETING: Object.freeze({
    LIST: '/marketing/sms',
    SEND: '/marketing/sms/send',
  }),

  LEAD_GENERATION: Object.freeze({
    LIST: '/marketing/leads',
    CREATE: '/marketing/leads',
  }),

  // ─────────────────────────────────────────────
  // Support
  // ─────────────────────────────────────────────
  TICKET: Object.freeze({
    LIST: '/support/tickets',
    DETAIL: '/support/tickets/:id',
    CREATE: '/support/tickets',
    UPDATE: '/support/tickets/:id',
    CLOSE: '/support/tickets/:id/close',
  }),

  CONVERSATION: Object.freeze({
    LIST: '/support/conversations',
    DETAIL: '/support/conversations/:id',
    CREATE: '/support/conversations',
  }),

  MESSAGE: Object.freeze({
    LIST: '/support/conversations/:conversationId/messages',
    SEND: '/support/conversations/:conversationId/messages',
  }),

  FEEDBACK: Object.freeze({
    LIST: '/support/feedback',
    SUBMIT: '/support/feedback',
  }),

  COMPLAINT: Object.freeze({
    LIST: '/support/complaints',
    CREATE: '/support/complaints',
    DETAIL: '/support/complaints/:id',
  }),

  SURVEY: Object.freeze({
    LIST: '/support/surveys',
    SUBMIT: '/support/surveys/:id/submit',
  }),

  LIVE_CHAT: Object.freeze({
    START: '/support/live-chat/start',
    END: '/support/live-chat/:id/end',
  }),

  CHATBOT: Object.freeze({
    MESSAGE: '/support/chatbot/message',
  }),

  FAQ: Object.freeze({
    LIST: '/support/faq',
    DETAIL: '/support/faq/:id',
  }),

  // ─────────────────────────────────────────────
  // Logistics
  // ─────────────────────────────────────────────
  SHIPMENT: Object.freeze({
    LIST: '/logistics/shipments',
    DETAIL: '/logistics/shipments/:id',
    CREATE: '/logistics/shipments',
  }),

  DELIVERY: Object.freeze({
    LIST: '/logistics/deliveries',
    DETAIL: '/logistics/deliveries/:id',
  }),

  COURIER: Object.freeze({
    LIST: '/logistics/couriers',
    DETAIL: '/logistics/couriers/:id',
  }),

  TRACKING: Object.freeze({
    GET: '/logistics/tracking/:trackingId',
  }),

  WAREHOUSE: Object.freeze({
    LIST: '/logistics/warehouses',
    DETAIL: '/logistics/warehouses/:id',
  }),

  FULFILLMENT: Object.freeze({
    LIST: '/logistics/fulfillments',
    DETAIL: '/logistics/fulfillments/:id',
  }),

  DISPATCH: Object.freeze({
    LIST: '/logistics/dispatches',
    CREATE: '/logistics/dispatches',
  }),

  VEHICLE: Object.freeze({
    LIST: '/logistics/vehicles',
    DETAIL: '/logistics/vehicles/:id',
  }),

  DRIVER: Object.freeze({
    LIST: '/logistics/drivers',
    DETAIL: '/logistics/drivers/:id',
  }),

  ROUTE: Object.freeze({
    LIST: '/logistics/routes',
    DETAIL: '/logistics/routes/:id',
  }),

  // ─────────────────────────────────────────────
  // Upload
  // ─────────────────────────────────────────────
  UPLOAD: Object.freeze({
    IMAGE: '/upload/image',
    VIDEO: '/upload/video',
    DOCUMENT: '/upload/document',

    CHUNKED_INIT: '/upload/chunked/init',
    CHUNKED_PART: '/upload/chunked/:uploadId/part',
    CHUNKED_COMPLETE: '/upload/chunked/:uploadId/complete',
    CHUNKED_ABORT: '/upload/chunked/:uploadId/abort',
  }),
} as const);

export type ApiRoutes = typeof API_ROUTES;

/** All top-level route groups (for iteration / testing). */
export const API_ROUTE_GROUPS = Object.freeze(
  Object.keys(API_ROUTES) as readonly (keyof typeof API_ROUTES)[]
);
