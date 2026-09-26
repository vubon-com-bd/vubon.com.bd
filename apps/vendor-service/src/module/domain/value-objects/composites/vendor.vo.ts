import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';
import { VendorNameVO } from '../primitives/vendor-name.vo';
import { VendorSlugVO } from '../primitives/vendor-slug.vo';
import { VendorStatusVO } from '../primitives/vendor-status.vo';
import { VendorTypeVO } from '../primitives/vendor-type.vo';
import { VendorTierVO } from '../primitives/vendor-tier.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface VendorProps {
  readonly id: VendorIdVO;
  readonly ownerId: UserIdVO;
  readonly name: VendorNameVO;
  readonly slug: VendorSlugVO;
  readonly status: VendorStatusVO;
  readonly type: VendorTypeVO;
  readonly tier: VendorTierVO;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class VendorVO extends BaseVO<VendorProps> {
  private constructor(props: VendorProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: VendorProps): VendorVO {
    return new VendorVO(props);
  }

  get id(): VendorIdVO { return this.value.id; }
  get ownerId(): UserIdVO { return this.value.ownerId; }
  get name(): VendorNameVO { return this.value.name; }
  get slug(): VendorSlugVO { return this.value.slug; }
  get status(): VendorStatusVO { return this.value.status; }
  get type(): VendorTypeVO { return this.value.type; }
  get tier(): VendorTierVO { return this.value.tier; }
}
