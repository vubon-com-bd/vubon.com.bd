import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { FeatureIdVO } from '../value-objects/primitives/feature-id.vo';
import { FeatureFlagVO } from '../value-objects/composites/feature-flag.vo';

export interface FeatureFlagEntityProps {
  readonly featureId: FeatureIdVO;
  readonly flag: FeatureFlagVO;
}

export class FeatureFlagEntity extends BaseEntity<FeatureIdVO> {
  private readonly _featureId: FeatureIdVO;
  private readonly _flag: FeatureFlagVO;

  private constructor(
    id: FeatureIdVO,
    props: FeatureFlagEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._featureId = props.featureId;
    this._flag = props.flag;
  }

  static create(props: FeatureFlagEntityProps): FeatureFlagEntity {
    const now = new Date().toISOString();
    return new FeatureFlagEntity(props.featureId, props, now, now, null);
  }

  static reconstitute(
    id: FeatureIdVO,
    props: FeatureFlagEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): FeatureFlagEntity {
    return new FeatureFlagEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  setRollout(rolloutPercent: number): FeatureFlagEntity {
    const newFlag = FeatureFlagVO.create({
      featureId: this._flag.featureId,
      enabled: this._flag.enabled,
      rolloutPercent,
      enabledForUsers: this._flag.enabledForUsers,
    });
    return new FeatureFlagEntity(
      this.id,
      { featureId: this._featureId, flag: newFlag },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  addUser(userId: string): FeatureFlagEntity {
    if (this._flag.enabledForUsers.includes(userId)) return this;
    const newFlag = FeatureFlagVO.create({
      featureId: this._flag.featureId,
      enabled: this._flag.enabled,
      rolloutPercent: this._flag.rolloutPercent,
      enabledForUsers: [...this._flag.enabledForUsers, userId],
    });
    return new FeatureFlagEntity(
      this.id,
      { featureId: this._featureId, flag: newFlag },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  removeUser(userId: string): FeatureFlagEntity {
    const newFlag = FeatureFlagVO.create({
      featureId: this._flag.featureId,
      enabled: this._flag.enabled,
      rolloutPercent: this._flag.rolloutPercent,
      enabledForUsers: this._flag.enabledForUsers.filter((u) => u !== userId),
    });
    return new FeatureFlagEntity(
      this.id,
      { featureId: this._featureId, flag: newFlag },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get featureId(): FeatureIdVO { return this._featureId; }
  get flag(): FeatureFlagVO { return this._flag; }

  isEnabledFor(userId: string): boolean {
    return this._flag.isEnabledFor(userId);
  }
}
