import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { VENDOR_RETURN_POLICY } from './vendor-return-policy.constants';

export const VENDOR_WARRANTY = {
  TYPES: {
    ...COMMON_TYPES,
    STANDARD: 'standard',
    EXTENDED: 'extended',
    LIFETIME: 'lifetime',
    LIMITED: 'limited',
    REPLACEMENT: 'replacement',
  },
  VENDOR_RETURN_POLICY: { ...VENDOR_RETURN_POLICY },
  WARRANTY_PERIODS: {
    STANDARD: 365,
    EXTENDED: 730,
    LIFETIME: -1,
    LIMITED: 90,
  },
  WARRANTY_COVERAGE: [
    'manufacturing_defects',
    'hardware_failure',
    'software_issues',
    'damage_replacement',
  ],
  WARRANTY_EXCLUSIONS: [
    'accidental_damage',
    'water_damage',
    'unauthorized_repairs',
    'natural_disasters',
  ],
} as const;
