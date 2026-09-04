/**
 * Flash Sale Rule Types
 * ফ্ল্যাশ সেল রুল সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface FlashSaleRule extends BaseEntity {
  flashSaleId: string;
  name: string;
  nameBangla?: string;
  description?: string;
  type: 'discount' | 'quantity' | 'eligibility' | 'timing' | 'stacking';
  priority: number;
  conditions: {
    field: string;
    operator: string;
    value: unknown;
  }[];
  actions: {
    type: string;
    value: unknown;
  }[];
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlashSaleRuleCreateInput {
  flashSaleId: string;
  name: string;
  nameBangla?: string;
  description?: string;
  type: 'discount' | 'quantity' | 'eligibility' | 'timing' | 'stacking';
  priority?: number;
  conditions: {
    field: string;
    operator: string;
    value: unknown;
  }[];
  actions: {
    type: string;
    value: unknown;
  }[];
  startDate?: Date;
  endDate?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleRuleUpdateInput {
  name?: string;
  nameBangla?: string;
  description?: string;
  priority?: number;
  conditions?: {
    field: string;
    operator: string;
    value: unknown;
  }[];
  actions?: {
    type: string;
    value: unknown;
  }[];
  isActive?: boolean;
  startDate?: Date;
  endDate?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleRuleResponse {
  flashSaleRule: FlashSaleRule;
}
