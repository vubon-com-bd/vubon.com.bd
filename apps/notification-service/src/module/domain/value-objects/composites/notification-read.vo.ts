/**
 * NotificationReadVO — read state + lifecycle timestamps
 * @module notification-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ReadStatusVO } from '../primitives/read-status.vo.js';

export interface NotificationReadVOProps {
  readonly status: ReadStatusVO;
  readonly readAt?: string;
  readonly archivedAt?: string;
  readonly snoozedUntil?: string;
}

export class NotificationReadVO extends BaseVO<NotificationReadVOProps> {
  private constructor(props: NotificationReadVOProps) {
    super(props);
  }

  static create(props: NotificationReadVOProps): NotificationReadVO {
    const vo = new NotificationReadVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: NotificationReadVOProps): NotificationReadVO {
    return new NotificationReadVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.status.isRead() && !v.readAt) {
      throw new ValidationError('Read status requires readAt timestamp', 'readAt');
    }
    if (v.status.isArchived() && !v.archivedAt) {
      throw new ValidationError('Archived status requires archivedAt timestamp', 'archivedAt');
    }
    if (v.status.isSnoozed() && !v.snoozedUntil) {
      throw new ValidationError('Snoozed status requires snoozedUntil timestamp', 'snoozedUntil');
    }
  }

  get status(): ReadStatusVO { return this.value.status; }
  get readAt(): string | undefined { return this.value.readAt; }
  get archivedAt(): string | undefined { return this.value.archivedAt; }
  get snoozedUntil(): string | undefined { return this.value.snoozedUntil; }

  isRead(): boolean { return this.value.status.isRead(); }
  isUnread(): boolean { return this.value.status.isUnread(); }

  isSnoozeActive(at: Date = new Date()): boolean {
    if (!this.value.snoozedUntil) return false;
    return new Date(this.value.snoozedUntil).getTime() > at.getTime();
  }
}
