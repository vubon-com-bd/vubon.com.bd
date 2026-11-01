/**
 * Sort Query DTO
 * @module shared-kernel/interfaces/dtos
 */
import { SORT_ORDER } from '@vubon/shared-constants/common';

export type SortOrderType = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];

export interface SortQueryDTO {
  readonly field: string;
  readonly order?: SortOrderType;
}
