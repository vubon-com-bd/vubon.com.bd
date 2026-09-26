/**
 * SlaVO — Service Level Agreement composite
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SlaIdVO } from '../primitives/sla-id.vo';
import { SlaTypeVO } from '../primitives/sla-type.vo';
import { SlaTargetVO } from '../primitives/sla-target.vo';
import { SlaStatusVO } from '../primitives/sla-status.vo';
import { TicketPriorityVO } from '../primitives/ticket-priority.vo';

export interface SlaVOProps {
  readonly id: SlaIdVO;
  readonly type: SlaTypeVO;
  readonly target: SlaTargetVO;
  readonly status: SlaStatusVO;
  readonly priority: TicketPriorityVO;
  readonly elapsedMinutes?: number;
}

export class SlaVO extends BaseVO<Readonly<SlaVOProps>> {
  private constructor(props: SlaVOProps) {
    super(Object.freeze({ ...props, elapsedMinutes: props.elapsedMinutes ?? 0 }));
  }

  static create(props: SlaVOProps): SlaVO {
    if (!props.id || !props.type || !props.target || !props.priority) {
      throw new ValidationError(
        'SlaVO requires id, type, target, priority',
        'sla',
      );
    }
    return new SlaVO(props);
  }

  get id(): SlaIdVO {
    return this.value.id;
  }

  get target(): SlaTargetVO {
    return this.value.target;
  }

  get status(): SlaStatusVO {
    return this.value.status;
  }

  get elapsedMinutes(): number {
    return this.value.elapsedMinutes ?? 0;
  }

  get remainingMinutes(): number {
    return this.value.target.value - this.elapsedMinutes;
  }

  get usedPercent(): number {
    return Math.min(100, (this.elapsedMinutes / this.value.target.value) * 100);
  }

  get isAtRisk(): boolean {
    return this.usedPercent >= 80 && !this.value.status.isTerminal();
  }

  get isBreachedByTime(): boolean {
    return this.remainingMinutes <= 0;
  }
}
