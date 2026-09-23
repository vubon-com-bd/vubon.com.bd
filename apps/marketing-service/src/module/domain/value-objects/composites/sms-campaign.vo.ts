import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SmsMarketingIdVO } from '../primitives/sms-marketing-id.vo';
import { SmsCampaignStatusVO } from '../primitives/sms-campaign-status.vo';
import { SmsContentVO } from '../primitives/sms-content.vo';

export interface SmsCampaignProps {
  readonly id: SmsMarketingIdVO;
  readonly name: string;
  readonly content: SmsContentVO;
  readonly status: SmsCampaignStatusVO;
  readonly recipientCount: number;
  readonly deliveredCount: number;
  readonly scheduledAt: Date | null;
  readonly sentAt: Date | null;
}

export class SmsCampaignVO extends BaseVO<SmsCampaignProps> {
  private constructor(props: SmsCampaignProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: SmsCampaignProps): SmsCampaignVO {
    return new SmsCampaignVO(props);
  }

  get id(): SmsMarketingIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get content(): SmsContentVO { return this.value.content; }
  get status(): SmsCampaignStatusVO { return this.value.status; }
  get recipientCount(): number { return this.value.recipientCount; }
  get deliveredCount(): number { return this.value.deliveredCount; }
  get scheduledAt(): Date | null { return this.value.scheduledAt; }
  get sentAt(): Date | null { return this.value.sentAt; }
}
