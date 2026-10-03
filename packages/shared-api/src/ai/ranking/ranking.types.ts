export interface RankingItem {
  readonly id: string;
  readonly score: number;
  readonly features?: Record<string, number>;
}

export interface RankingRequest {
  readonly items: readonly RankingItem[];
  readonly context?: Record<string, unknown>;
}

export interface RankingResponse {
  readonly ranked: readonly RankingItem[];
  readonly strategy: string;
}
