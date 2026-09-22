import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';
import { WarrantyTypeVO } from '../primitives/warranty-type.vo';

export interface VendorWarrantyProps {
  readonly vendorId: VendorIdVO;
  readonly type: WarrantyTypeVO;
  readonly durationDays: number;
  readonly terms: string | null;
}

export class VendorWarrantyVO extends BaseVO<VendorWarrantyProps> {
  private constructor(props: VendorWarrantyProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: VendorWarrantyProps): VendorWarrantyVO {
    return new VendorWarrantyVO(props);
  }

  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get type(): WarrantyTypeVO { return this.value.type; }
  get durationDays(): number { return this.value.durationDays; }
  get terms(): string | null { return this.value.terms; }

  get hasWarranty(): boolean {
    return this.value.type.value !== 'no_warranty';
  }
}
