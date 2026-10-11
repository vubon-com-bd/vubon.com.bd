/**
 * NotificationReferenceVO — points to the related entity (order, payment, ...)
 * @module notification-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface NotificationReferenceVOProps {
  readonly type: string;
  readonly id: string;
  readonly url?: string;
}

const TYPE_PATTERN = /^[a-z][a-z0-9_]{0,49}$/;

export class NotificationReferenceVO extends BaseVO<NotificationReferenceVOProps> {
  private constructor(props: NotificationReferenceVOProps) {
    super(props);
  }

  static create(props: NotificationReferenceVOProps): NotificationReferenceVO {
    const vo = new NotificationReferenceVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: NotificationReferenceVOProps): NotificationReferenceVO {
    return new NotificationReferenceVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!TYPE_PATTERN.test(v.type)) {
      throw new ValidationError(`Invalid reference type: ${v.type}`, 'referenceType');
    }
    if (!v.id || v.id.length === 0 || v.id.length > 100) {
      throw new ValidationError('Reference id must be 1-100 chars', 'referenceId');
    }
  }

  get type(): string { return this.value.type; }
  get id(): string { return this.value.id; }
  get url(): string | undefined { return this.value.url; }

  isOrder(): boolean { return this.value.type === 'order'; }
  isPayment(): boolean { return this.value.type === 'payment'; }
  isProduct(): boolean { return this.value.type === 'product'; }
  isShipment(): boolean { return this.value.type === 'shipment'; }
}
