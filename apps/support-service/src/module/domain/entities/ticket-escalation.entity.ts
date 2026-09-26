/**
 * TicketEscalationEntity — Escalation record
 * @module support-service/domain/entities
 *
 * Registry: extends AggregateRoot<TicketEscalationIdVO>
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { TicketEscalationIdVO } from '../value-objects/primitives/ticket-escalation-id.vo';
import { TicketEscalationLevelVO } from '../value-objects/primitives/ticket-escalation-level.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';
import {
  TicketEscalatedEvent,
  EscalationResolvedEvent,
} from '../events/ticket-escalation.events';

export interface CreateTicketEscalationInput {
  readonly id: TicketEscalationIdVO;
  readonly ticketId: TicketIdVO;
  readonly level: TicketEscalationLevelVO;
  readonly reason: string;
  readonly escalatedBy?: AgentIdVO;
  readonly now: string;
}

export interface TicketEscalationSnapshot {
  readonly id: string;
  readonly ticketId: string;
  readonly level: string;
  readonly reason: string;
  readonly escalatedBy?: string;
  readonly resolvedAt?: string;
  readonly resolution?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class TicketEscalationEntity extends AggregateRoot<TicketEscalationIdVO> {
  private readonly _ticketId: TicketIdVO;
  private _level: TicketEscalationLevelVO;
  private readonly _reason: string;
  private readonly _escalatedBy?: AgentIdVO;
  private _resolvedAt?: string;
  private _resolution?: string;

  private constructor(
    id: TicketEscalationIdVO,
    ticketId: TicketIdVO,
    level: TicketEscalationLevelVO,
    reason: string,
    createdAt: string,
    updatedAt: string,
    escalatedBy?: AgentIdVO,
  ) {
    super(id, createdAt, updatedAt);
    this._ticketId = ticketId;
    this._level = level;
    this._reason = reason;
    this._escalatedBy = escalatedBy;
  }

  static create(input: CreateTicketEscalationInput): TicketEscalationEntity {
    if (!input.id || !input.ticketId) {
      throw new ValidationError(
        'TicketEscalation requires id and ticketId',
        'ticketEscalation',
      );
    }
    if (typeof input.reason !== 'string' || input.reason.trim().length === 0) {
      throw new ValidationError(
        'TicketEscalation reason required',
        'ticketEscalation',
      );
    }
    const now = input.now;
    const escalation = new TicketEscalationEntity(
      input.id,
      input.ticketId,
      input.level,
      input.reason.trim(),
      now,
      now,
      input.escalatedBy,
    );
    escalation.addDomainEvent(
      new TicketEscalatedEvent(
        input.id,
        input.ticketId,
        input.level,
        escalation._reason,
        Date.parse(now),
      ),
    );
    return escalation;
  }

  static rehydrate(snapshot: TicketEscalationSnapshot): TicketEscalationEntity {
    const escalation = new TicketEscalationEntity(
      TicketEscalationIdVO.create(snapshot.id),
      TicketIdVO.create(snapshot.ticketId),
      TicketEscalationLevelVO.create(snapshot.level),
      snapshot.reason,
      snapshot.createdAt,
      snapshot.updatedAt,
      snapshot.escalatedBy ? AgentIdVO.create(snapshot.escalatedBy) : undefined,
    );
    escalation._resolvedAt = snapshot.resolvedAt;
    escalation._resolution = snapshot.resolution;
    return escalation;
  }

  get ticketId(): TicketIdVO {
    return this._ticketId;
  }

  get level(): TicketEscalationLevelVO {
    return this._level;
  }

  get reason(): string {
    return this._reason;
  }

  get escalatedBy(): AgentIdVO | undefined {
    return this._escalatedBy;
  }

  get isResolved(): boolean {
    return this._resolvedAt !== undefined;
  }

  get resolution(): string | undefined {
    return this._resolution;
  }

  get resolvedAt(): string | undefined {
    return this._resolvedAt;
  }

  escalate(now: string): void {
    if (this.isResolved) {
      throw new BusinessRuleError(
        'Cannot escalate a resolved escalation',
        'ticketEscalation.resolved',
      );
    }
    if (this._level.isHighest()) {
      throw new BusinessRuleError(
        'Already at the highest escalation level',
        'ticketEscalation.max_level',
      );
    }
    const from = this._level;
    this._level = from.escalate();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
    this.addDomainEvent(
      new TicketEscalatedEvent(
        this.id,
        this._ticketId,
        this._level,
        this._reason,
        Date.parse(now),
        this.version + 1,
      ),
    );
  }

  resolve(resolution: string, now: string): void {
    if (this.isResolved) {
      throw new BusinessRuleError(
        'Escalation is already resolved',
        'ticketEscalation.already_resolved',
      );
    }
    if (typeof resolution !== 'string' || resolution.trim().length === 0) {
      throw new ValidationError('Resolution required', 'ticketEscalation');
    }
    this._resolvedAt = now;
    this._resolution = resolution.trim();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
    this.addDomainEvent(
      new EscalationResolvedEvent(this.id, this._resolution, Date.parse(now), this.version + 1),
    );
  }

  toSnapshot(): TicketEscalationSnapshot {
    return {
      id: this.id.value,
      ticketId: this._ticketId.value,
      level: this._level.value,
      reason: this._reason,
      escalatedBy: this._escalatedBy?.value,
      resolvedAt: this._resolvedAt,
      resolution: this._resolution,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
