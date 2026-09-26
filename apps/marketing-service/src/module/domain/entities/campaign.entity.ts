import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { CampaignIdVO } from '../value-objects/primitives/campaign-id.vo';
import { CampaignNameVO } from '../value-objects/primitives/campaign-name.vo';
import { CampaignStatusVO } from '../value-objects/primitives/campaign-status.vo';
import { CampaignTypeVO } from '../value-objects/primitives/campaign-type.vo';
import { CampaignChannelVO } from '../value-objects/primitives/campaign-channel.vo';
import { CampaignGoalVO } from '../value-objects/primitives/campaign-goal.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import {
  CampaignCreatedEvent,
  CampaignLaunchedEvent,
  CampaignCompletedEvent,
} from '../events/campaign.events';

export interface CampaignEntityProps {
  readonly name: CampaignNameVO;
  readonly status: CampaignStatusVO;
  readonly type: CampaignTypeVO;
  readonly channel: CampaignChannelVO;
  readonly goal: CampaignGoalVO | null;
  readonly createdBy: UserIdVO;
  readonly startDate: Date | null;
  readonly endDate: Date | null;
  readonly launchedAt: Date | null;
  readonly completedAt: Date | null;
}

export class CampaignEntity extends AggregateRoot<CampaignIdVO> {
  private readonly _name: CampaignNameVO;
  private readonly _status: CampaignStatusVO;
  private readonly _type: CampaignTypeVO;
  private readonly _channel: CampaignChannelVO;
  private readonly _goal: CampaignGoalVO | null;
  private readonly _createdBy: UserIdVO;
  private readonly _startDate: Date | null;
  private readonly _endDate: Date | null;
  private readonly _launchedAt: Date | null;
  private readonly _completedAt: Date | null;

  private constructor(
    id: CampaignIdVO,
    props: CampaignEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._status = props.status;
    this._type = props.type;
    this._channel = props.channel;
    this._goal = props.goal;
    this._createdBy = props.createdBy;
    this._startDate = props.startDate;
    this._endDate = props.endDate;
    this._launchedAt = props.launchedAt;
    this._completedAt = props.completedAt;
  }

  static create(props: CampaignEntityProps): CampaignEntity {
    const now = new Date().toISOString();
    const id = CampaignIdVO.create(crypto.randomUUID());
    const entity = new CampaignEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new CampaignCreatedEvent(id.value, props.name.value, 0),
    );
    return entity;
  }

  static reconstitute(
    id: CampaignIdVO,
    props: CampaignEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): CampaignEntity {
    return new CampaignEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  launch(): CampaignEntity {
    const now = new Date();
    const updated = new CampaignEntity(
      this.id,
      { ...this._toProps(), status: CampaignStatusVO.create('running'), launchedAt: now },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new CampaignLaunchedEvent(this.id.value, this.version + 1),
    );
    return updated;
  }

  complete(): CampaignEntity {
    const now = new Date();
    const updated = new CampaignEntity(
      this.id,
      { ...this._toProps(), status: CampaignStatusVO.create('completed'), completedAt: now },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new CampaignCompletedEvent(this.id.value, this.version + 1),
    );
    return updated;
  }

  get name(): CampaignNameVO { return this._name; }
  get status(): CampaignStatusVO { return this._status; }
  get type(): CampaignTypeVO { return this._type; }
  get channel(): CampaignChannelVO { return this._channel; }
  get goal(): CampaignGoalVO | null { return this._goal; }
  get createdBy(): UserIdVO { return this._createdBy; }
  get startDate(): Date | null { return this._startDate; }
  get endDate(): Date | null { return this._endDate; }
  get launchedAt(): Date | null { return this._launchedAt; }
  get completedAt(): Date | null { return this._completedAt; }

  private _toProps(): CampaignEntityProps {
    return {
      name: this._name,
      status: this._status,
      type: this._type,
      channel: this._channel,
      goal: this._goal,
      createdBy: this._createdBy,
      startDate: this._startDate,
      endDate: this._endDate,
      launchedAt: this._launchedAt,
      completedAt: this._completedAt,
    };
  }
}
