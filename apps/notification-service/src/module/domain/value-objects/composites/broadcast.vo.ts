/**
 * BroadcastVO — mass-send notification snapshot
 * @module notification-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BroadcastIdVO } from '../primitives/broadcast-id.vo.js';
import { BroadcastTypeVO } from '../primitives/broadcast-type.vo.js';
import { BroadcastStatusVO } from '../primitives/broadcast-status.vo.js';
import { BroadcastTargetVO } from '../primitives/broadcast-target.vo.js';

export interface BroadcastVOProps {
  readonly id: BroadcastIdVO;
  readonly type: BroadcastTypeVO;
  readonly status: BroadcastStatusVO;
  readonly target: BroadcastTargetVO;
  readonly templateId: string;
  readonly estimatedRecipients?: number;
  readonly totalRecipients?: number;
  readonly succeeded?: number;
  readonly failed?: number;
  readonly scheduledAt?: string;
  readonly startedAt?: string;
  readonly completedAt?: string;
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class BroadcastVO extends BaseVO<BroadcastVOProps> {
  private constructor(props: BroadcastVOProps) {
    super(props);
  }

  static create(props: BroadcastVOProps): BroadcastVO {
    const vo = new BroadcastVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: BroadcastVOProps): BroadcastVO {
    return new BroadcastVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.templateId || v.templateId.length === 0) {
      throw new ValidationError('Broadcast requires a template id', 'templateId');
    }
    if (v.succeeded !== undefined && v.succeeded < 0) {
      throw new ValidationError('Succeeded count cannot be negative', 'succeeded');
    }
    if (v.failed !== undefined && v.failed < 0) {
      throw new ValidationError('Failed count cannot be negative', 'failed');
    }
  }

  get id(): BroadcastIdVO { return this.value.id; }
  get type(): BroadcastTypeVO { return this.value.type; }
  get status(): BroadcastStatusVO { return this.value.status; }
  get target(): BroadcastTargetVO { return this.value.target; }
  get templateId(): string { return this.value.templateId; }
  get estimatedRecipients(): number | undefined { return this.value.estimatedRecipients; }
  get totalRecipients(): number | undefined { return this.value.totalRecipients; }
  get succeeded(): number { return this.value.succeeded ?? 0; }
  get failed(): number { return this.value.failed ?? 0; }
  get scheduledAt(): string | undefined { return this.value.scheduledAt; }
  get startedAt(): string | undefined { return this.value.startedAt; }
  get completedAt(): string | undefined { return this.value.completedAt; }
  get createdBy(): string { return this.value.createdBy; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  canCancel(): boolean { return this.value.status.canBeCancelled(); }
  totalProcessed(): number { return this.succeeded + this.failed; }
}
