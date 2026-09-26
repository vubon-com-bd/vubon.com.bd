import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { PreferenceIdVO } from '../value-objects/primitives/preference-id.vo';
import { PreferenceTypeVO } from '../value-objects/primitives/preference-type.vo';
import { PreferenceOptionVO } from '../value-objects/primitives/preference-option.vo';
import { PreferenceValueVO } from '../value-objects/primitives/preference-value.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface PreferenceEntityProps {
  readonly userId: UserIdVO;
  readonly type: PreferenceTypeVO;
  readonly option: PreferenceOptionVO;
  readonly value: PreferenceValueVO;
}

export class PreferenceEntity extends AggregateRoot<PreferenceIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _type: PreferenceTypeVO;
  private readonly _option: PreferenceOptionVO;
  private readonly _value: PreferenceValueVO;

  private constructor(
    id: PreferenceIdVO,
    props: PreferenceEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._type = props.type;
    this._option = props.option;
    this._value = props.value;
  }

  static create(props: PreferenceEntityProps): PreferenceEntity {
    const now = new Date().toISOString();
    const id = PreferenceIdVO.create(crypto.randomUUID());
    return new PreferenceEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: PreferenceIdVO,
    props: PreferenceEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): PreferenceEntity {
    return new PreferenceEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  updateValue(value: PreferenceValueVO): PreferenceEntity {
    return new PreferenceEntity(
      this.id,
      { ...this._toProps(), value },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get type(): PreferenceTypeVO { return this._type; }
  get option(): PreferenceOptionVO { return this._option; }
  get value(): PreferenceValueVO { return this._value; }

  private _toProps(): PreferenceEntityProps {
    return {
      userId: this._userId,
      type: this._type,
      option: this._option,
      value: this._value,
    };
  }
}
