import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';

export interface CampaignSummary {
  readonly campaignId: string;
  readonly name: string;
  readonly spend: number;
  readonly conversions: number;
}

@Injectable()
export class MarketingHttpClient {
  private readonly logger = new Logger(MarketingHttpClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    const baseURL =
      process.env.MARKETING_SERVICE_URL ?? 'http://marketing-service:3000';
    this.http = axios.create({
      baseURL,
      timeout: 5000,
      headers: { 'X-Internal-Caller': 'analytics-service' },
    });
  }

  async getCampaign(campaignId: string): Promise<CampaignSummary | null> {
    try {
      const { data } = await this.http.get<CampaignSummary>(
        `/campaigns/${campaignId}`,
      );
      return data;
    } catch (error) {
      this.logger.warn(`Failed to fetch campaign ${campaignId}: ${String(error)}`);
      return null;
    }
  }
}
