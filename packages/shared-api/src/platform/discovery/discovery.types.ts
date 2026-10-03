export interface DiscoveryFeedItem {
  readonly id: string;
  readonly type: string;
  readonly title: string;
  readonly imageUrl?: string;
  readonly score: number;
}

export interface DiscoveryFeedResponse {
  readonly items: readonly DiscoveryFeedItem[];
  readonly nextCursor?: string;
}

export interface Recommendation {
  readonly id: string;
  readonly reason: string;
  readonly score: number;
  readonly data?: Record<string, unknown>;
}

export interface TrendingItem {
  readonly id: string;
  readonly title: string;
  readonly trendScore: number;
  readonly rank: number;
}
