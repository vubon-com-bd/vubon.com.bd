import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { FeatureIdVO } from '../primitives/feature-id.vo';
import { FeatureNameVO } from '../primitives/feature-name.vo';
import { FeatureStatusVO } from '../primitives/feature-status.vo';
import { FeatureFlagVO } from './feature-flag.vo';

export interface FeatureProps {
  readonly id: FeatureIdVO;
  readonly name: FeatureNameVO;
  readonly status: FeatureStatusVO;
  readonly flag: FeatureFlagVO | null;
}

export class FeatureVO extends BaseVO<FeatureProps> {
  static create(props: FeatureProps): FeatureVO {
    return new FeatureVO(props);
  }

  private constructor(props: FeatureProps) {
    super(Object.freeze({ ...props }));
  }

  get id(): FeatureIdVO { return this.value.id; }
  get name(): FeatureNameVO { return this.value.name; }
  get status(): FeatureStatusVO { return this.value.status; }
  get flag(): FeatureFlagVO | null { return this.value.flag; }

  isActive(): boolean {
    return this.value.status.isEnabled();
  }
}
