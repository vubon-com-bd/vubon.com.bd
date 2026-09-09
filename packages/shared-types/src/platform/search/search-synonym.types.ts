import { BaseEntity } from '../../common/base.types';
import { SEARCH_SYNONYM } from '@vubon/shared-constants/src/platform/search/search-synonym.constants';

export interface SearchSynonym extends BaseEntity {
  synonymId: string;
  type: keyof typeof SEARCH_SYNONYM.TYPES | string;
  term: string;
  synonyms: string[];
  weight: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
