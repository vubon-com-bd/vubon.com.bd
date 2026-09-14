/**
 * Lead Status Value Types
 * @module shared-types/marketing
 */

import type { LEAD_STATUS, LEAD_QUALITY } from '@vubon/shared-constants/marketing';

export type LeadStatusValue = (typeof LEAD_STATUS)[keyof typeof LEAD_STATUS];

export type LeadQualityValue = (typeof LEAD_QUALITY)[keyof typeof LEAD_QUALITY];

export interface LeadStatusMetadata {
  readonly value: LeadStatusValue;
  readonly label: string;
  readonly isFinal: boolean;
  readonly isConverted: boolean;
}
