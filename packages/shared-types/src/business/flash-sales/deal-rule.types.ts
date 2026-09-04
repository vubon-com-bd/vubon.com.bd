/**
 * Deal Rule Types
 * ডিল রুল সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface DealRule extends BaseEntity {
  dealId: string;
  name: string;
  nameBangla?: string;
  description?: string;
  type: 'discount' | 'quantity' | 'eligibility' | 'timing' | 'stacking' | 'bundle';
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

export interface DealRuleCreateInput {
  dealId: string;
  name: string;
  nameBangla?: string;
  description?: string;
  type: 'discount' | 'quantity' | 'eligibility' | 'timing' | 'stacking' | 'bundle';
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

export interface DealRuleUpdateInput {
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

export interface DealRuleResponse {
  dealRule: DealRule;
}
