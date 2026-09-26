export class TokenCounterService {
  /**
   * Rough token estimation: ~4 chars per token for English,
   * ~1.5 chars per token for Bangla (Unicode-heavy).
   */
  estimate(text: string): number {
    if (!text) return 0;

    const banglaChars = (text.match(/[\u0980-\u09FF]/g) ?? []).length;
    const otherChars = text.length - banglaChars;

    const banglaTokens = Math.ceil(banglaChars / 1.5);
    const otherTokens = Math.ceil(otherChars / 4);

    return banglaTokens + otherTokens;
  }

  /**
   * Estimate cost based on model pricing.
   * pricePerMillionTokens — in USD
   */
  estimateCost(tokens: number, pricePerMillionTokens: number): number {
    return (tokens / 1_000_000) * pricePerMillionTokens;
  }

  /**
   * Check if text fits within token budget.
   */
  fitsInBudget(text: string, maxTokens: number): boolean {
    return this.estimate(text) <= maxTokens;
  }
}
