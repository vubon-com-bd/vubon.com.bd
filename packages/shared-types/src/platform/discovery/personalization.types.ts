/**
 * Personalization Types
 * @module shared-types/platform/discovery
 */

import type {
  PERSONALIZATION_TYPE,
  PERSONALIZATION_STATUS,
} from '@vubon/shared-constants/platform';
import type { UserId } from '../../common/primitives';

export type PersonalizationTypeValue =
  (typeof PERSONALIZATION_TYPE)[keyof typeof PERSONALIZATION_TYPE];

export type PersonalizationStatusValue =
  (typeof PERSONALIZATION_STATUS)[keyof typeof PERSONALIZATION_STATUS];

export interface PersonalizationProfile {
  readonly userId: UserId;
  readonly type: PersonalizationTypeValue;
  readonly status: PersonalizationStatusValue;
  readonly interests: readonly string[];
  readonly categories: readonly string[];
  readonly brands: readonly string[];
  readonly priceRange?: { readonly min: number; readonly max: number };
  readonly interactionCount: number;
  readonly lastUpdatedAt: string;
  readonly confidenceScore: number;
}

export interface PersonalizationSignal {
  readonly userId: UserId;
  readonly type: string;
  readonly value: unknown;
  readonly weight: number;
  readonly occurredAt: string;
}

export interface PersonalizationUpdate {
  readonly userId: UserId;
  readonly interests?: readonly string[];
  readonly categories?: readonly string[];
  readonly brands?: readonly string[];
}
