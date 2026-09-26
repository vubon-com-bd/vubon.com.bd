import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { DeliveryIdVO } from '../value-objects/primitives/delivery-id.vo';
import { DeliveryNoteVO } from '../value-objects/primitives/delivery-note.vo';

export interface DeliveryAttemptEntityProps {
  readonly deliveryId: DeliveryIdVO;
  readonly attemptNo: number;
  readonly status: string;
  readonly note: DeliveryNoteVO | null;
  readonly attemptedAt: Date;
}

export class DeliveryAttemptEntity extends BaseEntity<string> {
  private readonly _deliveryId: DeliveryIdVO;
  private readonly _attemptNo: number;
  private readonly _status: string;
  private readonly _note: DeliveryNoteVO | null;
  private readonly _attemptedAt: Date;

  private constructor(
    id: string,
    props: DeliveryAttemptEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._deliveryId = props.deliveryId;
    this._attemptNo = props.attemptNo;
    this._status = props.status;
    this._note = props.note;
    this._attemptedAt = props.attemptedAt;
  }

  static create(props: DeliveryAttemptEntityProps): DeliveryAttemptEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    return new DeliveryAttemptEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: DeliveryAttemptEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): DeliveryAttemptEntity {
    return new DeliveryAttemptEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get deliveryId(): DeliveryIdVO { return this._deliveryId; }
  get attemptNo(): number { return this._attemptNo; }
  get status(): string { return this._status; }
  get note(): DeliveryNoteVO | null { return this._note; }
  get attemptedAt(): Date { return this._attemptedAt; }
}
