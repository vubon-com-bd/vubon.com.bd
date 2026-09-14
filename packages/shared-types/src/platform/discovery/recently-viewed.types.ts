/**
 * Recently Viewed Types
 * @module shared-types/platform/discovery
 */

import type { RECENTLY_VIEWED_TYPE } from '@vubon/shared-constants/platform';
import type { UserId } from '../../common/primitives';

export type RecentlyViewedTypeValue =
  (typeof RECENTLY_VIEWED_TYPE)[keyof typeof RECENTLY_VIEWED_TYPE];

export interface RecentlyViewedItem {
  readonly id: string;
  readonly userId?: UserId;
  readonly sessionId?: string;
  readonly type: RecentlyViewedTypeValue;
  readonly referenceId: string;
  readonly viewedAt: string;
  readonly viewCount: number;
}

export interface RecentlyViewedList {
  readonly type: RecentlyViewedTypeValue;
  readonly items: readonly RecentlyViewedItem[];
  readonly total: number;
}
