import { BaseEntity } from '../../common/base.types';
import { SEARCH_INDEX } from '@vubon/shared-constants/src/platform/search/search-index.constants';

export interface SearchIndex extends BaseEntity {
  indexId: string;
  name: string;
  type: keyof typeof SEARCH_INDEX.TYPES | string;
  status: keyof typeof SEARCH_INDEX.STATUS | string;
  fields: string[];
  documentCount: number;
  size: number;
  lastReindexAt?: Date;
  reindexSchedule: keyof typeof SEARCH_INDEX.REINDEX_SCHEDULE | string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
