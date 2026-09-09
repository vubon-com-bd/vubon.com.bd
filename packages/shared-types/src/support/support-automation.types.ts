import { BaseEntity } from '../common/base.types';
import { SUPPORT_AUTOMATION } from '@vubon/shared-constants/src/support/support-automation.constants';
import { SupportRule } from './support-rule.types';

export interface SupportAutomation extends BaseEntity {
  automationId: string;
  name: string;
  description?: string;
  status: keyof typeof SUPPORT_AUTOMATION.STATUS | string;
  type: keyof typeof SUPPORT_AUTOMATION.TYPES | string;
  rules: SupportRule[];
  executionTime: keyof typeof SUPPORT_AUTOMATION.EXECUTION_TIMES | string;
  isActive: boolean;
  isError: boolean;
  metadata: Record<string, unknown>;
}
