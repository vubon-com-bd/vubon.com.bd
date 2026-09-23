export interface AdsCampaignOptions {
  readonly platform: string;
  readonly budget: number;
}

export interface AdsCampaignResult {
  readonly success: boolean;
  readonly campaignId?: string;
}

export interface AdsProvider {
  createCampaign(options: AdsCampaignOptions): Promise<AdsCampaignResult>;
}
