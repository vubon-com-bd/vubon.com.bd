/**
 * Attribute Types
 * @module shared-types/business/product
 *
 * Values আসে shared-constants/business/product/attribute.constants থেকে।
 */

import type { ATTRIBUTE_TYPE } from '@vubon/shared-constants/business';

export type AttributeTypeValue = (typeof ATTRIBUTE_TYPE)[keyof typeof ATTRIBUTE_TYPE];

export interface Attribute {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly type: AttributeTypeValue;
  readonly isRequired: boolean;
  readonly isSearchable: boolean;
  readonly isFilterable: boolean;
  readonly unit?: string;
  readonly options?: readonly AttributeOption[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface AttributeOption {
  readonly value: string;
  readonly label: string;
  readonly sortOrder: number;
}

export interface AttributeValue {
  readonly attributeId: string;
  readonly value: string | number | boolean | readonly string[];
}

export interface ProductAttribute {
  readonly attributeId: string;
  readonly name: string;
  readonly values: readonly AttributeValue[];
}
