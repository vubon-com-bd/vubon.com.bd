import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { SuspensionIdVO } from '../value-objects/primitives/suspension-id.vo';
import { SuspensionReasonVO } from '../value-objects/primitives/suspension-reason.vo';
import { SuspensionStatusVO } from '../value-objects/primitives/suspension-status.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import {
  VendorSuspendedEvent,
  VendorReinstatedEvent,
} from '../events/vendor-suspension.events';

export interface VendorSuspensionEntityProps {
  readonly vendorId: VendorIdVO;
  readonly reason: SuspensionReasonVO;
  readonly status: SuspensionStatusVO;
  readonly suspendedBy: UserIdVO;
  readonly suspendedAt: Date;
  readonly reinstatedAt: Date | null;
}

export class VendorSuspensionEntity extends AggregateRoot<SuspensionIdVO> {
  private readonly _vendorId: VendorIdVO;
  private readonly _reason: SuspensionReasonVO;
  private readonly _status: SuspensionStatusVO;
  private readonly _suspendedBy: UserIdVO;
  private readonly _suspendedAt: Date;
  private readonly _reinstatedAt: Date | null;

  private constructor(
    id: SuspensionIdVO,
    props: VendorSuspensionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._reason = props.reason;
    this._status = props.status;
    this._suspendedBy = props.suspendedBy;
    this._suspendedAt = props.suspendedAt;
    this._reinstatedAt = props.reinstatedAt;
  }

  static create(props: VendorSuspensionEntityProps): VendorSuspensionEntity {
    const now = new Date().toISOString();
    const id = SuspensionIdVO.create(crypto.randomUUID());
    const entity = new VendorSuspensionEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new VendorSuspendedEvent(
        id.value,
        id.value,
        props.vendorId.value,
        props.reason.value,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: SuspensionIdVO,
    props: VendorSuspensionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorSuspensionEntity {
    return new VendorSuspensionEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  reinstate(): VendorSuspensionEntity {
    const now = new Date();
    const updated = new VendorSuspensionEntity(
      this.id,
      {
        ...this._toProps(),
        status: SuspensionStatusVO.create('reinstated'),
        reinstatedAt: now,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new VendorReinstatedEvent(this.id.value, this.id.value, this._vendorId.value, this.version + 1),
    );
    return updated;
  }

  get vendorId(): VendorIdVO { return this._vendorId; }
  get reason(): SuspensionReasonVO { return this._reason; }
  get status(): SuspensionStatusVO { return this._status; }
  get suspendedBy(): UserIdVO { return this._suspendedBy; }
  get suspendedAt(): Date { return this._suspendedAt; }
  get reinstatedAt(): Date | null { return this._reinstatedAt; }

  get isActive(): boolean {
    return this._status.value === 'active';
  }

  private _toProps(): VendorSuspensionEntityProps {
    return {
      vendorId: this._vendorId,
      reason: this._reason,
      status: this._status,
      suspendedBy: this._suspendedBy,
      suspendedAt: this._suspendedAt,
      reinstatedAt: this._reinstatedAt,
    };
  }
}
