import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { AutomationIdVO } from '../value-objects/primitives/automation-id.vo';
import { AutomationTypeVO } from '../value-objects/primitives/automation-type.vo';
import { AutomationStatusVO } from '../value-objects/primitives/automation-status.vo';

export interface SupportAutomationEntityProps {
  readonly name: string;
  readonly type: AutomationTypeVO;
  readonly trigger: string;
  readonly action: string;
  readonly status: AutomationStatusVO;
  readonly config: Readonly<Record<string, unknown>> | null;
}

export class SupportAutomationEntity extends AggregateRoot<AutomationIdVO> {
  private readonly _name: string;
  private readonly _type: AutomationTypeVO;
  private readonly _trigger: string;
  private readonly _action: string;
  private readonly _status: AutomationStatusVO;
  private readonly _config: Readonly<Record<string, unknown>> | null;

  private constructor(
    id: AutomationIdVO,
    props: SupportAutomationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._type = props.type;
    this._trigger = props.trigger;
    this._action = props.action;
    this._status = props.status;
    this._config = props.config ? Object.freeze({ ...props.config }) : null;
  }

  static create(props: SupportAutomationEntityProps): SupportAutomationEntity {
    const now = new Date().toISOString();
    const id = AutomationIdVO.create(crypto.randomUUID());
    return new SupportAutomationEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: AutomationIdVO,
    props: SupportAutomationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): SupportAutomationEntity {
    return new SupportAutomationEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get name(): string { return this._name; }
  get type(): AutomationTypeVO { return this._type; }
  get trigger(): string { return this._trigger; }
  get action(): string { return this._action; }
  get status(): AutomationStatusVO { return this._status; }
  get config(): Readonly<Record<string, unknown>> | null { return this._config; }
}
