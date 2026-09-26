import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { EmailMarketingIdVO } from '../primitives/email-marketing-id.vo';
import { EmailCampaignStatusVO } from '../primitives/email-campaign-status.vo';
import { EmailTemplateIdVO } from '../primitives/email-template-id.vo';

export interface EmailCampaignProps {
  readonly id: EmailMarketingIdVO;
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

export class EmailCampaignVO extends BaseVO<EmailCampaignProps> {
  private constructor(props: EmailCampaignProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: EmailCampaignProps): EmailCampaignVO {
    return new EmailCampaignVO(props);
  }

  get id(): EmailMarketingIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get subject(): string { return this.value.subject; }
  get content(): string { return this.value.content; }
  get status(): EmailCampaignStatusVO { return this.value.status; }
  get templateId(): EmailTemplateIdVO | null { return this.value.templateId; }
  get recipientCount(): number { return this.value.recipientCount; }
  get openCount(): number { return this.value.openCount; }
  get clickCount(): number { return this.value.clickCount; }
  get scheduledAt(): Date | null { return this.value.scheduledAt; }
  get sentAt(): Date | null { return this.value.sentAt; }
}
