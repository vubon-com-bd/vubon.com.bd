import { BaseEntity } from '../../common/base.types';
import { FACET } from '@vubon/shared-constants/src/platform/search/facet.constants';

export interface FacetValue {
  value: string;
  count: number;
  isSelected: boolean;
}

export interface Facet extends BaseEntity {
  facetId: string;
  type: keyof typeof FACET.TYPES | string;
  name: string;
  field: string;
  facetType: keyof typeof FACET.FACET_TYPES | string;
  sort: keyof typeof FACET.FACET_SORT | string;
  values: FacetValue[];
  isActive: boolean;
  metadata: Record<string, unknown>;
}
