/**
 * Attribute Types
 * অ্যাট্রিবিউট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { ATTRIBUTE_TYPES } from '@vubon/shared-constants';

export interface AttributeOption {
  id: string;
  value: string;
  valueBangla?: string;
  sortOrder: number;
}

export interface Attribute extends BaseEntity {
  name: string;
  nameBangla?: string;
  slug: string;
  type: (typeof ATTRIBUTE_TYPES)[keyof typeof ATTRIBUTE_TYPES];
  options: AttributeOption[];
  isRequired: boolean;
  isFilterable: boolean;
  isSearchable: boolean;
  isVisible: boolean;
  sortOrder: number;
  group?: string;
  description?: string;
  validationRules?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    allowedValues?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface AttributeCreateInput {
  name: string;
  nameBangla?: string;
  type: (typeof ATTRIBUTE_TYPES)[keyof typeof ATTRIBUTE_TYPES];
  options?: AttributeOption[];
  isRequired?: boolean;
  isFilterable?: boolean;
  isSearchable?: boolean;
  isVisible?: boolean;
  sortOrder?: number;
  group?: string;
  description?: string;
  validationRules?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    allowedValues?: string[];
  };
}

export interface AttributeUpdateInput {
  name?: string;
  nameBangla?: string;
  type?: (typeof ATTRIBUTE_TYPES)[keyof typeof ATTRIBUTE_TYPES];
  options?: AttributeOption[];
  isRequired?: boolean;
  isFilterable?: boolean;
  isSearchable?: boolean;
  isVisible?: boolean;
  sortOrder?: number;
  group?: string;
  description?: string;
  validationRules?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    allowedValues?: string[];
  };
}

export interface AttributeResponse {
  attribute: Attribute;
}
