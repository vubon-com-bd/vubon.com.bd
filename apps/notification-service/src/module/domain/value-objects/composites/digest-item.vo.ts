/**
 * DigestItemVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * Digest-এর একটা item (aggregated notification reference)।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';

export interface DigestItemVOProps {
  readonly notificationId: NotificationIdVO;
  readonly category: NotificationCategoryVO;
  readonly priority: NotificationPriorityVO;
  readonly title: string;
  readonly summary: string;
  readonly actionUrl?: string;
  readonly occurredAt: string;
}

const MAX_TITLE_LENGTH = 150;
const MAX_SUMMARY_LENGTH = 500;

export class DigestItemVO extends BaseVO<DigestItemVOProps> {
  private constructor(props: DigestItemVOProps) {
    super(Object.freeze(props));
  }

  static create(props: DigestItemVOProps): DigestItemVO {
    const vo = new DigestItemVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: DigestItemVOProps): DigestItemVO {
    return new DigestItemVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.title || v.title.trim().length === 0) {
      throw new ValidationError('Digest item title cannot be empty', 'title');
    }
    if (v.title.length > MAX_TITLE_LENGTH) {
      throw new ValidationError(`Digest item title exceeds ${MAX_TITLE_LENGTH} chars`, 'title');
    }
    if (!v.summary || v.summary.trim().length === 0) {
      throw new ValidationError('Digest item summary cannot be empty', 'summary');
    }
    if (v.summary.length > MAX_SUMMARY_LENGTH) {
      throw new ValidationError(`Digest item summary exceeds ${MAX_SUMMARY_LENGTH} chars`, 'summary');
    }
    const occurred = new Date(v.occurredAt);
    if (Number.isNaN(occurred.getTime())) {
      throw new ValidationError('occurredAt is not a valid timestamp', 'occurredAt');
    }
    if (v.actionUrl !== undefined) {
      try {
        new URL(v.actionUrl);
      } catch {
        throw new ValidationError('actionUrl is not a valid URL', 'actionUrl');
      }
    }
  }

  get notificationId(): NotificationIdVO { return this.value.notificationId; }
  get category(): NotificationCategoryVO { return this.value.category; }
  get priority(): NotificationPriorityVO { return this.value.priority; }
  get title(): string { return this.value.title; }
  get summary(): string { return this.value.summary; }
  get actionUrl(): string | undefined { return this.value.actionUrl; }
  get occurredAt(): string { return this.value.occurredAt; }

  isUrgent(): boolean { return this.priority.isUrgent(); }
  hasAction(): boolean { return this.value.actionUrl !== undefined; }
}
