import { PLATFORM_SEARCH } from '@vubon/shared-constants/src/platform/search/search.constants';

export interface SearchInput {
  query: string;
  type: string;
  status: string;
}

export const validateSearch = (
  search: Partial<SearchInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!search.query) errors.push('Search query is required');
  if (search.query && search.query.length < 2) {
    errors.push('Search query must be at least 2 characters');
  }
  if (search.query && search.query.length > 100) {
    errors.push('Search query must not exceed 100 characters');
  }
  if (search.type && !Object.keys(PLATFORM_SEARCH.SEARCH_TYPES).includes(search.type)) {
    errors.push('Invalid search type');
  }
  if (search.status && !Object.keys(PLATFORM_SEARCH.STATUS).includes(search.status)) {
    errors.push('Invalid search status');
  }
  return { isValid: errors.length === 0, errors };
};
