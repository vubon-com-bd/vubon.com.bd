/**
 * SlaEntity — SLA definition/instance aggregate
 * @module support-service/domain/entities
 *
 * Registry: extends AggregateRoot<SlaIdVO>
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { SlaIdVO } from '../value-objects/primitives/sla-id.vo';
import { SlaTypeVO } from '../value-objects/primitives/sla-type.vo';
import { SlaTargetVO } from '../value-objects/primitives/sla-target.vo';
import { SlaStatusVO } from '../value-objects/primitives/sla-status.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';
import { TicketPriorityVO } from '../value-objects/primitives/ticket-priority.vo';
import { SlaBreachedEvent, SlaWarningEvent, SlaMetEvent } from '../events/sla.events';

export interface CreateSlaInput {
  readonly id: SlaIdVO;
  readonly type: SlaTypeVO;
  readonly target: SlaTargetVO;
  readonly priority: TicketPriorityVO;
  readonly ticketId: TicketIdVO;
  readonly now: string;
}

export interface SlaSnapshot {
  readonly id: string;
  readonly type: string;
  readonly target: number;
  readonly status: string;
  readonly priority: string;
  readonly ticketId: string;
  readonly startedAt: string;
  readonly endedAt?: string;
  readonly elapsedMinutes: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const WARNING_THRESHOLD = 80;

export class SlaEntity extends AggregateRoot<SlaIdVO> {
  private readonly _type: SlaTypeVO;
  private readonly _target: SlaTargetVO;
  private _status: SlaStatusVO;
  private readonly _priority: TicketPriorityVO;
  private readonly _ticketId: TicketIdVO;
  private readonly _startedAt: string;
  private _endedAt?: string;
  private _elapsedMinutes: number;

  private constructor(
    id: SlaIdVO,
    type: SlaTypeVO,
    target: SlaTargetVO,
    status: SlaStatusVO,
    priority: TicketPriorityVO,
    ticketId: TicketIdVO,
    startedAt: string,
    createdAt: string,
    updatedAt: string,
  ) {
    super(id, createdAt, updatedAt);
    this._type = type;
    this._target = target;
    this._status = status;
    this._priority = priority;
    this._ticketId = ticketId;
    this._startedAt = startedAt;
    this._elapsedMinutes = 0;
  }

  static create(input: CreateSlaInput): SlaEntity {
    if (!input.id || !input.ticketId) {
      throw new ValidationError(
        'SLA requires id and ticketId',
        'sla',
      );
    }
    const now = input.now;
    return new SlaEntity(
      input.id,
      input.type,
      input.target,
      SlaStatusVO.create('pending'),
      input.priority,
      input.ticketId,
      now,
      now,
      now,
    );
  }

  static rehydrate(snapshot: SlaSnapshot): SlaEntity {
    const sla = new SlaEntity(
      SlaIdVO.create(snapshot.id),
      SlaTypeVO.create(snapshot.type),
      SlaTargetVO.create(snapshot.target),
      SlaStatusVO.create(snapshot.status),
      TicketPriorityVO.create(snapshot.priority),
      TicketIdVO.create(snapshot.ticketId),
      snapshot.startedAt,
      snapshot.createdAt,
      snapshot.updatedAt,
    );
    sla._elapsedMinutes = snapshot.elapsedMinutes;
    sla._endedAt = snapshot.endedAt;
    return sla;
  }

  get type(): SlaTypeVO {
    return this._type;
  }

  get target(): SlaTargetVO {
    return this._target;
  }

  get status(): SlaStatusVO {
    return this._status;
  }

  get priority(): TicketPriorityVO {
    return this._priority;
  }

  get ticketId(): TicketIdVO {
    return this._ticketId;
  }

  get elapsedMinutes(): number {
    return this._elapsedMinutes;
  }

  get remainingMinutes(): number {
    return this._target.value - this._elapsedMinutes;
  }

  get usedPercent(): number {
    return Math.min(100, (this._elapsedMinutes / this._target.value) * 100);
  }

  get isAtRisk(): boolean {
    return this.usedPercent >= WARNING_THRESHOLD && !this._status.isTerminal();
  }

  get isTerminal(): boolean {
    return this._status.isTerminal();
  }

  tick(elapsedMinutes: number, now: string): void {
    if (this._status.isTerminal()) {
      throw new BusinessRuleError(
        'Cannot tick a terminal SLA',
        'sla.terminal',
      );
    }
    if (elapsedMinutes < 0) {
      throw new ValidationError('Elapsed minutes cannot be negative', 'sla');
    }
    this._elapsedMinutes = elapsedMinutes;
    (this as unknown as { updatedAt: string }).updatedAt = now;

    if (this._elapsedMinutes > this._target.value) {
      if (this._status.value !== 'breached') {
        this._status = SlaStatusVO.create('breached');
        this._endedAt = now;
        this.incrementVersion();
        this.addDomainEvent(
          new SlaBreachedEvent(
            this.id,
            this._ticketId,
            this._type.value,
            this._target.value,
            this._elapsedMinutes,
            Date.parse(now),
            this.version + 1,
          ),
        );
      }
      return;
    }

    if (this.isAtRisk && this._status.value !== 'warning') {
      this._status = SlaStatusVO.create('warning');
      this.incrementVersion();
      this.addDomainEvent(
        new SlaWarningEvent(
          this.id,
          this._ticketId,
          this.remainingMinutes,
          Date.parse(now),
          this.version + 1,
        ),
      );
    }
  }

  markMet(now: string): void {
    if (this._status.isTerminal()) {
      throw new BusinessRuleError('SLA already terminal', 'sla.terminal');
    }
    if (this._elapsedMinutes > this._target.value) {
      throw new BusinessRuleError(
        'Cannot mark as met after target exceeded',
        'sla.cannot.mark.met',
      );
    }
    this._status = SlaStatusVO.create('met');
    this._endedAt = now;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
    this.addDomainEvent(
      new SlaMetEvent(
        this.id,
        this._ticketId,
        this._type.value,
        this._elapsedMinutes,
        Date.parse(now),
        this.version + 1,
      ),
    );
  }

  toSnapshot(): SlaSnapshot {
    return {
      id: this.id.value,
      type: this._type.value,
      target: this._target.value,
      status: this._status.value,
      priority: this._priority.value,
      ticketId: this._ticketId.value,
      startedAt: this._startedAt,
      endedAt: this._endedAt,
      elapsedMinutes: this._elapsedMinutes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
