import { Injectable } from '@nestjs/common';
import { getOptionalEnvInt } from '@vubon/shared-config/common';

@Injectable()
export class TokenCounterService {
  private readonly charsPerTokenEn = getOptionalEnvInt('TOKEN_CHARS_PER_TOKEN_EN', 4);
  private readonly charsPerTokenBn = 1.5;

  estimate(text: string): number {
    if (!text) return 0;
    const banglaChars = (text.match(/[\u0980-\u09FF]/g) ?? []).length;
    const otherChars = text.length - banglaChars;
    return Math.ceil(banglaChars / this.charsPerTokenBn) + Math.ceil(otherChars / this.charsPerTokenEn);
  }

  fitsInBudget(text: string, maxTokens: number): boolean {
    return this.estimate(text) <= maxTokens;
  }

  estimateCost(tokens: number, pricePerMillion: number): number {
    return (tokens / 1_000_000) * pricePerMillion;
  }
}
