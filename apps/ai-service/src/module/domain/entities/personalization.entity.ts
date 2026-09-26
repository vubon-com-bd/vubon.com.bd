import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { PersonalizationIdVO } from '../value-objects/primitives/personalization-id.vo';
import { PersonalizationTypeVO } from '../value-objects/primitives/personalization-type.vo';
import { PersonalizationSignalVO } from '../value-objects/primitives/personalization-signal.vo';
import { PersonalizationStatusVO } from '../value-objects/primitives/personalization-status.vo';
import { PersonalizationProfileVO } from '../value-objects/composites/personalization-profile.vo';

export interface PersonalizationEntityProps {
  readonly type: PersonalizationTypeVO;
  readonly signal: PersonalizationSignalVO;
  readonly status: PersonalizationStatusVO;
  readonly profile: PersonalizationProfileVO;
  readonly confidence: number;
}

export class PersonalizationEntity extends AggregateRoot<PersonalizationIdVO> {
  private readonly _type: PersonalizationTypeVO;
  private readonly _signal: PersonalizationSignalVO;
  private readonly _status: PersonalizationStatusVO;
  private readonly _profile: PersonalizationProfileVO;
  private readonly _confidence: number;

  private constructor(
    id: PersonalizationIdVO,
    props: PersonalizationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._type = props.type;
    this._signal = props.signal;
    this._status = props.status;
    this._profile = props.profile;
    this._confidence = props.confidence;
  }

  static create(props: PersonalizationEntityProps): PersonalizationEntity {
    const now = new Date().toISOString();
    const id = PersonalizationIdVO.create(crypto.randomUUID());
    return new PersonalizationEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: PersonalizationIdVO,
    props: PersonalizationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): PersonalizationEntity {
    return new PersonalizationEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markReady(): PersonalizationEntity {
    return new PersonalizationEntity(
      this.id,
      { ...this._toProps(), status: PersonalizationStatusVO.create('ready') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  isReady(): boolean {
    return this._status.isReady();
  }

  get type(): PersonalizationTypeVO { return this._type; }
  get signal(): PersonalizationSignalVO { return this._signal; }
  get status(): PersonalizationStatusVO { return this._status; }
  get profile(): PersonalizationProfileVO { return this._profile; }
  get confidence(): number { return this._confidence; }

  private _toProps(): PersonalizationEntityProps {
    return {
      type: this._type,
      signal: this._signal,
      status: this._status,
      profile: this._profile,
      confidence: this._confidence,
    };
  }
}
