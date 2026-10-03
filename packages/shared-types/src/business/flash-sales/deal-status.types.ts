/**
 * Deal Status Value Types
 * @module shared-types/business/flash-sales
 *
 * Values আসে shared-constants/business/flash-sales/deal-status.constants থেকে।
 */

import type { DEAL_STATUS } from '@vubon/shared-constants/business';

export type DealStatusValue = (typeof DEAL_STATUS)[keyof typeof DEAL_STATUS];

export interface DealStatusMetadata {
  readonly value: DealStatusValue;
  readonly label: string;
  readonly isActive: boolean;
  readonly isFinal: boolean;
}
