/**
 * Helmet Configuration
 * হেলমেট কনফিগারেশন
 */
export interface HelmetConfig {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: string[];
      scriptSrc: string[];
      styleSrc: string[];
      imgSrc: string[];
      connectSrc: string[];
      fontSrc: string[];
      objectSrc: string[];
      mediaSrc: string[];
      frameSrc: string[];
    };
  };
  xssFilter: boolean;
  noSniff: boolean;
  hidePoweredBy: boolean;
  frameguard: {
    action: 'deny' | 'sameorigin' | 'allow-from';
  };
  hsts: {
    maxAge: number;
    includeSubDomains: boolean;
    preload: boolean;
  };
  ieNoOpen: boolean;
  referrerPolicy: {
    policy:
      | 'no-referrer'
      | 'no-referrer-when-downgrade'
      | 'origin'
      | 'origin-when-cross-origin'
      | 'same-origin'
      | 'strict-origin'
      | 'strict-origin-when-cross-origin'
      | 'unsafe-url';
  };
  xPermittedCrossDomainPolicies: {
    permittedPolicies: 'none' | 'master-only' | 'by-content-type' | 'all';
  };
}

export const createHelmetConfig = (isProduction: boolean = false): HelmetConfig => ({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https:'],
      fontSrc: ["'self'", 'https:', 'data:'],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'self'"],
    },
  },
  xssFilter: true,
  noSniff: true,
  hidePoweredBy: true,
  frameguard: {
    action: isProduction ? 'deny' : 'sameorigin',
  },
  hsts: {
    maxAge: isProduction ? 31536000 : 0,
    includeSubDomains: isProduction,
    preload: isProduction,
  },
  ieNoOpen: true,
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin',
  },
  xPermittedCrossDomainPolicies: {
    permittedPolicies: 'none',
  },
});
