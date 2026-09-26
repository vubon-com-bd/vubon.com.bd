import { Injectable, Logger } from '@nestjs/common';
import type { AdsProvider, AdsCampaignOptions, AdsCampaignResult } from './ads.interface';

@Injectable()
export class StubAdsProvider implements AdsProvider {
  private readonly logger = new Logger(StubAdsProvider.name);

  async createCampaign(options: AdsCampaignOptions): Promise<AdsCampaignResult> {
    this.logger.log(`[STUB] Create ad campaign on ${options.platform}`);
    return { success: true, campaignId: `stub-${Date.now()}` };
  }
}
