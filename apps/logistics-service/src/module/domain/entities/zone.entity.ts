import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ZoneIdVO } from '../value-objects/primitives/zone-id.vo';
import { ZoneNameVO } from '../value-objects/primitives/zone-name.vo';
import { ZoneTypeVO } from '../value-objects/primitives/zone-type.vo';
import { ZoneStatusVO } from '../value-objects/primitives/zone-status.vo';

export interface ZoneEntityProps {
  readonly code: string;
  readonly name: ZoneNameVO;
  readonly type: ZoneTypeVO;
  readonly status: ZoneStatusVO;
  readonly divisions: readonly string[];
  readonly districts: readonly string[];
}

export class ZoneEntity extends AggregateRoot<ZoneIdVO> {
  private readonly _code: string;
  private readonly _name: ZoneNameVO;
  private readonly _type: ZoneTypeVO;
  private readonly _status: ZoneStatusVO;
  private readonly _divisions: readonly string[];
  private readonly _districts: readonly string[];

  private constructor(
    id: ZoneIdVO,
    props: ZoneEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._code = props.code;
    this._name = props.name;
    this._type = props.type;
    this._status = props.status;
    this._divisions = Object.freeze([...props.divisions]);
    this._districts = Object.freeze([...props.districts]);
  }

  static create(props: ZoneEntityProps): ZoneEntity {
    const now = new Date().toISOString();
    const id = ZoneIdVO.create(crypto.randomUUID());
    return new ZoneEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: ZoneIdVO,
    props: ZoneEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ZoneEntity {
    return new ZoneEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  covers(division: string, district: string): boolean {
    if (this._divisions.length > 0 && !this._divisions.includes(division)) {
      return false;
    }
    if (this._districts.length > 0 && !this._districts.includes(district)) {
      return false;
    }
    return true;
  }

  get code(): string { return this._code; }
  get name(): ZoneNameVO { return this._name; }
  get type(): ZoneTypeVO { return this._type; }
  get status(): ZoneStatusVO { return this._status; }
  get divisions(): readonly string[] { return this._divisions; }
  get districts(): readonly string[] { return this._districts; }
}
