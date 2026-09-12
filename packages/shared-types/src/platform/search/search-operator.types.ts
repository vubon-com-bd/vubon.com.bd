import { TypeObject } from '../../common/types.types';
import { SEARCH_OPERATOR } from '@vubon/shared-constants/src/platform/search/search-operator.constants';

export interface SearchOperator extends TypeObject {
  type: keyof typeof SEARCH_OPERATOR.TYPES | string;
  category: 'search_operator';
  symbol: keyof typeof SEARCH_OPERATOR.OPERATOR_SYMBOLS | string;
  isAnd: boolean;
  isOr: boolean;
  isNot: boolean;
  isNear: boolean;
  isPhrase: boolean;
  isWildcard: boolean;
  isRegex: boolean;
  isFuzzy: boolean;
}

export type SearchOperatorKey = keyof typeof SEARCH_OPERATOR.TYPES;
