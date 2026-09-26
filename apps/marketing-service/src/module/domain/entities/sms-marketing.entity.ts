import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { SmsMarketingIdVO } from '../value-objects/primitives/sms-marketing-id.vo';
import { SmsCampaignStatusVO } from '../value-objects/primitives/sms-campaign-status.vo';
import { SmsContentVO } from '../value-objects/primitives/sms-content.vo';
import { SmsCampaignSentEvent } from '../events/sms-marketing.events';

export interface SmsMarketingEntityProps {
  readonly name: string;
  readonly content: SmsContentVO;
  readonly status: SmsCampaignStatusVO;
  readonly scheduledAt: Date | null;
  readonly sentAt: Date | null;
}

export class SmsMarketingEntity extends AggregateRoot<SmsMarketingIdVO> {
  private readonly _name: string;
  private readonly _content: SmsContentVO;
  private readonly _status: SmsCampaignStatusVO;
  private readonly _scheduledAt: Date | null;
  private readonly _sentAt: Date | null;

  private constructor(
    id: SmsMarketingIdVO,
    props: SmsMarketingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._content = props.content;
    this._status = props.status;
    this._scheduledAt = props.scheduledAt;
    this._sentAt = props.sentAt;
  }

  static create(props: SmsMarketingEntityProps): SmsMarketingEntity {
    const now = new Date().toISOString();
    const id = SmsMarketingIdVO.create(crypto.randomUUID());
    return new SmsMarketingEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: SmsMarketingIdVO,
    props: SmsMarketingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): SmsMarketingEntity {
    return new SmsMarketingEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  send(recipientCount: number): SmsMarketingEntity {
    const now = new Date();
    const updated = new SmsMarketingEntity(
      this.id,
      {
        ...this._toProps(),
        status: SmsCampaignStatusVO.create('sent'),
        sentAt: now,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new SmsCampaignSentEvent(this.id.value, recipientCount, this.version + 1),
    );
    return updated;
  }

  get name(): string { return this._name; }
  get content(): SmsContentVO { return this._content; }
  get status(): SmsCampaignStatusVO { return this._status; }
  get scheduledAt(): Date | null { return this._scheduledAt; }
  get sentAt(): Date | null { return this._sentAt; }

  private _toProps(): SmsMarketingEntityProps {
    return {
      name: this._name,
      content: this._content,
      status: this._status,
      scheduledAt: this._scheduledAt,
      sentAt: this._sentAt,
    };
  }
}
