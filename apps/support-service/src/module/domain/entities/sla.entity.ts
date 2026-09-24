import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { SlaIdVO } from '../value-objects/primitives/sla-id.vo';
import { SlaTypeVO } from '../value-objects/primitives/sla-type.vo';
import { SlaTargetVO } from '../value-objects/primitives/sla-target.vo';
import { SlaStatusVO } from '../value-objects/primitives/sla-status.vo';

export interface SlaEntityProps {
  readonly name: string;
  readonly type: SlaTypeVO;
  readonly target: SlaTargetVO;
  readonly status: SlaStatusVO;
  readonly priority: string;
  readonly businessHoursOnly: boolean;
}

export class SlaEntity extends AggregateRoot<SlaIdVO> {
  private readonly _name: string;
  private readonly _type: SlaTypeVO;
  private readonly _target: SlaTargetVO;
  private readonly _status: SlaStatusVO;
  private readonly _priority: string;
  private readonly _businessHoursOnly: boolean;

  private constructor(
    id: SlaIdVO,
    props: SlaEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._type = props.type;
    this._target = props.target;
    this._status = props.status;
    this._priority = props.priority;
    this._businessHoursOnly = props.businessHoursOnly;
  }

  static create(props: SlaEntityProps): SlaEntity {
    const now = new Date().toISOString();
    const id = SlaIdVO.create(crypto.randomUUID());
    return new SlaEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: SlaIdVO,
    props: SlaEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): SlaEntity {
    return new SlaEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get name(): string { return this._name; }
  get type(): SlaTypeVO { return this._type; }
  get target(): SlaTargetVO { return this._target; }
  get status(): SlaStatusVO { return this._status; }
  get priority(): string { return this._priority; }
  get businessHoursOnly(): boolean { return this._businessHoursOnly; }
}
