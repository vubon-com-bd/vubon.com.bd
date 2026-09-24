export type Sentiment = 'positive' | 'neutral' | 'negative';

export class SentimentAnalysisService {
  analyze(text: string): Sentiment {
    const normalized = text.toLowerCase();
    const negative = ['angry', 'bad', 'worst', 'hate', 'terrible', 'awful', 'রাগ', 'খারাপ'];
    const positive = ['good', 'great', 'thanks', 'love', 'excellent', 'ধন্যবাদ', 'ভালো'];
    const negCount = negative.filter((w) => normalized.includes(w)).length;
    const posCount = positive.filter((w) => normalized.includes(w)).length;
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
