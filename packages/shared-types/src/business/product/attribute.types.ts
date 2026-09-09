import { BaseEntity } from '../../common/base.types';
import { ATTRIBUTE } from '@vubon/shared-constants/src/business/product/attribute.constants';

export interface AttributeValue {
  id: string;
  value: string;
  label: string;
  order: number;
}

export interface Attribute extends BaseEntity {
  attributeId: string;
  name: string;
  slug: string;
  type: keyof typeof ATTRIBUTE.TYPES | string;
  values: AttributeValue[];
  isRequired: boolean;
  isFilterable: boolean;
  isSearchable: boolean;
  order: number;
  metadata: Record<string, unknown>;
}
