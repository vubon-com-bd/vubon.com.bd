import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { EmailMarketingIdVO } from '../value-objects/primitives/email-marketing-id.vo';
import { EmailCampaignStatusVO } from '../value-objects/primitives/email-campaign-status.vo';
import { EmailTemplateIdVO } from '../value-objects/primitives/email-template-id.vo';
import { EmailCampaignSentEvent } from '../events/email-marketing.events';

export interface EmailMarketingEntityProps {
  readonly name: string;
  readonly subject: string;
  readonly content: string;
  readonly status: EmailCampaignStatusVO;
  readonly templateId: EmailTemplateIdVO | null;
  readonly scheduledAt: Date | null;
  readonly sentAt: Date | null;
}

export class EmailMarketingEntity extends AggregateRoot<EmailMarketingIdVO> {
  private readonly _name: string;
  private readonly _subject: string;
  private readonly _content: string;
  private readonly _status: EmailCampaignStatusVO;
  private readonly _templateId: EmailTemplateIdVO | null;
  private readonly _scheduledAt: Date | null;
  private readonly _sentAt: Date | null;

  private constructor(
    id: EmailMarketingIdVO,
    props: EmailMarketingEntityProps,
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
    this._scheduledAt = props.scheduledAt;
    this._sentAt = props.sentAt;
  }

  static create(props: EmailMarketingEntityProps): EmailMarketingEntity {
    const now = new Date().toISOString();
    const id = EmailMarketingIdVO.create(crypto.randomUUID());
    return new EmailMarketingEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: EmailMarketingIdVO,
    props: EmailMarketingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): EmailMarketingEntity {
    return new EmailMarketingEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  send(recipientCount: number): EmailMarketingEntity {
    const now = new Date();
    const updated = new EmailMarketingEntity(
      this.id,
      {
        ...this._toProps(),
        status: EmailCampaignStatusVO.create('sent'),
        sentAt: now,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new EmailCampaignSentEvent(this.id.value, recipientCount, this.version + 1),
    );
    return updated;
  }

  get name(): string { return this._name; }
  get subject(): string { return this._subject; }
  get content(): string { return this._content; }
  get status(): EmailCampaignStatusVO { return this._status; }
  get templateId(): EmailTemplateIdVO | null { return this._templateId; }
  get scheduledAt(): Date | null { return this._scheduledAt; }
  get sentAt(): Date | null { return this._sentAt; }

  private _toProps(): EmailMarketingEntityProps {
    return {
      name: this._name,
      subject: this._subject,
      content: this._content,
      status: this._status,
      templateId: this._templateId,
      scheduledAt: this._scheduledAt,
      sentAt: this._sentAt,
    };
  }
}
