/**
 * TemplateStatus Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_TEMPLATE_STATUS } from '@vubon/shared-constants/platform/notification';
import { InvalidTemplateStatusError } from '../../errors/template.errors.js';

const ALLOWED = Object.values(NOTIFICATION_TEMPLATE_STATUS) as readonly string[];

export class TemplateStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TemplateStatusVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidTemplateStatusError(raw, ALLOWED);
    }
    return new TemplateStatusVO(raw);
  }

  static reconstitute(raw: string): TemplateStatusVO {
    return new TemplateStatusVO(raw);
  }

  static draft(): TemplateStatusVO { return new TemplateStatusVO(NOTIFICATION_TEMPLATE_STATUS.DRAFT); }
  static active(): TemplateStatusVO { return new TemplateStatusVO(NOTIFICATION_TEMPLATE_STATUS.ACTIVE); }
  static inactive(): TemplateStatusVO { return new TemplateStatusVO(NOTIFICATION_TEMPLATE_STATUS.INACTIVE); }
  static archived(): TemplateStatusVO { return new TemplateStatusVO(NOTIFICATION_TEMPLATE_STATUS.ARCHIVED); }
  static deprecated(): TemplateStatusVO { return new TemplateStatusVO(NOTIFICATION_TEMPLATE_STATUS.DEPRECATED); }

  isDraft(): boolean { return this.value === NOTIFICATION_TEMPLATE_STATUS.DRAFT; }
  isActive(): boolean { return this.value === NOTIFICATION_TEMPLATE_STATUS.ACTIVE; }
  isInactive(): boolean { return this.value === NOTIFICATION_TEMPLATE_STATUS.INACTIVE; }
  isArchived(): boolean { return this.value === NOTIFICATION_TEMPLATE_STATUS.ARCHIVED; }
  isDeprecated(): boolean { return this.value === NOTIFICATION_TEMPLATE_STATUS.DEPRECATED; }

  isUsable(): boolean {
    return this.isActive();
  }

  isFinal(): boolean {
    return this.isArchived() || this.isDeprecated();
  }
}
