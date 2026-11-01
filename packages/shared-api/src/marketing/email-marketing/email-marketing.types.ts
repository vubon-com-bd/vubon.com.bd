export interface EmailMarketingCampaign {
  readonly id: string;
  readonly name: string;
  readonly subject: string;
  readonly status: 'draft' | 'scheduled' | 'sent' | 'failed';
  readonly recipientCount: number;
  readonly openRate?: number;
  readonly clickRate?: number;
  readonly sentAt?: string;
}

export interface EmailMarketingListResponse {
  readonly campaigns: readonly EmailMarketingCampaign[];
  readonly total: number;
}

export interface SendEmailMarketingRequest {
  readonly campaignId: string;
  readonly testEmails?: readonly string[];
}
