/**
 * SentimentAnalysisService — Lightweight lexicon-based sentiment
 * @module support-service/domain/services
 */
export type Sentiment = 'positive' | 'neutral' | 'negative';

export interface SentimentResult {
  readonly sentiment: Sentiment;
  readonly score: number; // -1 .. 1
  readonly positiveHits: number;
  readonly negativeHits: number;
}

const POSITIVE_WORDS: readonly string[] = [
  'thanks', 'thank you', 'great', 'excellent', 'awesome', 'good',
  'love', 'happy', 'helpful', 'perfect', 'amazing', 'fast',
];

const NEGATIVE_WORDS: readonly string[] = [
  'bad', 'worst', 'terrible', 'awful', 'poor', 'useless',
  'broken', 'slow', 'angry', 'frustrated', 'disappointed',
  'refund', 'complaint', 'issue', 'problem', 'never',
];

export class SentimentAnalysisService {
  analyze(text: string): SentimentResult {
    if (!text) {
      return { sentiment: 'neutral', score: 0, positiveHits: 0, negativeHits: 0 };
    }
    const lower = text.toLowerCase();
    const positiveHits = POSITIVE_WORDS.reduce(
      (sum, w) => sum + (lower.includes(w) ? 1 : 0),
      0,
    );
    const negativeHits = NEGATIVE_WORDS.reduce(
      (sum, w) => sum + (lower.includes(w) ? 1 : 0),
      0,
    );
    const total = positiveHits + negativeHits;
    const score = total === 0 ? 0 : (positiveHits - negativeHits) / total;
    return {
      sentiment: this.label(score),
      score: Math.round(score * 100) / 100,
      positiveHits,
      negativeHits,
    };
  }

  isNegative(text: string): boolean {
    return this.analyze(text).sentiment === 'negative';
  }

  private label(score: number): Sentiment {
    if (score > 0.15) return 'positive';
    if (score < -0.15) return 'negative';
    return 'neutral';
  }
}
