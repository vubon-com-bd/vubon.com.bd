/**
 * Lead Source Value Types
 * @module shared-types/marketing
 */

import type { LEAD_SOURCE } from '@vubon/shared-constants/marketing';

export type LeadSourceValue = (typeof LEAD_SOURCE)[keyof typeof LEAD_SOURCE];

export interface LeadSourceMetadata {
  readonly value: LeadSourceValue;
  readonly label: string;
  readonly isPaid: boolean;
  readonly isOrganic: boolean;
}
