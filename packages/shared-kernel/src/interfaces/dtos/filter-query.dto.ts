/**
 * Filter Query DTO
 * @module shared-kernel/interfaces/dtos
 */
import { FILTER_OPERATOR } from '@vubon/shared-constants/common';

export type FilterOperatorType = (typeof FILTER_OPERATOR)[keyof typeof FILTER_OPERATOR];

export interface FilterQueryDTO {
  readonly field: string;
  readonly operator?: FilterOperatorType;
  readonly value: unknown;
}
