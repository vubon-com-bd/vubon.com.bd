/**
 * Sort DTO
 * @module shared-kernel/application/dtos
 *
 * Values আসে shared-constants/common/sort.constants থেকে।
 */
import { SORT_ORDER } from '@vubon/shared-constants/common';

export type SortOrderValue = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];

export class SortDTO {
  field!: string;
  order: SortOrderValue = SORT_ORDER.ASC;

  static create(input: Partial<SortDTO>): SortDTO {
    if (!input.field) {
      throw new Error('Sort field is required');
    }
    const dto = new SortDTO();
    dto.field = input.field;
    dto.order = input.order ?? SORT_ORDER.ASC;
    return dto;
  }

  static list(input?: readonly Partial<SortDTO>[]): readonly SortDTO[] {
    if (!input || input.length === 0) return [];
    return input.map((s) => SortDTO.create(s));
  }
}
