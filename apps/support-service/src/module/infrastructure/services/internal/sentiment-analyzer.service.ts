import { Injectable } from '@nestjs/common';

export type SentimentValue = 'positive' | 'neutral' | 'negative';

@Injectable()
export class SentimentAnalyzerService {
  private readonly positive = ['good', 'great', 'thanks', 'love', 'excellent', 'ধন্যবাদ', 'ভালো'];
  private readonly negative = ['angry', 'bad', 'worst', 'hate', 'terrible', 'awful', 'রাগ', 'খারাপ'];

  analyze(text: string): SentimentValue {
    const normalized = text.toLowerCase();
    const posCount = this.positive.filter((w) => normalized.includes(w)).length;
    const negCount = this.negative.filter((w) => normalized.includes(w)).length;

    if (negCount > posCount) return 'negative';
    if (posCount > negCount) return 'positive';
    return 'neutral';
  }

  score(text: string): number {
    const s = this.analyze(text);
    if (s === 'positive') return 1;
    if (s === 'negative') return -1;
    return 0;
  }
}
