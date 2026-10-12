/**
 * Marketing Service Client
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface CampaignDTO {
  readonly id: string;
  readonly name: string;
  readonly source: string;
  readonly medium?: string;
  readonly startAt: string;
  readonly endAt?: string;
  readonly isActive: boolean;
}

@Injectable()
export class MarketingClient {
  private readonly logger = new Logger(MarketingClient.name);
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor() {
    this.baseUrl = getOptionalEnv('MARKETING_SERVICE_URL', 'http://localhost:3011');
    this.timeout = Number(getOptionalEnv('MARKETING_SERVICE_TIMEOUT', '5000'));
  }

  async getCampaign(campaignId: string): Promise<CampaignDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/campaigns/${campaignId}`, {
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP ${res.status}`);
      }
      return (await res.json()) as CampaignDTO;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Campaign fetch failed (${campaignId}): ${msg.slice(0, 100)}`);
      return null;
    }
  }

  async getActiveCampaigns(): Promise<readonly CampaignDTO[]> {
    try {
      const res = await fetch(`${this.baseUrl}/campaigns?active=true`, {
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) return [];
      return (await res.json()) as readonly CampaignDTO[];
    } catch {
      return [];
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/health`, { signal: AbortSignal.timeout(2000) });
      return res.ok;
    } catch {
      return false;
    }
  }
}
