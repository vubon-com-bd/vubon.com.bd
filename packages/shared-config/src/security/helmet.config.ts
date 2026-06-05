/**
 * Helmet/Security Headers Configuration - CSP and security policies
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-config/src/security/helmet.config
 * 
 * RULES:
 * ✅ ONLY security headers configuration - NO business logic
 * ✅ NO middleware execution, helmet() binding
 * ✅ Readonly frozen config
 * ✅ Named exports only
 * ✅ No side effects or external API calls
 */

import { env } from '../env/env.validation';

// ==================== Constants ====================

// ✅ FIXED: Removed unused DEVELOPMENT_DOMAINS
// const DEVELOPMENT_DOMAINS = [...]

// Production domains (Bangladesh specific)
const PRODUCTION_DOMAINS = [
  'https://vubon.com.bd',
  'https://www.vubon.com.bd',
  'https://api.vubon.com.bd',
  'https://admin.vubon.com.bd',
  'https://seller.vubon.com.bd',
];

// CDN domains
const CDN_DOMAINS = [
  'https://cdn.vubon.com.bd',
  'https://*.cloudinary.com',
  'https://*.cloudfront.net',
];

// Payment gateway domains (Bangladesh specific)
const PAYMENT_DOMAINS = [
  'https://secure.sslcommerz.com',
  'https://sandbox.sslcommerz.com',
  'https://*.bkash.com',
  'https://*.nagad.com.bd',
  'https://*.rocket.com.bd',
];

// Analytics domains
const ANALYTICS_DOMAINS = [
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com',
  'https://analytics.vubon.com.bd',
];

// Is production environment
const IS_PRODUCTION = env.NODE_ENV === 'production';

// ==================== CSP (Content Security Policy) ====================

export const cspConfig = {
  directives: {
    // Default policy
    defaultSrc: ["'self'", ...PRODUCTION_DOMAINS],
    
    // Script sources
    scriptSrc: [
      "'self'",
      // Only allow unsafe-inline/unsafe-eval in development
      ...(IS_PRODUCTION ? [] : ["'unsafe-inline'", "'unsafe-eval'"]),
      ...ANALYTICS_DOMAINS,
      ...PRODUCTION_DOMAINS,
      "'wasm-unsafe-eval'",
    ],
    
    // Style sources
    styleSrc: [
      "'self'",
      ...(IS_PRODUCTION ? [] : ["'unsafe-inline'"]),
      'https://fonts.googleapis.com',
      ...PRODUCTION_DOMAINS,
    ],
    
    // Image sources
    imgSrc: [
      "'self'",
      'data:',
      'https:',
      'blob:',
      ...CDN_DOMAINS,
      ...PRODUCTION_DOMAINS,
      'https://*.googleapis.com',
      'https://*.gstatic.com',
    ],
    
    // Font sources
    fontSrc: [
      "'self'",
      'https://fonts.gstatic.com',
      'data:',
      ...CDN_DOMAINS,
    ],
    
    // Connect sources (WebSocket, API, etc.)
    connectSrc: [
      "'self'",
      'https://api.vubon.com.bd',
      'wss://ws.vubon.com.bd',
      'https://vubon.com.bd',
      ...PAYMENT_DOMAINS,
      ...ANALYTICS_DOMAINS,
    ],
    
    // Frame sources (for iframes)
    frameSrc: [
      "'none'",
      ...PAYMENT_DOMAINS,
    ],
    
    // Object sources (plugins, etc.)
    objectSrc: ["'none'"],
    
    // Media sources
    mediaSrc: [
      "'self'",
      'https:',
      ...CDN_DOMAINS,
    ],
    
    // Child sources (deprecated but kept for compatibility)
    childSrc: ["'self'"],
    
    // Form action URLs
    formAction: [
      "'self'",
      ...PAYMENT_DOMAINS,
    ],
    
    // Frame ancestors (clickjacking protection)
    frameAncestors: ["'none'"],
    
    // Base URI restriction
    baseUri: ["'self'"],
    
    // Upgrade insecure requests to HTTPS
    upgradeInsecureRequests: IS_PRODUCTION ? [] : undefined,
    
    // Block mixed content (HTTP on HTTPS pages)
    blockAllMixedContent: IS_PRODUCTION ? [] : undefined,
  },
  reportOnly: !IS_PRODUCTION,
  reportUri: '/api/csp-report',
} as const;

// ==================== Security Headers Configuration ====================

export const securityHeadersConfig = {
  // Strict Transport Security (HSTS)
  hsts: {
    enabled: IS_PRODUCTION,
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  
  // X-Frame-Options (clickjacking protection)
  xFrameOptions: {
    enabled: true,
    value: 'DENY' as const,
  },
  
  // X-Content-Type-Options (MIME type sniffing protection)
  xContentTypeOptions: {
    enabled: true,
    value: 'nosniff' as const,
  },
  
  // X-XSS-Protection (legacy XSS filter)
  xXssProtection: {
    enabled: true,
    value: '1; mode=block' as const,
  },
  
  // Referrer Policy
  referrerPolicy: {
    enabled: true,
    value: 'strict-origin-when-cross-origin' as const,
  },
  
  // Permissions Policy (formerly Feature Policy)
  permissionsPolicy: {
    enabled: true,
    directives: {
      geolocation: ["'self'"],
      microphone: ["'none'"],
      camera: ["'none'"],
      payment: ["'self'", ...PAYMENT_DOMAINS],
      usb: ["'none'"],
      magnetometer: ["'none'"],
      accelerometer: ["'none'"],
      gyroscope: ["'none'"],
      clipboard: ["'self'"],
      notifications: ["'self'"],
    },
  },
  
  // Cross-Origin-Embedder-Policy (COEP)
  crossOriginEmbedderPolicy: {
    enabled: false,
    value: 'require-corp' as const,
  },
  
  // Cross-Origin-Opener-Policy (COOP)
  crossOriginOpenerPolicy: {
    enabled: true,
    value: 'same-origin' as const,
  },
  
  // Cross-Origin-Resource-Policy (CORP)
  crossOriginResourcePolicy: {
    enabled: true,
    value: 'same-origin' as const,
  },
  
  // Expect-CT (Certificate Transparency)
  expectCt: {
    enabled: IS_PRODUCTION,
    maxAge: 86400, // 24 hours
    enforce: true,
  },
  
  // Origin-Agent-Cluster (isolate origin for better performance)
  originAgentCluster: {
    enabled: true,
  },
} as const;

// ==================== Trusted Types (for XSS prevention) ====================

export const trustedTypesConfig = {
  enabled: IS_PRODUCTION,
  policies: ['default', 'dompurify', 'vubon-policy'],
  policyName: 'vubon-policy',
  htmlSanitizer: 'dompurify',
  scriptURL: 'vubon-policy',
} as const;

// ==================== Environment-specific overrides ====================

export const helmetConfigByEnv = {
  development: {
    csp: {
      ...cspConfig,
      reportOnly: true,
      directives: {
        ...cspConfig.directives,
        scriptSrc: ["'unsafe-eval'", "'unsafe-inline'", "'self'", ...ANALYTICS_DOMAINS],
      },
    },
    hsts: {
      ...securityHeadersConfig.hsts,
      enabled: false,
    },
    permissionsPolicy: {
      ...securityHeadersConfig.permissionsPolicy,
      enabled: false,
    },
    expectCt: {
      ...securityHeadersConfig.expectCt,
      enabled: false,
    },
  },
  production: {
    csp: cspConfig,
    hsts: securityHeadersConfig.hsts,
    permissionsPolicy: securityHeadersConfig.permissionsPolicy,
    expectCt: securityHeadersConfig.expectCt,
  },
  test: {
    csp: {
      ...cspConfig,
      reportOnly: true,
      directives: {
        ...cspConfig.directives,
        scriptSrc: ["'unsafe-eval'", "'unsafe-inline'", "'self'"],
      },
    },
    hsts: {
      ...securityHeadersConfig.hsts,
      enabled: false,
    },
    permissionsPolicy: {
      ...securityHeadersConfig.permissionsPolicy,
      enabled: false,
    },
    expectCt: {
      ...securityHeadersConfig.expectCt,
      enabled: false,
    },
  },
} as const;

// ==================== Helper Functions ====================

/**
 * Get helmet configuration for specific environment
 */
export const getHelmetConfig = (environment: 'development' | 'production' | 'test' = env.NODE_ENV) => {
  const config = helmetConfigByEnv[environment];
  if (!config) {
    return helmetConfigByEnv.production;
  }
  return config;
};

/**
 * Check if CSP is in report-only mode
 */
export const isCspReportOnly = (): boolean => {
  return cspConfig.reportOnly || !IS_PRODUCTION;
};

/**
 * Get CSP report URI
 */
export const getCspReportUri = (): string => {
  return cspConfig.reportUri;
};

/**
 * Get nonce for CSP (for inline scripts)
 * This generates a nonce placeholder - actual nonce should be generated per request
 */
export const getCspNonce = (): string => {
  return '{{nonce}}';
};

/**
 * Check if CSP directive allows unsafe-inline
 */
export const isCspUnsafeInlineAllowed = (): boolean => {
  const scriptSrc = cspConfig.directives.scriptSrc;
  if (!IS_PRODUCTION && scriptSrc) {
    return scriptSrc.includes("'unsafe-inline'");
  }
  return false;
};

/**
 * Get all allowed domains for a specific directive
 */
export const getAllowedDomains = (directive: keyof typeof cspConfig.directives): readonly string[] => {
  const domains = cspConfig.directives[directive];
  if (Array.isArray(domains)) {
    // ✅ FIXED: Filter domains, handle potentially undefined values
    return domains.filter((d): d is string => typeof d === 'string' && !d.startsWith("'"));
  }
  return [];
};

// ==================== Type Exports ====================

export type CSPConfig = typeof cspConfig;
export type SecurityHeadersConfig = typeof securityHeadersConfig;
export type TrustedTypesConfig = typeof trustedTypesConfig;
export type HelmetConfigByEnv = typeof helmetConfigByEnv;

export interface HelmetConfig {
  contentSecurityPolicy: typeof cspConfig;
  hsts: typeof securityHeadersConfig.hsts;
  xFrameOptions: typeof securityHeadersConfig.xFrameOptions;
  xContentTypeOptions: typeof securityHeadersConfig.xContentTypeOptions;
  xXssProtection: typeof securityHeadersConfig.xXssProtection;
  referrerPolicy: typeof securityHeadersConfig.referrerPolicy;
  permissionsPolicy: typeof securityHeadersConfig.permissionsPolicy;
  crossOriginEmbedderPolicy: typeof securityHeadersConfig.crossOriginEmbedderPolicy;
  crossOriginOpenerPolicy: typeof securityHeadersConfig.crossOriginOpenerPolicy;
  crossOriginResourcePolicy: typeof securityHeadersConfig.crossOriginResourcePolicy;
  expectCt: typeof securityHeadersConfig.expectCt;
  originAgentCluster: typeof securityHeadersConfig.originAgentCluster;
}
