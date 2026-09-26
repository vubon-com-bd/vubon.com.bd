import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { MarketingAutomationIdVO } from '../value-objects/primitives/marketing-automation-id.vo';
import { AutomationTypeVO } from '../value-objects/primitives/automation-type.vo';
import { AutomationTriggerVO } from '../value-objects/primitives/automation-trigger.vo';
import { AutomationTriggeredEvent } from '../events/automation.events';

export interface MarketingAutomationEntityProps {
  readonly name: string;
  readonly type: AutomationTypeVO;
  readonly trigger: AutomationTriggerVO;
  readonly status: string;
  readonly config: Readonly<Record<string, unknown>> | null;
}

export class MarketingAutomationEntity extends AggregateRoot<MarketingAutomationIdVO> {
  private readonly _name: string;
  private readonly _type: AutomationTypeVO;
  private readonly _trigger: AutomationTriggerVO;
  private readonly _status: string;
  private readonly _config: Readonly<Record<string, unknown>> | null;

  private constructor(
    id: MarketingAutomationIdVO,
    props: MarketingAutomationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._type = props.type;
    this._trigger = props.trigger;
    this._status = props.status;
    this._config = props.config;
  }

  static create(props: MarketingAutomationEntityProps): MarketingAutomationEntity {
    const now = new Date().toISOString();
    const id = MarketingAutomationIdVO.create(crypto.randomUUID());
    return new MarketingAutomationEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: MarketingAutomationIdVO,
    props: MarketingAutomationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): MarketingAutomationEntity {
    return new MarketingAutomationEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  trigger_(): MarketingAutomationEntity {
    const now = new Date();
    const updated = new MarketingAutomationEntity(
      this.id,
      this._toProps(),
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new AutomationTriggeredEvent(
        this.id.value,
        this._trigger.value,
        this.version + 1,
      ),
    );
    return updated;
  }

  get name(): string { return this._name; }
  get type(): AutomationTypeVO { return this._type; }
  get trigger(): AutomationTriggerVO { return this._trigger; }
  get status(): string { return this._status; }
  get config(): Readonly<Record<string, unknown>> | null { return this._config; }

  private _toProps(): MarketingAutomationEntityProps {
    return {
      name: this._name,
      type: this._type,
      trigger: this._trigger,
      status: this._status,
      config: this._config,
    };
  }
}
