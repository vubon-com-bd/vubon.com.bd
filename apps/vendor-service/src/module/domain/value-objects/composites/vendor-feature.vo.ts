import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { FeatureIdVO } from '../primitives/feature-id.vo';
import { FeatureTypeVO } from '../primitives/feature-type.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';

export interface VendorFeatureProps {
  readonly id: FeatureIdVO;
  readonly vendorId: VendorIdVO;
  readonly type: FeatureTypeVO;
  readonly enabled: boolean;
  readonly enabledAt: Date | null;
}

export class VendorFeatureVO extends BaseVO<VendorFeatureProps> {
  private constructor(props: VendorFeatureProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: VendorFeatureProps): VendorFeatureVO {
    return new VendorFeatureVO(props);
  }

  get id(): FeatureIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get type(): FeatureTypeVO { return this.value.type; }
  get enabled(): boolean { return this.value.enabled; }
  get enabledAt(): Date | null { return this.value.enabledAt; }
}
