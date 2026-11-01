/**
 * DigestVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * Digest aggregate-এর immutable core state।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NOTIFICATION_DIGEST } from '@vubon/shared-constants/platform';

import { DigestIdVO } from '@domain/primitives/digest-id.vo.js';
import { DigestStatusVO } from '@domain/primitives/digest-status.vo.js';
import { DigestTypeVO } from '@domain/primitives/digest-type.vo.js';
import { DigestPeriodVO } from '@domain/primitives/digest-period.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

export interface DigestVOProps {
  readonly id: DigestIdVO;
  readonly userId: UserIdVO;
  readonly status: DigestStatusVO;
  readonly type: DigestTypeVO;
  readonly period: DigestPeriodVO;
  readonly categories: readonly string[];
  readonly sendHour: number;
  readonly timezone: string;
  readonly itemCount: number;
  readonly generatedAt?: string;
  readonly sentAt?: string;
  readonly lastDeliveredAt?: string;
}

export class DigestVO extends BaseVO<DigestVOProps> {
  private constructor(props: DigestVOProps) {
    super(Object.freeze(props));
  }

  static create(props: DigestVOProps): DigestVO {
    const vo = new DigestVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: DigestVOProps): DigestVO {
    return new DigestVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!Number.isInteger(v.sendHour) || v.sendHour < 0 || v.sendHour > 23) {
      throw new ValidationError('sendHour must be in [0, 23]', 'sendHour');
    }
    if (v.categories.length === 0 && v.itemCount > 0) {
      throw new ValidationError('Non-empty digest requires at least one category', 'categories');
    }
    if (v.itemCount > NOTIFICATION_DIGEST.MAX_ITEMS_PER_DIGEST) {
      throw new ValidationError(
        `itemCount ${v.itemCount} exceeds max ${NOTIFICATION_DIGEST.MAX_ITEMS_PER_DIGEST}`,
        'itemCount',
      );
    }
    if (v.status.isReady() && !v.generatedAt) {
      throw new ValidationError('Ready digest requires generatedAt', 'generatedAt');
    }
    if (v.status.isSent() && !v.sentAt) {
      throw new ValidationError('Sent digest requires sentAt', 'sentAt');
    }
  }

  get id(): DigestIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get status(): DigestStatusVO { return this.value.status; }
  get type(): DigestTypeVO { return this.value.type; }
  get period(): DigestPeriodVO { return this.value.period; }
  get categories(): readonly string[] { return this.value.categories; }
  get sendHour(): number { return this.value.sendHour; }
  get timezone(): string { return this.value.timezone; }
  get itemCount(): number { return this.value.itemCount; }
  get generatedAt(): string | undefined { return this.value.generatedAt; }
  get sentAt(): string | undefined { return this.value.sentAt; }
  get lastDeliveredAt(): string | undefined { return this.value.lastDeliveredAt; }

  isPending(): boolean { return this.status.isPending(); }
  isGenerating(): boolean { return this.status.isGenerating(); }
  isReady(): boolean { return this.status.isReady(); }
  isSent(): boolean { return this.status.isSent(); }
  isFailed(): boolean { return this.status.isFailed(); }
  isCancelled(): boolean { return this.status.isCancelled(); }

  get isEmpty(): boolean { return this.value.itemCount === 0; }
  get canBeSent(): boolean { return this.status.canBeSent() && !this.isEmpty; }

  hasCategory(category: string): boolean {
    return this.value.categories.includes(category);
  }

  withStatus(status: DigestStatusVO): DigestVO {
    return DigestVO.create({ ...this.value, status });
  }

  withItemCount(itemCount: number): DigestVO {
    return DigestVO.create({ ...this.value, itemCount });
  }

  withGeneratedAt(generatedAt: string): DigestVO {
    return DigestVO.create({ ...this.value, generatedAt });
  }
}
