import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { FeatureIdVO } from '../primitives/feature-id.vo';

export interface FeatureFlagProps {
  readonly featureId: FeatureIdVO;
  readonly enabled: boolean;
  readonly rolloutPercent: number;
  readonly enabledForUsers: readonly string[];
}

export class FeatureFlagVO extends BaseVO<FeatureFlagProps> {
  static create(props: FeatureFlagProps): FeatureFlagVO {
    if (props.rolloutPercent < 0 || props.rolloutPercent > 100) {
      throw new Error('FeatureFlag: rolloutPercent must be in [0,100]');
    }
    return new FeatureFlagVO(props);
  }

  private constructor(props: FeatureFlagProps) {
    super(
      Object.freeze({
        ...props,
        enabledForUsers: Object.freeze([...props.enabledForUsers]),
      }),
    );
  }

  get featureId(): FeatureIdVO { return this.value.featureId; }
  get enabled(): boolean { return this.value.enabled; }
  get rolloutPercent(): number { return this.value.rolloutPercent; }
  get enabledForUsers(): readonly string[] { return this.value.enabledForUsers; }

  isEnabledFor(userId: string): boolean {
    if (!this.value.enabled) return false;
    if (this.value.enabledForUsers.includes(userId)) return true;
    if (this.value.rolloutPercent >= 100) return true;
    if (this.value.rolloutPercent === 0) return false;
    const hash = [...userId].reduce((a, c) => a + c.charCodeAt(0), 0);
    return hash % 100 < this.value.rolloutPercent;
  }
}
