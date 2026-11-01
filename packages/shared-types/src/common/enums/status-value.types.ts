/**
 * Status Value Types
 * @module shared-types/common/enums
 *
 * Values আসে shared-constants/common/status.constants থেকে।
 *
 * এই type-ই সব domain-এর status-এ use হবে —
 * কোনো hardcoded 'active' | 'inactive' লেখা যাবে না।
 */

import type { STATUS } from '@vubon/shared-constants/common';

export type StatusValue = (typeof STATUS)[keyof typeof STATUS];

export type ActiveStatusValue = typeof STATUS.ACTIVE;
export type InactiveStatusValue = typeof STATUS.INACTIVE;
export type PendingStatusValue = typeof STATUS.PENDING;
export type DeletedStatusValue = typeof STATUS.DELETED;

export interface StatusMetadata {
  readonly value: StatusValue;
  readonly label: string;
  readonly color: string;
  readonly isFinal: boolean;
}
