import { TypeObject } from '../../common/types.types';
import { SEARCH_MATCH } from '@vubon/shared-constants/src/platform/search/search-match.constants';

export interface SearchMatch extends TypeObject {
  type: keyof typeof SEARCH_MATCH.TYPES | string;
  category: 'search_match';
  priority: keyof typeof SEARCH_MATCH.MATCH_PRIORITIES | string;
  isExact: boolean;
  isPrefix: boolean;
  isSuffix: boolean;
  isContains: boolean;
  isFuzzy: boolean;
  isWildcard: boolean;
  isRegex: boolean;
  isSynonym: boolean;
  isStemmed: boolean;
}

export type SearchMatchKey = keyof typeof SEARCH_MATCH.TYPES;
