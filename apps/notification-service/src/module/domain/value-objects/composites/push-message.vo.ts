/**
 * PushMessageVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * FCM/APNs push message — title + body + data + actions।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PUSH } from '@vubon/shared-constants/platform';

import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import { NotificationActionVO } from '@domain/composites/notification-action.vo.js';

export interface PushMessageVOProps {
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly data?: Readonly<Record<string, unknown>>;
  readonly actions?: readonly NotificationActionVO[];
  readonly priority: NotificationPriorityVO;
  readonly silent: boolean;
}

export class PushMessageVO extends BaseVO<PushMessageVOProps> {
  private constructor(props: PushMessageVOProps) {
    super(Object.freeze(props));
  }

  static create(props: PushMessageVOProps): PushMessageVO {
    const vo = new PushMessageVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: PushMessageVOProps): PushMessageVO {
    return new PushMessageVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.title || v.title.trim().length === 0) {
      throw new ValidationError('Push title cannot be empty', 'title');
    }
    if (v.title.length > PUSH.TITLE_MAX_LENGTH) {
      throw new ValidationError(`Push title exceeds ${PUSH.TITLE_MAX_LENGTH} chars`, 'title');
    }
    if (!v.body || v.body.trim().length === 0) {
      throw new ValidationError('Push body cannot be empty', 'body');
    }
    if (v.body.length > PUSH.BODY_MAX_LENGTH) {
      throw new ValidationError(`Push body exceeds ${PUSH.BODY_MAX_LENGTH} chars`, 'body');
    }
    if (v.actions && v.actions.length > PUSH.MAX_ACTIONS) {
      throw new ValidationError(`Push actions exceed ${PUSH.MAX_ACTIONS}`, 'actions');
    }
    if (v.data) {
      const sizeKb = JSON.stringify(v.data).length / 1024;
      if (sizeKb > PUSH.DATA_MAX_SIZE_KB) {
        throw new ValidationError(
          `Push data exceeds ${PUSH.DATA_MAX_SIZE_KB}KB`,
          'data',
        );
      }
    }
    if (v.silent && v.actions && v.actions.length > 0) {
      throw new ValidationError('Silent push cannot have actions', 'actions');
    }
  }

  get title(): string { return this.value.title; }
  get body(): string { return this.value.body; }
  get imageUrl(): string | undefined { return this.value.imageUrl; }
  get iconUrl(): string | undefined { return this.value.iconUrl; }
  get data(): Readonly<Record<string, unknown>> | undefined { return this.value.data; }
  get actions(): readonly NotificationActionVO[] | undefined { return this.value.actions; }
  get priority(): NotificationPriorityVO { return this.value.priority; }
  get silent(): boolean { return this.value.silent; }

  hasImage(): boolean { return this.value.imageUrl !== undefined; }
  hasActions(): boolean { return (this.value.actions?.length ?? 0) > 0; }
  get actionCount(): number { return this.value.actions?.length ?? 0; }
}
