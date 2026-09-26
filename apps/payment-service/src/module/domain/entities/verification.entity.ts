import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { VerificationIdVO } from '../value-objects/primitives/verification-id.vo';
import { VerificationStatusVO } from '../value-objects/primitives/verification-status.vo';
import { VerificationMethodVO } from '../value-objects/primitives/verification-method.vo';
import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo';

export interface VerificationEntityProps {
  readonly paymentId: PaymentIdVO;
  readonly status: VerificationStatusVO;
  readonly method: VerificationMethodVO;
  readonly gatewaySignature: string | null;
  readonly verifiedAt: Date | null;
  readonly failureReason: string | null;
}

export class VerificationEntity extends BaseEntity<VerificationIdVO> {
  private readonly _paymentId: PaymentIdVO;
  private readonly _status: VerificationStatusVO;
  private readonly _method: VerificationMethodVO;
  private readonly _gatewaySignature: string | null;
  private readonly _verifiedAt: Date | null;
  private readonly _failureReason: string | null;

  private constructor(
    id: VerificationIdVO,
    props: VerificationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._paymentId = props.paymentId;
    this._status = props.status;
    this._method = props.method;
    this._gatewaySignature = props.gatewaySignature;
    this._verifiedAt = props.verifiedAt;
    this._failureReason = props.failureReason;
  }

  static create(props: VerificationEntityProps): VerificationEntity {
    const now = new Date().toISOString();
    const id = VerificationIdVO.create(crypto.randomUUID());
    return new VerificationEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: VerificationIdVO,
    props: VerificationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VerificationEntity {
    return new VerificationEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markVerified(): VerificationEntity {
    return new VerificationEntity(
      this.id,
      { ...this._toProps(), status: VerificationStatusVO.create('verified'), verifiedAt: new Date() },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  markFailed(reason: string): VerificationEntity {
    return new VerificationEntity(
      this.id,
      { ...this._toProps(), status: VerificationStatusVO.create('failed'), failureReason: reason },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get paymentId(): PaymentIdVO { return this._paymentId; }
  get status(): VerificationStatusVO { return this._status; }
  get method(): VerificationMethodVO { return this._method; }
  get gatewaySignature(): string | null { return this._gatewaySignature; }
  get verifiedAt(): Date | null { return this._verifiedAt; }
  get failureReason(): string | null { return this._failureReason; }

  private _toProps(): VerificationEntityProps {
    return {
      paymentId: this._paymentId,
      status: this._status,
      method: this._method,
      gatewaySignature: this._gatewaySignature,
      verifiedAt: this._verifiedAt,
      failureReason: this._failureReason,
    };
  }
}
