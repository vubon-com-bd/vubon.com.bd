import { BaseEntity } from '../common/base.types';
import { MARKETING_AUTOMATION } from '@vubon/shared-constants/src/marketing/marketing-automation.constants';
import { Campaign } from './campaign.types';

export interface AutomationCondition {
  field: string;
  operator:
    | 'eq'
    | 'ne'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'contains'
    | 'starts_with'
    | 'ends_with'
    | 'in'
    | 'not_in';
  value: unknown;
}

export interface AutomationAction {
  type: string;
  value: unknown;
}

export interface MarketingAutomation extends BaseEntity {
  automationId: string;
  name: string;
  description?: string;
  status: keyof typeof MARKETING_AUTOMATION.STATUS | string;
  type: keyof typeof MARKETING_AUTOMATION.TYPES | string;
  trigger: keyof typeof MARKETING_AUTOMATION.TRIGGER_TYPES | string;
  executionTime: keyof typeof MARKETING_AUTOMATION.EXECUTION_TIMES | string;
  campaignId?: string;
  campaign?: Campaign;
  conditions: AutomationCondition[];
  actions: AutomationAction[];
  isActive: boolean;
  isError: boolean;
  metadata: Record<string, unknown>;
}
