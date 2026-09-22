import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VerificationIdVO } from '../primitives/verification-id.vo';
import { VerificationStatusVO } from '../primitives/verification-status.vo';
import { VerificationMethodVO } from '../primitives/verification-method.vo';
import { PaymentIdVO } from '../primitives/payment-id.vo';

export interface VerificationVOProps {
  readonly id: VerificationIdVO;
  readonly paymentId: PaymentIdVO;
  readonly status: VerificationStatusVO;
  readonly method: VerificationMethodVO;
  readonly verifiedAt: Date | null;
}

export class VerificationVO extends BaseVO<VerificationVOProps> {
  private constructor(props: VerificationVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: VerificationVOProps): VerificationVO {
    return new VerificationVO(props);
  }

  get id(): VerificationIdVO { return this.value.id; }
  get paymentId(): PaymentIdVO { return this.value.paymentId; }
  get status(): VerificationStatusVO { return this.value.status; }
  get method(): VerificationMethodVO { return this.value.method; }
  get verifiedAt(): Date | null { return this.value.verifiedAt; }
}
