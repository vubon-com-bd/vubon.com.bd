/**
 * VendorSuspensionLogEntity — audit log of a suspension lifecycle
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export const SUSPENSION_LOG_EVENT = {
  ISSUED: 'issued',
  APPEALED: 'appealed',
  APPEAL_APPROVED: 'appeal_approved',
  APPEAL_REJECTED: 'appeal_rejected',
  LIFTED: 'lifted',
  EXTENDED: 'extended',
  EXPIRED: 'expired',
} as const;

export type SuspensionLogEvent = (typeof SUSPENSION_LOG_EVENT)[keyof typeof SUSPENSION_LOG_EVENT];
const ALLOWED_EVENTS = Object.values(SUSPENSION_LOG_EVENT) as readonly string[];

export interface VendorSuspensionLogEntityProps {
  readonly vendorId: string;
  readonly suspensionId: string;
  readonly event: SuspensionLogEvent;
  readonly actorId: string;
  readonly reason?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly occurredAt: string;
}

export class VendorSuspensionLogEntity extends BaseEntity<string> {
  private readonly _vendorId: string;
  private readonly _suspensionId: string;
  private readonly _event: SuspensionLogEvent;
  private readonly _actorId: string;
  private readonly _reason?: string;
  private readonly _metadata?: Readonly<Record<string, unknown>>;
  private readonly _occurredAt: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorSuspensionLogEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._suspensionId = props.suspensionId;
    this._event = props.event;
    this._actorId = props.actorId;
    this._reason = props.reason;
    this._metadata = props.metadata;
    this._occurredAt = props.occurredAt;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!ALLOWED_EVENTS.includes(this._event)) {
      throw new ValidationError(`Invalid suspension log event "${this._event}"`, 'event');
    }
    if (Number.isNaN(Date.parse(this._occurredAt))) {
      throw new ValidationError('occurredAt must be a valid ISO timestamp', 'occurredAt');
    }
  }

  get vendorId(): string { return this._vendorId; }
  get suspensionId(): string { return this._suspensionId; }
  get event(): SuspensionLogEvent { return this._event; }
  get actorId(): string { return this._actorId; }
  get reason(): string | undefined { return this._reason; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }
  get occurredAt(): string { return this._occurredAt; }

  isIssuance(): boolean { return this._event === SUSPENSION_LOG_EVENT.ISSUED; }
  isLift(): boolean { return this._event === SUSPENSION_LOG_EVENT.LIFTED; }
  isAppealRelated(): boolean {
    return [
      SUSPENSION_LOG_EVENT.APPEALED,
      SUSPENSION_LOG_EVENT.APPEAL_APPROVED,
      SUSPENSION_LOG_EVENT.APPEAL_REJECTED,
    ].includes(this._event as never);
  }

  static create(params: {
    id: string;
    props: Omit<VendorSuspensionLogEntityProps, 'occurredAt'> & { occurredAt?: string };
    now: string;
  }): VendorSuspensionLogEntity {
    return new VendorSuspensionLogEntity(params.id, params.now, params.now, {
      ...params.props,
      occurredAt: params.props.occurredAt ?? params.now,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorSuspensionLogEntityProps;
    deletedAt?: string | null;
  }): VendorSuspensionLogEntity {
    return new VendorSuspensionLogEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
  }
}
