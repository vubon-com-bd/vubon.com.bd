import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { EmailMarketingIdVO } from '../primitives/email-marketing-id.vo';
import { EmailCampaignStatusVO } from '../primitives/email-campaign-status.vo';
import { EmailTemplateIdVO } from '../primitives/email-template-id.vo';

export interface EmailMarketingProps {
  readonly id: EmailMarketingIdVO;
  readonly name: string;
  readonly subject: string;
  readonly content: string;
  readonly status: EmailCampaignStatusVO;
  readonly templateId: EmailTemplateIdVO | null;
  readonly scheduledAt: Date | null;
  readonly sentAt: Date | null;
}

export class EmailMarketingVO extends BaseVO<EmailMarketingProps> {
  private constructor(props: EmailMarketingProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: EmailMarketingProps): EmailMarketingVO {
    return new EmailMarketingVO(props);
  }

  get id(): EmailMarketingIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get subject(): string { return this.value.subject; }
  get content(): string { return this.value.content; }
  get status(): EmailCampaignStatusVO { return this.value.status; }
  get templateId(): EmailTemplateIdVO | null { return this.value.templateId; }
  get scheduledAt(): Date | null { return this.value.scheduledAt; }
  get sentAt(): Date | null { return this.value.sentAt; }
}
