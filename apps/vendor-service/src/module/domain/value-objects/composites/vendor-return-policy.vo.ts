import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';
import { ReturnPolicyTypeVO } from '../primitives/return-policy-type.vo';

export interface VendorReturnPolicyProps {
  readonly vendorId: VendorIdVO;
  readonly type: ReturnPolicyTypeVO;
  readonly returnWindowDays: number;
  readonly conditions: string | null;
}

export class VendorReturnPolicyVO extends BaseVO<VendorReturnPolicyProps> {
  private constructor(props: VendorReturnPolicyProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: VendorReturnPolicyProps): VendorReturnPolicyVO {
    return new VendorReturnPolicyVO(props);
  }

  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get type(): ReturnPolicyTypeVO { return this.value.type; }
  get returnWindowDays(): number { return this.value.returnWindowDays; }
  get conditions(): string | null { return this.value.conditions; }

  get isReturnable(): boolean {
    return this.value.type.value !== 'no_return';
  }
}
