/**
 * NotificationActionVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * User-triggerable action (view, accept, dismiss, etc.)।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { ActionIdVO } from '@domain/primitives/action-id.vo.js';
import { ActionTypeVO } from '@domain/primitives/action-type.vo.js';
import { ActionUrlVO } from '@domain/primitives/action-url.vo.js';

const MAX_LABEL_LENGTH = 50;

export interface NotificationActionProps {
  readonly id: ActionIdVO;
  readonly type: ActionTypeVO;
  readonly label: string;
  readonly url?: ActionUrlVO;
  readonly payload?: Readonly<Record<string, unknown>>;
}

export class NotificationActionVO extends BaseVO<NotificationActionProps> {
  private constructor(props: NotificationActionProps) {
    super(Object.freeze(props));
  }

  static create(props: NotificationActionProps): NotificationActionVO {
    const vo = new NotificationActionVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: NotificationActionProps): NotificationActionVO {
    return new NotificationActionVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (typeof v.label !== 'string' || v.label.trim().length === 0) {
      throw new ValidationError('Action label cannot be empty', 'label');
    }
    if (v.label.length > MAX_LABEL_LENGTH) {
      throw new ValidationError(`Action label exceeds ${MAX_LABEL_LENGTH} chars`, 'label');
    }
  }

  get id(): ActionIdVO { return this.value.id; }
  get type(): ActionTypeVO { return this.value.type; }
  get label(): string { return this.value.label; }
  get url(): ActionUrlVO | undefined { return this.value.url; }
  get payload(): Readonly<Record<string, unknown>> | undefined { return this.value.payload; }

  isDestructive(): boolean { return this.type.isDestructive(); }
  isEngagement(): boolean { return this.type.isEngagement(); }
  hasUrl(): boolean { return this.value.url !== undefined; }
}
