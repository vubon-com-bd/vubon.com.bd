/**
 * Filter DTO
 * @module shared-kernel/application/dtos
 *
 * Values আসে shared-constants/common/filter.constants থেকে।
 */
import { FILTER_OPERATOR } from '@vubon/shared-constants/common';

export type FilterOperatorValue = (typeof FILTER_OPERATOR)[keyof typeof FILTER_OPERATOR];

export class FilterDTO {
  field!: string;
  operator: FilterOperatorValue = FILTER_OPERATOR.EQ;
  value!: unknown;

  static create(input: Partial<FilterDTO>): FilterDTO {
    if (!input.field) {
      throw new Error('Filter field is required');
    }
    const dto = new FilterDTO();
    dto.field = input.field;
    dto.operator = input.operator ?? FILTER_OPERATOR.EQ;
    dto.value = input.value;
    return dto;
  }

  static list(input?: readonly Partial<FilterDTO>[]): readonly FilterDTO[] {
    if (!input || input.length === 0) return [];
    return input.map((f) => FilterDTO.create(f));
  }
}
