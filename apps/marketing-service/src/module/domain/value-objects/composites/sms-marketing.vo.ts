import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SmsMarketingIdVO } from '../primitives/sms-marketing-id.vo';
import { SmsCampaignStatusVO } from '../primitives/sms-campaign-status.vo';
import { SmsContentVO } from '../primitives/sms-content.vo';

export interface SmsMarketingProps {
  readonly id: SmsMarketingIdVO;
  readonly name: string;
  readonly content: SmsContentVO;
  readonly status: SmsCampaignStatusVO;
  readonly scheduledAt: Date | null;
  readonly sentAt: Date | null;
}

export class SmsMarketingVO extends BaseVO<SmsMarketingProps> {
  private constructor(props: SmsMarketingProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: SmsMarketingProps): SmsMarketingVO {
    return new SmsMarketingVO(props);
  }

  get id(): SmsMarketingIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get content(): SmsContentVO { return this.value.content; }
  get status(): SmsCampaignStatusVO { return this.value.status; }
  get scheduledAt(): Date | null { return this.value.scheduledAt; }
  get sentAt(): Date | null { return this.value.sentAt; }
}
