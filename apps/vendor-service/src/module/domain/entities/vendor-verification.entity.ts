import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { VerificationIdVO } from '../value-objects/primitives/verification-id.vo';
import { VerificationStatusVO } from '../value-objects/primitives/verification-status.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { VendorDocumentEntity } from './vendor-document.entity';
import {
  VerificationSubmittedEvent,
  VendorVerifiedEvent,
} from '../events/vendor-verification.events';

export interface VendorVerificationEntityProps {
  readonly vendorId: VendorIdVO;
  readonly status: VerificationStatusVO;
  readonly documents: ReadonlyArray<VendorDocumentEntity>;
  readonly submittedAt: Date | null;
  readonly verifiedAt: Date | null;
}

export class VendorVerificationEntity extends AggregateRoot<VerificationIdVO> {
  private readonly _vendorId: VendorIdVO;
  private readonly _status: VerificationStatusVO;
  private readonly _documents: ReadonlyArray<VendorDocumentEntity>;
  private readonly _submittedAt: Date | null;
  private readonly _verifiedAt: Date | null;

  private constructor(
    id: VerificationIdVO,
    props: VendorVerificationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._status = props.status;
    this._documents = Object.freeze([...props.documents]);
    this._submittedAt = props.submittedAt;
    this._verifiedAt = props.verifiedAt;
  }

  static create(props: VendorVerificationEntityProps): VendorVerificationEntity {
    const now = new Date().toISOString();
    const id = VerificationIdVO.create(crypto.randomUUID());
    const entity = new VendorVerificationEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new VerificationSubmittedEvent(
        id.value,
        id.value,
        props.vendorId.value,
        props.documents.length,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: VerificationIdVO,
    props: VendorVerificationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorVerificationEntity {
    return new VendorVerificationEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markVerified(): VendorVerificationEntity {
    const now = new Date();
    const updated = new VendorVerificationEntity(
      this.id,
      {
        ...this._toProps(),
        status: VerificationStatusVO.create('verified'),
        verifiedAt: now,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new VendorVerifiedEvent(this.id.value, this.id.value, this._vendorId.value, this.version + 1),
    );
    return updated;
  }

  get vendorId(): VendorIdVO { return this._vendorId; }
  get status(): VerificationStatusVO { return this._status; }
  get documents(): ReadonlyArray<VendorDocumentEntity> { return this._documents; }
  get submittedAt(): Date | null { return this._submittedAt; }
  get verifiedAt(): Date | null { return this._verifiedAt; }

  private _toProps(): VendorVerificationEntityProps {
    return {
      vendorId: this._vendorId,
      status: this._status,
      documents: this._documents,
      submittedAt: this._submittedAt,
      verifiedAt: this._verifiedAt,
    };
  }
}
