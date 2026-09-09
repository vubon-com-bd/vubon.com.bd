import { BaseEntity } from '../../common/base.types';
import { SEARCH_SUGGESTION } from '@vubon/shared-constants/src/platform/search/search-suggestion.constants';

export interface SearchSuggestion extends BaseEntity {
  suggestionId: string;
  type: keyof typeof SEARCH_SUGGESTION.TYPES | string;
  text: string;
  weight: number;
  count: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
