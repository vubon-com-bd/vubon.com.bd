import { BaseEntity } from '../../common/base.types';
import { AUTOCOMPLETE } from '@vubon/shared-constants/src/platform/search/autocomplete.constants';

export interface Autocomplete extends BaseEntity {
  autocompleteId: string;
  type: keyof typeof AUTOCOMPLETE.TYPES | string;
  text: string;
  weight: number;
  count: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
