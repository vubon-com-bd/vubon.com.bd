import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ApprovalIdVO } from '../value-objects/primitives/approval-id.vo';
import { ApprovalStatusVO } from '../value-objects/primitives/approval-status.vo';
import { ApprovalReasonVO } from '../value-objects/primitives/approval-reason.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import {
  VendorApprovedEvent,
  VendorRejectedEvent,
} from '../events/vendor-approval.events';

export interface VendorApprovalEntityProps {
  readonly vendorId: VendorIdVO;
  readonly status: ApprovalStatusVO;
  readonly reason: ApprovalReasonVO | null;
  readonly reviewedBy: UserIdVO | null;
  readonly reviewedAt: Date | null;
}

export class VendorApprovalEntity extends AggregateRoot<ApprovalIdVO> {
  private readonly _vendorId: VendorIdVO;
  private readonly _status: ApprovalStatusVO;
  private readonly _reason: ApprovalReasonVO | null;
  private readonly _reviewedBy: UserIdVO | null;
  private readonly _reviewedAt: Date | null;

  private constructor(
    id: ApprovalIdVO,
    props: VendorApprovalEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._status = props.status;
    this._reason = props.reason;
    this._reviewedBy = props.reviewedBy;
    this._reviewedAt = props.reviewedAt;
  }

  static create(props: VendorApprovalEntityProps): VendorApprovalEntity {
    const now = new Date().toISOString();
    const id = ApprovalIdVO.create(crypto.randomUUID());
    return new VendorApprovalEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: ApprovalIdVO,
    props: VendorApprovalEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorApprovalEntity {
    return new VendorApprovalEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  approve(reviewedBy: UserIdVO): VendorApprovalEntity {
    const now = new Date();
    const updated = new VendorApprovalEntity(
      this.id,
      {
        ...this._toProps(),
        status: ApprovalStatusVO.create('approved'),
        reviewedBy,
        reviewedAt: now,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new VendorApprovedEvent(
        this.id.value,
        this.id.value,
        this._vendorId.value,
        reviewedBy.value,
        this.version + 1,
      ),
    );
    return updated;
  }

  reject(reviewedBy: UserIdVO, reason: ApprovalReasonVO): VendorApprovalEntity {
    const now = new Date();
    const updated = new VendorApprovalEntity(
      this.id,
      {
        ...this._toProps(),
        status: ApprovalStatusVO.create('rejected'),
        reason,
        reviewedBy,
        reviewedAt: now,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new VendorRejectedEvent(
        this.id.value,
        this.id.value,
        this._vendorId.value,
        reviewedBy.value,
        reason.value,
        this.version + 1,
      ),
    );
    return updated;
  }

  get vendorId(): VendorIdVO { return this._vendorId; }
  get status(): ApprovalStatusVO { return this._status; }
  get reason(): ApprovalReasonVO | null { return this._reason; }
  get reviewedBy(): UserIdVO | null { return this._reviewedBy; }
  get reviewedAt(): Date | null { return this._reviewedAt; }

  private _toProps(): VendorApprovalEntityProps {
    return {
      vendorId: this._vendorId,
      status: this._status,
      reason: this._reason,
      reviewedBy: this._reviewedBy,
      reviewedAt: this._reviewedAt,
    };
  }
}
