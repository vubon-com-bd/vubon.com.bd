import { Injectable } from '@nestjs/common';

export interface ClassifyInput {
  readonly message: string;
  readonly context?: Readonly<Record<string, unknown>>;
}

export interface IntentResult {
  readonly intent: string | null;
  readonly confidence: number;
  readonly entities: Readonly<Record<string, string>>;
}

export interface ChatbotProvider {
  detectIntent(input: ClassifyInput): Promise<IntentResult>;
}

@Injectable()
export class CustomProvider implements ChatbotProvider {
  private patterns: Record<string, readonly string[]> = {};

  setPatterns(patterns: Record<string, readonly string[]>): void {
    this.patterns = patterns;
  }

  async detectIntent(input: ClassifyInput): Promise<IntentResult> {
    const normalized = input.message.toLowerCase().trim();
    for (const [intent, keywords] of Object.entries(this.patterns)) {
      if (keywords.some((k) => normalized.includes(k.toLowerCase()))) {
        return { intent, confidence: 1.0, entities: {} };
      }
    }
    return { intent: null, confidence: 0, entities: {} };
  }
}
