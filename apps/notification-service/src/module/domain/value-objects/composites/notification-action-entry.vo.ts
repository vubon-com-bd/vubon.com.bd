/**
 * NotificationActionEntryVO — single action button
 * @module notification-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NotificationActionVO } from '../primitives/notification-action.vo.js';
import { NotificationActionTypeVO } from '../primitives/notification-action-type.vo.js';
import { ActionUrlVO } from '../primitives/action-url.vo.js';

export interface NotificationActionEntryVOProps {
  readonly action: NotificationActionVO;
  readonly type: NotificationActionTypeVO;
  readonly label: string;
  readonly url?: ActionUrlVO;
  readonly payload?: Readonly<Record<string, unknown>>;
}

export class NotificationActionEntryVO extends BaseVO<NotificationActionEntryVOProps> {
  private constructor(props: NotificationActionEntryVOProps) {
    super(props);
  }

  static create(props: NotificationActionEntryVOProps): NotificationActionEntryVO {
    const vo = new NotificationActionEntryVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: NotificationActionEntryVOProps): NotificationActionEntryVO {
    return new NotificationActionEntryVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.label || v.label.trim().length === 0) {
      throw new ValidationError('Action label cannot be empty', 'label');
    }
    if (v.label.length > 40) {
      throw new ValidationError('Action label exceeds 40 chars', 'label');
    }
    if (v.action.requiresUrl() && !v.url) {
      throw new ValidationError(
        `Action "${v.action.value}" requires a URL`,
        'url',
      );
    }
  }

  get action(): NotificationActionVO { return this.value.action; }
  get type(): NotificationActionTypeVO { return this.value.type; }
  get label(): string { return this.value.label; }
  get url(): ActionUrlVO | undefined { return this.value.url; }
  get payload(): Readonly<Record<string, unknown>> | undefined { return this.value.payload; }

  hasUrl(): boolean { return this.value.url !== undefined; }
}
