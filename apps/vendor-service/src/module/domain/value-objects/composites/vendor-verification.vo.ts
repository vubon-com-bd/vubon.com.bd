import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VerificationIdVO } from '../primitives/verification-id.vo';
import { VerificationStatusVO } from '../primitives/verification-status.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';
import { VendorDocumentVO } from './vendor-document.vo';

export interface VendorVerificationProps {
  readonly id: VerificationIdVO;
  readonly vendorId: VendorIdVO;
  readonly status: VerificationStatusVO;
  readonly documents: ReadonlyArray<VendorDocumentVO>;
  readonly submittedAt: Date | null;
  readonly verifiedAt: Date | null;
}

export class VendorVerificationVO extends BaseVO<VendorVerificationProps> {
  private constructor(props: VendorVerificationProps) {
    super(Object.freeze({
      ...props,
      documents: Object.freeze([...props.documents]),
    }));
  }

  static create(props: VendorVerificationProps): VendorVerificationVO {
    return new VendorVerificationVO(props);
  }

  get id(): VerificationIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get status(): VerificationStatusVO { return this.value.status; }
  get documents(): ReadonlyArray<VendorDocumentVO> { return this.value.documents; }
  get submittedAt(): Date | null { return this.value.submittedAt; }
  get verifiedAt(): Date | null { return this.value.verifiedAt; }
}
