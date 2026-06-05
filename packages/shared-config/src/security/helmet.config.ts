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
    defaultSrc: ["'self'", ...PRODUCTION_DOMAINS],
    
    scriptSrc: [
      "'self'",
      ...(IS_PRODUCTION ? [] : ["'unsafe-inline'", "'unsafe-eval'"]),
      ...ANALYTICS_DOMAINS,
      ...PRODUCTION_DOMAINS,
      "'wasm-unsafe-eval'",
    ],
    
    styleSrc: [
      "'self'",
      ...(IS_PRODUCTION ? [] : ["'unsafe-inline'"]),
      'https://fonts.googleapis.com',
      ...PRODUCTION_DOMAINS,
    ],
    
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
    
    fontSrc: [
      "'self'",
      'https://fonts.gstatic.com',
      'data:',
      ...CDN_DOMAINS,
    ],
    
    connectSrc: [
      "'self'",
      'https://api.vubon.com.bd',
      'wss://ws.vubon.com.bd',
      'https://vubon.com.bd',
      ...PAYMENT_DOMAINS,
      ...ANALYTICS_DOMAINS,
    ],
    
    frameSrc: [
      "'none'",
      ...PAYMENT_DOMAINS,
    ],
    
    objectSrc: ["'none'"],
    
    mediaSrc: [
      "'self'",
      'https:',
      ...CDN_DOMAINS,
    ],
    
    childSrc: ["'self'"],
    
    formAction: [
      "'self'",
      ...PAYMENT_DOMAINS,
    ],
    
    frameAncestors: ["'none'"],
    
    baseUri: ["'self'"],
    
    upgradeInsecureRequests: IS_PRODUCTION ? [] : undefined,
    blockAllMixedContent: IS_PRODUCTION ? [] : undefined,
  },
  reportOnly: !IS_PRODUCTION,
  reportUri: '/api/csp-report',
} as const;

// ==================== Security Headers Configuration ====================

export const securityHeadersConfig = {
  hsts: {
    enabled: IS_PRODUCTION,
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  
  xFrameOptions: {
    enabled: true,
    value: 'DENY' as const,
  },
  
  xContentTypeOptions: {
    enabled: true,
    value: 'nosniff' as const,
  },
  
  xXssProtection: {
    enabled: true,
    value: '1; mode=block' as const,
  },
  
  referrerPolicy: {
    enabled: true,
    value: 'strict-origin-when-cross-origin' as const,
  },
  
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
  
  crossOriginEmbedderPolicy: {
    enabled: false,
    value: 'require-corp' as const,
  },
  
  crossOriginOpenerPolicy: {
    enabled: true,
    value: 'same-origin' as const,
  },
  
  crossOriginResourcePolicy: {
    enabled: true,
    value: 'same-origin' as const,
  },
  
  expectCt: {
    enabled: IS_PRODUCTION,
    maxAge: 86400,
    enforce: true,
  },
  
  originAgentCluster: {
    enabled: true,
  },
} as const;

// ==================== Trusted Types ====================

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

export const getHelmetConfig = (environment: 'development' | 'production' | 'test' = env.NODE_ENV) => {
  const config = helmetConfigByEnv[environment];
  if (!config) {
    return helmetConfigByEnv.production;
  }
  return config;
};

export const isCspReportOnly = (): boolean => {
  return cspConfig.reportOnly || !IS_PRODUCTION;
};

export const getCspReportUri = (): string => {
  return cspConfig.reportUri;
};

export const getCspNonce = (): string => {
  return '{{nonce}}';
};

export const isCspUnsafeInlineAllowed = (): boolean => {
  const scriptSrc = cspConfig.directives.scriptSrc;
  if (!IS_PRODUCTION && Array.isArray(scriptSrc)) {
    return scriptSrc.includes("'unsafe-inline'");
  }
  return false;
};

export const getAllowedDomains = (directive: keyof typeof cspConfig.directives): string[] => {
  const domains = cspConfig.directives[directive];
  const result: string[] = [];
  
  if (Array.isArray(domains)) {
    for (let i = 0; i < domains.length; i++) {
      const d = domains[i];
      if (typeof d === 'string' && d.charAt(0) !== "'") {
        result.push(d);
      }
    }
  }
  
  return result;
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
