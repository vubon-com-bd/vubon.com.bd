/**
 * Saved Item Status Value Types
 * @module shared-types/business/cart
 */
import type { SAVED_ITEM_STATUS } from '@vubon/shared-constants/business/cart';

export type SavedItemStatusValue = (typeof SAVED_ITEM_STATUS)[keyof typeof SAVED_ITEM_STATUS];

export interface SavedItemStatusMetadata {
  readonly value: SavedItemStatusValue;
  readonly label: string;
  readonly isFinal: boolean;
}
