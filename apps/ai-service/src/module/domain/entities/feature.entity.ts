import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { FeatureIdVO } from '../value-objects/primitives/feature-id.vo';
import { FeatureNameVO } from '../value-objects/primitives/feature-name.vo';
import { FeatureStatusVO } from '../value-objects/primitives/feature-status.vo';
import { FeatureFlagVO } from '../value-objects/composites/feature-flag.vo';

export interface FeatureEntityProps {
  readonly name: FeatureNameVO;
  readonly status: FeatureStatusVO;
  readonly flag: FeatureFlagVO | null;
}

export class FeatureEntity extends AggregateRoot<FeatureIdVO> {
  private readonly _name: FeatureNameVO;
  private readonly _status: FeatureStatusVO;
  private readonly _flag: FeatureFlagVO | null;

  private constructor(
    id: FeatureIdVO,
    props: FeatureEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._status = props.status;
    this._flag = props.flag;
  }

  static create(props: FeatureEntityProps): FeatureEntity {
    const now = new Date().toISOString();
    const id = FeatureIdVO.create(crypto.randomUUID());
    return new FeatureEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: FeatureIdVO,
    props: FeatureEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): FeatureEntity {
    return new FeatureEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  changeStatus(status: FeatureStatusVO): FeatureEntity {
    return new FeatureEntity(
      this.id,
      { ...this._toProps(), status },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  isActive(): boolean {
    return this._status.isEnabled();
  }

  isEnabledFor(userId: string): boolean {
    return this._flag?.isEnabledFor(userId) ?? false;
  }

  get name(): FeatureNameVO { return this._name; }
  get status(): FeatureStatusVO { return this._status; }
  get flag(): FeatureFlagVO | null { return this._flag; }

  private _toProps(): FeatureEntityProps {
    return {
      name: this._name,
      status: this._status,
      flag: this._flag,
    };
  }
}
