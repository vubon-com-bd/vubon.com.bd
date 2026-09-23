import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { SmsMarketingIdVO } from '../value-objects/primitives/sms-marketing-id.vo';
import { SmsCampaignStatusVO } from '../value-objects/primitives/sms-campaign-status.vo';
import { SmsContentVO } from '../value-objects/primitives/sms-content.vo';

export interface SmsCampaignEntityProps {
  readonly name: string;
  readonly content: SmsContentVO;
  readonly status: SmsCampaignStatusVO;
  readonly recipientCount: number;
  readonly deliveredCount: number;
  readonly scheduledAt: Date | null;
  readonly sentAt: Date | null;
}

export class SmsCampaignEntity extends AggregateRoot<SmsMarketingIdVO> {
  private readonly _name: string;
  private readonly _content: SmsContentVO;
  private readonly _status: SmsCampaignStatusVO;
  private readonly _recipientCount: number;
  private readonly _deliveredCount: number;
  private readonly _scheduledAt: Date | null;
  private readonly _sentAt: Date | null;

  private constructor(
    id: SmsMarketingIdVO,
    props: SmsCampaignEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._content = props.content;
    this._status = props.status;
    this._recipientCount = props.recipientCount;
    this._deliveredCount = props.deliveredCount;
    this._scheduledAt = props.scheduledAt;
    this._sentAt = props.sentAt;
  }

  static create(props: SmsCampaignEntityProps): SmsCampaignEntity {
    const now = new Date().toISOString();
    const id = SmsMarketingIdVO.create(crypto.randomUUID());
    return new SmsCampaignEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: SmsMarketingIdVO,
    props: SmsCampaignEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): SmsCampaignEntity {
    return new SmsCampaignEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get name(): string { return this._name; }
  get content(): SmsContentVO { return this._content; }
  get status(): SmsCampaignStatusVO { return this._status; }
  get recipientCount(): number { return this._recipientCount; }
  get deliveredCount(): number { return this._deliveredCount; }
  get scheduledAt(): Date | null { return this._scheduledAt; }
  get sentAt(): Date | null { return this._sentAt; }
}
