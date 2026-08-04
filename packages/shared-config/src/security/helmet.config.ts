// packages/shared-config/src/security/helmet.config.ts
import type { EnvConfig } from '../env/env.schema';
import { env } from '../env/env.validation';

// ============================================================================
// Helmet Configuration Interfaces
// ============================================================================

/**
 * Helmet configuration interface
 */
export interface HelmetConfig {
  /** Content Security Policy configuration */
  csp: CSPConfig;
  /** HSTS configuration */
  hsts: HSTSConfig;
  /** X-Frame-Options configuration */
  xFrameOptions: XFrameOptionsConfig;
  /** Referrer-Policy configuration */
  referrerPolicy: ReferrerPolicyConfig;
  /** Permissions-Policy configuration */
  permissionsPolicy: PermissionsPolicyConfig;
  /** Other security headers */
  otherHeaders: OtherHeadersConfig;
}

/**
 * Content Security Policy configuration
 */
export interface CSPConfig {
  /** Whether CSP is enabled */
  enabled: boolean;
  /** Whether to use report-only mode */
  reportOnly: boolean;
  /** CSP directives */
  directives: CSPDirectives;
  /** Report URI for CSP violations */
  reportUri?: string;
}

/**
 * CSP Directives
 */
export interface CSPDirectives {
  /** Default sources */
  defaultSrc: string[];
  /** Script sources */
  scriptSrc: string[];
  /** Style sources */
  styleSrc: string[];
  /** Image sources */
  imgSrc: string[];
  /** Font sources */
  fontSrc: string[];
  /** Connect sources (for AJAX, WebSocket, etc.) */
  connectSrc: string[];
  /** Frame sources */
  frameSrc: string[];
  /** Object sources */
  objectSrc: string[];
  /** Media sources (audio, video) */
  mediaSrc: string[];
  /** Worker sources */
  workerSrc: string[];
  /** Manifest sources */
  manifestSrc: string[];
  /** Form action sources */
  formAction: string[];
  /** Base URI sources */
  baseUri: string[];
  /** Frame ancestors */
  frameAncestors: string[];
  /** Additional custom directives */
  custom?: Record<string, string[]>;
}

/**
 * HSTS configuration
 */
export interface HSTSConfig {
  /** Whether HSTS is enabled */
  enabled: boolean;
  /** Max age in seconds */
  maxAge: number;
  /** Whether to include subdomains */
  includeSubDomains: boolean;
  /** Whether to preload */
  preload: boolean;
}

/**
 * X-Frame-Options configuration
 */
export interface XFrameOptionsConfig {
  /** Whether X-Frame-Options is enabled */
  enabled: boolean;
  /** Value: DENY, SAMEORIGIN, or ALLOW-FROM uri */
  value: 'DENY' | 'SAMEORIGIN' | string;
}

/**
 * Referrer-Policy configuration
 */
export interface ReferrerPolicyConfig {
  /** Whether Referrer-Policy is enabled */
  enabled: boolean;
  /** Value: no-referrer, no-referrer-when-downgrade, origin, etc. */
  value: string;
}

/**
 * Permissions-Policy configuration
 */
export interface PermissionsPolicyConfig {
  /** Whether Permissions-Policy is enabled */
  enabled: boolean;
  /** Permission directives */
  directives: Record<string, string[]>;
}

/**
 * Other security headers
 */
export interface OtherHeadersConfig {
  /** X-Content-Type-Options */
  xContentTypeOptions: boolean;
  /** X-DNS-Prefetch-Control */
  xDNSPrefetchControl: boolean;
  /** X-Download-Options */
  xDownloadOptions: boolean;
  /** X-Permitted-Cross-Domain-Policies */
  xPermittedCrossDomainPolicies: 'none' | 'master-only' | 'by-content-type' | 'by-ftp-filename';
  /** X-XSS-Protection */
  xXSSProtection: boolean | string;
}

// ============================================================================
// Helmet Constants
// ============================================================================

/**
 * Default allowed domains for CSP
 */
export const DEFAULT_ALLOWED_DOMAINS = {
  // Self domains
  SELF: "'self'",
  // Script sources
  SCRIPT_SOURCES: [
    "'self'",
    'https://cdn.jsdelivr.net',
    'https://unpkg.com',
    'https://cdnjs.cloudflare.com',
  ],
  // Style sources
  STYLE_SOURCES: [
    "'self'",
    "'unsafe-inline'",
    'https://fonts.googleapis.com',
    'https://cdn.jsdelivr.net',
  ],
  // Image sources
  IMAGE_SOURCES: [
    "'self'",
    'data:',
    'https://*.vubon.com',
    'https://*.googleapis.com',
    'https://*.gstatic.com',
    'https://*.cloudinary.com',
  ],
  // Font sources
  FONT_SOURCES: ["'self'", 'https://fonts.gstatic.com', 'https://cdn.jsdelivr.net'],
  // Connect sources
  CONNECT_SOURCES: [
    "'self'",
    'https://*.vubon.com',
    'https://api.vubon.com',
    'https://*.bka.sh',
    'https://*.nagad.com',
  ],
  // Frame sources
  FRAME_SOURCES: ["'self'", 'https://*.bka.sh', 'https://*.nagad.com', 'https://*.sslcommerz.com'],
  // Payment gateway domains
  PAYMENT_DOMAINS: [
    'https://*.bka.sh',
    'https://*.nagad.com',
    'https://*.sslcommerz.com',
    'https://*.paypal.com',
    'https://*.stripe.com',
  ],
};

/**
 * Default HSTS max age (1 year)
 */
export const DEFAULT_HSTS_MAX_AGE = 31536000;

/**
 * Default referrer policy
 */
export const DEFAULT_REFERRER_POLICY = 'strict-origin-when-cross-origin';

/**
 * Default permissions policy directives
 */
export const DEFAULT_PERMISSIONS_POLICY: Record<string, string[]> = {
  geolocation: ['()'],
  microphone: ['()'],
  camera: ['()'],
  payment: ['()'],
  usb: ['()'],
  battery: ['()'],
  autoplay: ['()'],
  encryptedMedia: ['()'],
  pictureInPicture: ['()'],
  fullscreen: ['()'],
};

// ============================================================================
// Helmet Configuration Factory
// ============================================================================

/**
 * Creates Helmet configuration from environment
 * @param envConfig - The environment configuration
 * @param customDomains - Additional custom domains to allow
 * @returns Helmet configuration
 */
export function createHelmetConfig(
  envConfig: EnvConfig = env,
  customDomains: string[] = []
): HelmetConfig {
  const { server } = envConfig;
  const isProduction = server.NODE_ENV === 'production';

  // Get all allowed domains
  const allowedDomains = getAllowedDomains(customDomains);

  // CSP configuration - strict in production, relaxed in development
  const cspConfig: CSPConfig = {
    enabled: true,
    reportOnly: !isProduction, // Report only in development
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: isProduction
        ? ["'self'", ...allowedDomains.scriptSources]
        : ["'self'", "'unsafe-inline'", "'unsafe-eval'", ...allowedDomains.scriptSources],
      styleSrc: isProduction
        ? ["'self'", ...allowedDomains.styleSources]
        : ["'self'", "'unsafe-inline'", ...allowedDomains.styleSources],
      imgSrc: ["'self'", 'data:', ...allowedDomains.imageSources],
      fontSrc: ["'self'", ...allowedDomains.fontSources],
      connectSrc: ["'self'", ...allowedDomains.connectSources],
      frameSrc: ["'self'", ...allowedDomains.frameSources],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      workerSrc: ["'self'"],
      manifestSrc: ["'self'"],
      formAction: ["'self'"],
      baseUri: ["'self'"],
      frameAncestors: ["'self'"],
    },
    reportUri: isProduction ? '/api/csp-report' : undefined,
  };

  // HSTS configuration - only in production
  const hstsConfig: HSTSConfig = {
    enabled: isProduction,
    maxAge: DEFAULT_HSTS_MAX_AGE,
    includeSubDomains: true,
    preload: isProduction,
  };

  return {
    csp: cspConfig,
    hsts: hstsConfig,
    xFrameOptions: {
      enabled: true,
      value: 'DENY',
    },
    referrerPolicy: {
      enabled: true,
      value: DEFAULT_REFERRER_POLICY,
    },
    permissionsPolicy: {
      enabled: true,
      directives: {
        ...DEFAULT_PERMISSIONS_POLICY,
      },
    },
    otherHeaders: {
      xContentTypeOptions: true,
      xDNSPrefetchControl: true,
      xDownloadOptions: true,
      xPermittedCrossDomainPolicies: 'none',
      xXSSProtection: '0', // Modern browsers use CSP instead
    },
  };
}

// ============================================================================
// Helmet Configuration Instance
// ============================================================================

/**
 * Helmet configuration instance
 */
export const helmetConfig: HelmetConfig = createHelmetConfig();

// ============================================================================
// Helmet Helper Functions
// ============================================================================

/**
 * Gets all allowed domains for CSP
 * @param customDomains - Additional custom domains to allow
 * @returns Object with categorized allowed domains
 *
 * @example
 * const domains = getAllowedDomains(['https://custom.com']);
 */
export function getAllowedDomains(customDomains: string[] = []): {
  scriptSources: string[];
  styleSources: string[];
  imageSources: string[];
  fontSources: string[];
  connectSources: string[];
  frameSources: string[];
} {
  return {
    scriptSources: [...DEFAULT_ALLOWED_DOMAINS.SCRIPT_SOURCES, ...customDomains],
    styleSources: [...DEFAULT_ALLOWED_DOMAINS.STYLE_SOURCES, ...customDomains],
    imageSources: [...DEFAULT_ALLOWED_DOMAINS.IMAGE_SOURCES, ...customDomains],
    fontSources: [...DEFAULT_ALLOWED_DOMAINS.FONT_SOURCES, ...customDomains],
    connectSources: [
      ...DEFAULT_ALLOWED_DOMAINS.CONNECT_SOURCES,
      ...DEFAULT_ALLOWED_DOMAINS.PAYMENT_DOMAINS,
      ...customDomains,
    ],
    frameSources: [
      ...DEFAULT_ALLOWED_DOMAINS.FRAME_SOURCES,
      ...DEFAULT_ALLOWED_DOMAINS.PAYMENT_DOMAINS,
      ...customDomains,
    ],
  };
}

/**
 * Checks if CSP is in report-only mode
 * @param config - The Helmet configuration (optional)
 * @returns True if CSP is in report-only mode
 *
 * @example
 * const isReportOnly = isCspReportOnly();
 */
export function isCspReportOnly(config: HelmetConfig = helmetConfig): boolean {
  return config.csp.reportOnly;
}

/**
 * Gets CSP configuration
 * @param config - The Helmet configuration (optional)
 * @returns CSP configuration
 *
 * @example
 * const csp = getCspConfig();
 */
export function getCspConfig(config: HelmetConfig = helmetConfig): CSPConfig {
  return config.csp;
}

/**
 * Gets security headers configuration
 * @param config - The Helmet configuration (optional)
 * @returns Security headers configuration
 *
 * @example
 * const headers = getSecurityHeadersConfig();
 */
export function getSecurityHeadersConfig(config: HelmetConfig = helmetConfig): HelmetConfig {
  return config;
}

/**
 * Gets Helmet middleware options
 * @param config - The Helmet configuration (optional)
 * @returns Helmet middleware options
 *
 * @example
 * const options = getHelmetConfig();
 */
export function getHelmetConfig(config: HelmetConfig = helmetConfig): Record<string, unknown> {
  const options: Record<string, unknown> = {};

  // CSP
  if (config.csp.enabled) {
    const directives: Record<string, string[]> = {
      'default-src': config.csp.directives.defaultSrc,
      'script-src': config.csp.directives.scriptSrc,
      'style-src': config.csp.directives.styleSrc,
      'img-src': config.csp.directives.imgSrc,
      'font-src': config.csp.directives.fontSrc,
      'connect-src': config.csp.directives.connectSrc,
      'frame-src': config.csp.directives.frameSrc,
      'object-src': config.csp.directives.objectSrc,
      'media-src': config.csp.directives.mediaSrc,
      'worker-src': config.csp.directives.workerSrc,
      'manifest-src': config.csp.directives.manifestSrc,
      'form-action': config.csp.directives.formAction,
      'base-uri': config.csp.directives.baseUri,
      'frame-ancestors': config.csp.directives.frameAncestors,
    };

    if (config.csp.reportUri) {
      directives['report-uri'] = [config.csp.reportUri];
    }

    options.contentSecurityPolicy = {
      directives,
      reportOnly: config.csp.reportOnly,
    };
  }

  // HSTS
  if (config.hsts.enabled) {
    options.hsts = {
      maxAge: config.hsts.maxAge,
      includeSubDomains: config.hsts.includeSubDomains,
      preload: config.hsts.preload,
    };
  }

  // X-Frame-Options
  if (config.xFrameOptions.enabled) {
    options.frameguard = {
      action: config.xFrameOptions.value,
    };
  }

  // Referrer-Policy
  if (config.referrerPolicy.enabled) {
    options.referrerPolicy = {
      policy: config.referrerPolicy.value,
    };
  }

  // Permissions-Policy
  if (config.permissionsPolicy.enabled) {
    options.permissionsPolicy = {
      features: config.permissionsPolicy.directives,
    };
  }

  // Other headers
  if (config.otherHeaders.xContentTypeOptions) {
    options.noSniff = true;
  }

  if (config.otherHeaders.xDNSPrefetchControl) {
    options.dnsPrefetchControl = {
      allow: false,
    };
  }

  if (config.otherHeaders.xDownloadOptions) {
    options.ieNoOpen = true;
  }

  if (config.otherHeaders.xPermittedCrossDomainPolicies) {
    options.permittedCrossDomainPolicies = {
      permittedPolicies: config.otherHeaders.xPermittedCrossDomainPolicies,
    };
  }

  if (config.otherHeaders.xXSSProtection) {
    options.xssFilter = config.otherHeaders.xXSSProtection;
  }

  return options;
}

/**
 * Adds a custom domain to CSP
 * @param domain - The domain to add
 * @param category - The CSP category to add to
 * @param config - The Helmet configuration (optional)
 * @returns Updated Helmet configuration
 *
 * @example
 * const config = addCspDomain('https://custom.com', 'scriptSrc');
 */
export function addCspDomain(
  domain: string,
  category: keyof CSPDirectives,
  config: HelmetConfig = helmetConfig
): HelmetConfig {
  const newConfig = { ...config };
  const directives = newConfig.csp.directives;

  // Create a copy of the existing array or initialize if undefined
  const currentArray = (directives[category] as string[]) || [];
  if (!currentArray.includes(domain)) {
    (directives[category] as string[]) = [...currentArray, domain];
  }

  return newConfig;
}

/**
 * Removes a custom domain from CSP
 * @param domain - The domain to remove
 * @param category - The CSP category to remove from
 * @param config - The Helmet configuration (optional)
 * @returns Updated Helmet configuration
 *
 * @example
 * const config = removeCspDomain('https://custom.com', 'connectSrc');
 */
export function removeCspDomain(
  domain: string,
  category: keyof CSPDirectives,
  config: HelmetConfig = helmetConfig
): HelmetConfig {
  const newConfig = { ...config };
  const directives = newConfig.csp.directives;

  const currentArray = (directives[category] as string[]) || [];
  (directives[category] as string[]) = currentArray.filter((d: string) => d !== domain);

  return newConfig;
}

/**
 * Validates Helmet configuration
 * @param config - The Helmet configuration to validate
 * @returns True if the configuration is valid, false otherwise
 *
 * @example
 * const isValid = validateHelmetConfig(config);
 */
export function validateHelmetConfig(config: HelmetConfig): boolean {
  if (!config || typeof config !== 'object') {
    return false;
  }

  // Check CSP
  if (!config.csp || typeof config.csp !== 'object') {
    return false;
  }

  // Check HSTS
  if (!config.hsts || typeof config.hsts !== 'object') {
    return false;
  }

  // Check X-Frame-Options
  if (!config.xFrameOptions || typeof config.xFrameOptions !== 'object') {
    return false;
  }

  // Check Referrer-Policy
  if (!config.referrerPolicy || typeof config.referrerPolicy !== 'object') {
    return false;
  }

  // Check Permissions-Policy
  if (!config.permissionsPolicy || typeof config.permissionsPolicy !== 'object') {
    return false;
  }

  // Check Other Headers
  if (!config.otherHeaders || typeof config.otherHeaders !== 'object') {
    return false;
  }

  return true;
}
