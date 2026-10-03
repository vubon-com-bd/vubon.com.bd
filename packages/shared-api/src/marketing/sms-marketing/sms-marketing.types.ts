export interface SmsMarketingCampaign {
  readonly id: string;
  readonly name: string;
  readonly message: string;
  readonly status: 'draft' | 'scheduled' | 'sent' | 'failed';
  readonly recipientCount: number;
  readonly sentAt?: string;
}

export interface SmsMarketingListResponse {
  readonly campaigns: readonly SmsMarketingCampaign[];
  readonly total: number;
}

export interface SendSmsMarketingRequest {
  readonly campaignId: string;
  readonly testNumbers?: readonly string[];
}
