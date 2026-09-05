/**
 * Suspension Config
 * স্থগিত কনফিগারেশন
 */

export interface SuspensionConfig {
  enabled: boolean;
  status: {
    active: string;
    suspended: string;
    permanent: string;
    pending: string;
    appealed: string;
  };
  maxWarnings: number;
  suspensionDuration: number;
  appealEnabled: boolean;
  appealTimeout: number;
  defaults: {
    maxWarnings: number;
    suspensionDuration: number;
    appealTimeout: number;
  };
}

export const suspensionConfig: SuspensionConfig = {
  enabled: true,
  status: {
    active: 'active',
    suspended: 'suspended',
    permanent: 'permanent',
    pending: 'pending',
    appealed: 'appealed',
  },
  maxWarnings: 3,
  suspensionDuration: 7,
  appealEnabled: true,
  appealTimeout: 3,
  defaults: {
    maxWarnings: 3,
    suspensionDuration: 7,
    appealTimeout: 3,
  },
} as const;

export type SuspensionConfigType = typeof suspensionConfig;
