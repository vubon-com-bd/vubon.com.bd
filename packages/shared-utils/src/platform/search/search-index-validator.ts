import { SEARCH_INDEX } from '@vubon/shared-constants/src/platform/search/search-index.constants';

export interface SearchIndexInput {
  name: string;
  type: string;
  status: string;
  documentCount: number;
}

export const validateSearchIndex = (
  index: Partial<SearchIndexInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!index.name) errors.push('Index name is required');
  if (index.type && !Object.keys(SEARCH_INDEX.TYPES).includes(index.type)) {
    errors.push('Invalid index type');
  }
  if (index.status && !Object.keys(SEARCH_INDEX.STATUS).includes(index.status)) {
    errors.push('Invalid index status');
  }
  if (index.documentCount !== undefined && index.documentCount < 0) {
    errors.push('Document count cannot be negative');
  }
  return { isValid: errors.length === 0, errors };
};
