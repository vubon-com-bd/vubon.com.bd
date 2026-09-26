export interface MarketingClient {
  getCampaign(campaignId: string): Promise<{
    readonly campaignId: string;
    readonly name: string;
    readonly spend: number;
    readonly conversions: number;
  } | null>;
}
