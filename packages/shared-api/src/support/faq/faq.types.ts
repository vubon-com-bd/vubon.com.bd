export interface FaqEntry {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly category?: string;
  readonly tags?: readonly string[];
  readonly helpfulCount?: number;
  readonly notHelpfulCount?: number;
}

export interface FaqListResponse {
  readonly faqs: readonly FaqEntry[];
  readonly total: number;
}
