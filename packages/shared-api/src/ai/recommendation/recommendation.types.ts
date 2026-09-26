export interface AiRecommendationItem {
  readonly id: string;
  readonly type: string;
  readonly score: number;
  readonly reason?: string;
  readonly data?: Record<string, unknown>;
}

export interface AiRecommendationResponse {
  readonly items: readonly AiRecommendationItem[];
  readonly strategy: string;
  readonly generatedAt: string;
}
