import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { EmailMarketingIdVO } from '../value-objects/primitives/email-marketing-id.vo';
import { EmailCampaignStatusVO } from '../value-objects/primitives/email-campaign-status.vo';
import { EmailTemplateIdVO } from '../value-objects/primitives/email-template-id.vo';

export interface EmailCampaignEntityProps {
  readonly name: string;
  readonly subject: string;
  readonly content: string;
  readonly status: EmailCampaignStatusVO;
  readonly templateId: EmailTemplateIdVO | null;
  readonly recipientCount: number;
  readonly openCount: number;
  readonly clickCount: number;
  readonly scheduledAt: Date | null;
  readonly sentAt: Date | null;
}

export class EmailCampaignEntity extends AggregateRoot<EmailMarketingIdVO> {
  private readonly _name: string;
  private readonly _subject: string;
  private readonly _content: string;
  private readonly _status: EmailCampaignStatusVO;
  private readonly _templateId: EmailTemplateIdVO | null;
  private readonly _recipientCount: number;
  private readonly _openCount: number;
  private readonly _clickCount: number;
  private readonly _scheduledAt: Date | null;
  private readonly _sentAt: Date | null;

  private constructor(
    id: EmailMarketingIdVO,
    props: EmailCampaignEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._subject = props.subject;
    this._content = props.content;
    this._status = props.status;
    this._templateId = props.templateId;
    this._recipientCount = props.recipientCount;
    this._openCount = props.openCount;
    this._clickCount = props.clickCount;
    this._scheduledAt = props.scheduledAt;
    this._sentAt = props.sentAt;
  }

  static create(props: EmailCampaignEntityProps): EmailCampaignEntity {
    const now = new Date().toISOString();
    const id = EmailMarketingIdVO.create(crypto.randomUUID());
    return new EmailCampaignEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: EmailMarketingIdVO,
    props: EmailCampaignEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): EmailCampaignEntity {
    return new EmailCampaignEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get name(): string { return this._name; }
  get subject(): string { return this._subject; }
  get content(): string { return this._content; }
  get status(): EmailCampaignStatusVO { return this._status; }
  get templateId(): EmailTemplateIdVO | null { return this._templateId; }
  get recipientCount(): number { return this._recipientCount; }
  get openCount(): number { return this._openCount; }
  get clickCount(): number { return this._clickCount; }
  get scheduledAt(): Date | null { return this._scheduledAt; }
  get sentAt(): Date | null { return this._sentAt; }
}
