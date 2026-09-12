import { BaseEntity } from '../common/base.types';
import { SUPPORT_TEMPLATE } from '@vubon/shared-constants/src/support/support-template.constants';

export interface SupportTemplate extends BaseEntity {
  templateId: string;
  name: string;
  description?: string;
  status: keyof typeof SUPPORT_TEMPLATE.STATUS | string;
  type: keyof typeof SUPPORT_TEMPLATE.TYPES | string;
  format: keyof typeof SUPPORT_TEMPLATE.TEMPLATE_FORMATS | string;
  subject: string;
  content: string;
  variables: string[];
  isActive: boolean;
  isDefault: boolean;
  metadata: Record<string, unknown>;
}
