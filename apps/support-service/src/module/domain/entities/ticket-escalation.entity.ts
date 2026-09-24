import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { TicketEscalationIdVO } from '../value-objects/primitives/ticket-escalation-id.vo';
import { TicketEscalationLevelVO } from '../value-objects/primitives/ticket-escalation-level.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';

export interface TicketEscalationEntityProps {
  readonly ticketId: TicketIdVO;
  readonly level: TicketEscalationLevelVO;
  readonly reason: string;
  readonly escalatedAt: Date;
  readonly resolvedAt: Date | null;
}

export class TicketEscalationEntity extends AggregateRoot<TicketEscalationIdVO> {
  private readonly _ticketId: TicketIdVO;
  private readonly _level: TicketEscalationLevelVO;
  private readonly _reason: string;
  private readonly _escalatedAt: Date;
  private readonly _resolvedAt: Date | null;

  private constructor(
    id: TicketEscalationIdVO,
    props: TicketEscalationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._ticketId = props.ticketId;
    this._level = props.level;
    this._reason = props.reason;
    this._escalatedAt = props.escalatedAt;
    this._resolvedAt = props.resolvedAt;
  }

  static create(props: TicketEscalationEntityProps): TicketEscalationEntity {
    const now = new Date().toISOString();
    const id = TicketEscalationIdVO.create(crypto.randomUUID());
    return new TicketEscalationEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: TicketEscalationIdVO,
    props: TicketEscalationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): TicketEscalationEntity {
    return new TicketEscalationEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  resolve(): TicketEscalationEntity {
    return new TicketEscalationEntity(
      this.id,
      { ...this._toProps(), resolvedAt: new Date() },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get ticketId(): TicketIdVO { return this._ticketId; }
  get level(): TicketEscalationLevelVO { return this._level; }
  get reason(): string { return this._reason; }
  get escalatedAt(): Date { return this._escalatedAt; }
  get resolvedAt(): Date | null { return this._resolvedAt; }

  private _toProps(): TicketEscalationEntityProps {
    return {
      ticketId: this._ticketId,
      level: this._level,
      reason: this._reason,
      escalatedAt: this._escalatedAt,
      resolvedAt: this._resolvedAt,
    };
  }
}
