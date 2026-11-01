/**
 * Complementary Types
 * @module shared-types/platform/discovery
 */

import type { COMPLEMENTARY_TYPE } from '@vubon/shared-constants/platform';

export type ComplementaryTypeValue = (typeof COMPLEMENTARY_TYPE)[keyof typeof COMPLEMENTARY_TYPE];

export interface ComplementaryItem {
  readonly productId: string;
  readonly type: ComplementaryTypeValue;
  readonly affinity: number;
  readonly reason?: string;
}

export interface ComplementaryResult {
  readonly sourceProductId: string;
  readonly items: readonly ComplementaryItem[];
  readonly generatedAt: string;
}
