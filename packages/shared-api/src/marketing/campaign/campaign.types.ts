export type CampaignStatus = 'draft' | 'scheduled' | 'active' | 'paused' | 'ended';
export type CampaignChannel = 'email' | 'sms' | 'push' | 'in_app' | 'multi';

export interface Campaign {
  readonly id: string;
  readonly name: string;
  readonly status: CampaignStatus;
  readonly channel: CampaignChannel;
  readonly startsAt: string;
  readonly endsAt?: string;
  readonly audienceSize?: number;
  readonly createdAt: string;
}

export interface CreateCampaignRequest {
  readonly name: string;
  readonly channel: CampaignChannel;
  readonly startsAt: string;
  readonly endsAt?: string;
  readonly audienceFilter?: Record<string, unknown>;
  readonly content?: Record<string, unknown>;
}

export interface CampaignListResponse {
  readonly campaigns: readonly Campaign[];
  readonly total: number;
}
