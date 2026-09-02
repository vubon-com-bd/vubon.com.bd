/**
 * Email Template Configuration
 * ইমেইল টেমপ্লেট কনফিগারেশন
 */
export interface EmailTemplateConfig {
  enabled: boolean;
  engine: 'handlebars' | 'mustache' | 'ejs' | 'react';
  layouts: {
    enabled: boolean;
    default: string;
  };
  partials: {
    enabled: boolean;
    path: string;
  };
  helpers: {
    enabled: boolean;
    custom: Record<string, unknown>;
  };
  cache: {
    enabled: boolean;
    ttl: number;
  };
  precompiled: {
    enabled: boolean;
    path: string;
  };
}

export const createEmailTemplateConfig = (): EmailTemplateConfig => ({
  enabled: true,
  engine: 'handlebars',
  layouts: {
    enabled: true,
    default: 'default',
  },
  partials: {
    enabled: true,
    path: 'templates/partials',
  },
  helpers: {
    enabled: true,
    custom: {},
  },
  cache: {
    enabled: true,
    ttl: 3600 * 1000, // 1 hour
  },
  precompiled: {
    enabled: false,
    path: 'templates/precompiled',
  },
});
