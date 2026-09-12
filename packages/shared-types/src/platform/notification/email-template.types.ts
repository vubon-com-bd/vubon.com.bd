import { BaseEntity } from '../../common/base.types';
import { EMAIL_TEMPLATE } from '@vubon/shared-constants/src/platform/notification/email-template.constants';

export interface EmailTemplate extends BaseEntity {
  templateId: string;
  type: keyof typeof EMAIL_TEMPLATE.TYPES | string;
  name: string;
  description?: string;
  subject: string;
  body: string;
  variables: string[];
  isActive: boolean;
  isDefault: boolean;
  metadata: Record<string, unknown>;
}
