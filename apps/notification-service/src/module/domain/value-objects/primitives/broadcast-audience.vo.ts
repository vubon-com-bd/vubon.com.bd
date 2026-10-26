/**
 * BroadcastAudience Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NOTIFICATION_BROADCAST_TARGET } from '@vubon/shared-constants/platform';
import { InvalidBroadcastAudienceError } from '@domain/errors/broadcast.errors.js';

export type BroadcastAudienceValue =
  (typeof NOTIFICATION_BROADCAST_TARGET)[keyof typeof NOTIFICATION_BROADCAST_TARGET];

const ALLOWED = Object.values(NOTIFICATION_BROADCAST_TARGET) as readonly string[];

export interface BroadcastAudienceProps {
  readonly target: BroadcastAudienceValue;
  readonly userIds?: readonly string[];
  readonly segmentId?: string;
}

export class BroadcastAudienceVO extends BaseVO<BroadcastAudienceProps> {
  private constructor(value: BroadcastAudienceProps) {
    super(value);
  }

  static create(props: BroadcastAudienceProps): BroadcastAudienceVO {
    // 1) target must be allowed
    if (!ALLOWED.includes(props.target)) {
      throw new InvalidBroadcastAudienceError(String(props.target), ALLOWED);
    }

    // 2) CUSTOM requires userIds or segmentId
    if (props.target === NOTIFICATION_BROADCAST_TARGET.CUSTOM) {
      const hasUsers = Array.isArray(props.userIds) && props.userIds.length > 0;
      const hasSegment = typeof props.segmentId === 'string' && props.segmentId.length > 0;
      if (!hasUsers && !hasSegment) {
        throw new ValidationError(
          'CUSTOM broadcast audience requires userIds or segmentId',
          'audience',
        );
      }
    }

    return new BroadcastAudienceVO(props);
  }

  static reconstitute(props: BroadcastAudienceProps): BroadcastAudienceVO {
    return new BroadcastAudienceVO(props);
  }

  get target(): BroadcastAudienceValue { return this.value.target; }
  get userIds(): readonly string[] | undefined { return this.value.userIds; }
  get segmentId(): string | undefined { return this.value.segmentId; }

  isCustom(): boolean {
    return this.value.target === NOTIFICATION_BROADCAST_TARGET.CUSTOM;
  }

  estimatedSize(): number {
    if (this.value.userIds) return this.value.userIds.length;
    return 0;
  }
}
