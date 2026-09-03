/**
 * KYC Configuration
 * ইউজার KYC কনফিগারেশন
 */

import { USER_KYC } from '@vubon/shared-constants';

export interface KYCConfig {
  enabled: boolean;
  types: string[];
  documentTypes: string[];
  riskLevels: string[];
  defaults: {
    maxFileSize: number;
    allowedExtensions: string[];
    expiryDays: number;
    reviewDays: number;
  };
  verification: {
    required: boolean;
    levels: {
      basic: string[];
      standard: string[];
      premium: string[];
      enterprise: string[];
    };
  };
}

export const createKYCConfig = (): KYCConfig => ({
  enabled: true,
  types: Object.values(USER_KYC.TYPES),
  documentTypes: Object.values(USER_KYC.DOCUMENT_TYPES),
  riskLevels: Object.values(USER_KYC.RISK_LEVELS),
  defaults: {
    maxFileSize: USER_KYC.DEFAULTS.MAX_FILE_SIZE,
    allowedExtensions: [...USER_KYC.DEFAULTS.ALLOWED_EXTENSIONS], // readonly থেকে mutable এ কনভার্ট
    expiryDays: USER_KYC.DEFAULTS.EXPIRY_DAYS,
    reviewDays: USER_KYC.DEFAULTS.REVIEW_DAYS,
  },
  verification: {
    required: true,
    levels: {
      basic: ['nid', 'birth_registration'],
      standard: ['nid', 'passport', 'driving_license'],
      premium: ['nid', 'passport', 'driving_license', 'bank_statement'],
      enterprise: ['nid', 'passport', 'business_license', 'trade_license'],
    },
  },
});
