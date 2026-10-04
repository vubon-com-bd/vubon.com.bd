/**
 * Search DTO
 * @module shared-kernel/application/dtos
 *
 * Values আসে shared-constants/common/search-params.constants থেকে।
 */
import { SEARCH_PARAMS } from '@vubon/shared-constants/common';

export class SearchDTO {
  query!: string;
  fields?: readonly string[];
  fuzzy?: boolean;
  highlight?: boolean;

  static create(input: Partial<SearchDTO>): SearchDTO {
    if (!input.query) {
      throw new Error('Search query is required');
    }
    const trimmed = input.query.trim();
    if (trimmed.length < SEARCH_PARAMS.DEFAULT_QUERY_MIN_LENGTH) {
      throw new Error(`Search query too short (min ${SEARCH_PARAMS.DEFAULT_QUERY_MIN_LENGTH})`);
    }
    if (trimmed.length > SEARCH_PARAMS.DEFAULT_QUERY_MAX_LENGTH) {
      throw new Error(`Search query too long (max ${SEARCH_PARAMS.DEFAULT_QUERY_MAX_LENGTH})`);
    }

    const dto = new SearchDTO();
    dto.query = trimmed;
    dto.fields = input.fields;
    dto.fuzzy = input.fuzzy ?? SEARCH_PARAMS.DEFAULT_FUZZY;
    dto.highlight = input.highlight ?? SEARCH_PARAMS.DEFAULT_HIGHLIGHT;
    return dto;
  }
}
