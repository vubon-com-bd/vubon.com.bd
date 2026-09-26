import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ContactIdVO } from '../primitives/contact-id.vo';
import { ContactTypeVO } from '../primitives/contact-type.vo';
import { ContactValueVO } from '../primitives/contact-value.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';

export interface VendorContactProps {
  readonly id: ContactIdVO;
  readonly vendorId: VendorIdVO;
  readonly contactType: ContactTypeVO;
  readonly contactValue: ContactValueVO;
  readonly isPrimary: boolean;
}

export class VendorContactVO extends BaseVO<VendorContactProps> {
  private constructor(props: VendorContactProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: VendorContactProps): VendorContactVO {
    return new VendorContactVO(props);
  }

  get id(): ContactIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get contactType(): ContactTypeVO { return this.value.contactType; }
  get contactValue(): ContactValueVO { return this.value.contactValue; }
  get isPrimary(): boolean { return this.value.isPrimary; }
}
