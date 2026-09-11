import { SEARCH_SYNONYM } from '@vubon/shared-constants/src/platform/search/search-synonym.constants';

export interface SearchSynonymInput {
  term: string;
  synonyms: string[];
  type: string;
}

export const validateSearchSynonym = (
  synonym: Partial<SearchSynonymInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!synonym.term) errors.push('Term is required');
  if (!synonym.synonyms || synonym.synonyms.length === 0) {
    errors.push('At least one synonym is required');
  }
  if (synonym.type && !Object.keys(SEARCH_SYNONYM.TYPES).includes(synonym.type)) {
    errors.push('Invalid synonym type');
  }
  return { isValid: errors.length === 0, errors };
};
