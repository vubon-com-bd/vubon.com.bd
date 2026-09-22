import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';
import { VendorNameVO } from '../primitives/vendor-name.vo';
import { RatingValueVO } from '../primitives/rating-value.vo';

export interface VendorProfileProps {
  readonly vendorId: VendorIdVO;
  readonly displayName: VendorNameVO;
  readonly bio: string | null;
  readonly avatarUrl: string | null;
  readonly rating: RatingValueVO;
}

export class VendorProfileVO extends BaseVO<VendorProfileProps> {
  private constructor(props: VendorProfileProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: VendorProfileProps): VendorProfileVO {
    return new VendorProfileVO(props);
  }

  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get displayName(): VendorNameVO { return this.value.displayName; }
  get bio(): string | null { return this.value.bio; }
  get avatarUrl(): string | null { return this.value.avatarUrl; }
  get rating(): RatingValueVO { return this.value.rating; }
}
