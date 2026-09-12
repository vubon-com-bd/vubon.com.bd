import { BaseEntity } from '../common/base.types';
import { SUPPORT_TEMPLATE } from '@vubon/shared-constants/src/support/support-template.constants';

export interface ScriptOption {
  label: string;
  value: string;
  nextStep: string;
}

export interface ScriptStep {
  stepId: string;
  order: number;
  type: 'text' | 'question' | 'decision' | 'action' | 'end';
  content: string;
  options?: ScriptOption[];
  nextStep?: string;
}

export interface SupportScript extends BaseEntity {
  scriptId: string;
  name: string;
  description?: string;
  status: keyof typeof SUPPORT_TEMPLATE.STATUS | string;
  type: keyof typeof SUPPORT_TEMPLATE.TYPES | string;
  steps: ScriptStep[];
  variables: string[];
  isActive: boolean;
  isDefault: boolean;
  metadata: Record<string, unknown>;
}
