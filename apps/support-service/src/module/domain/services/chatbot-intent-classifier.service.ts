/**
 * ChatbotIntentClassifierService — Match user text to intents
 * @module support-service/domain/services
 */
import { ChatbotIntentEntity } from '../entities/chatbot-intent.entity';

export interface ClassifiedIntent {
  readonly intent: ChatbotIntentEntity;
  readonly confidence: number;
  readonly matchedText: string;
}

export interface ClassificationResult {
  readonly best: ClassifiedIntent | null;
  readonly alternatives: readonly ClassifiedIntent[];
}

export class ChatbotIntentClassifierService {
  classify(
    text: string,
    intents: readonly ChatbotIntentEntity[],
  ): ClassificationResult {
    if (!text || intents.length === 0) {
      return { best: null, alternatives: [] };
    }
    const lower = text.toLowerCase().trim();
    const matches: ClassifiedIntent[] = [];

    for (const intent of intents) {
      let maxLen = 0;
      let matchedText = '';
      for (const pattern of intent.patterns) {
        if (lower.includes(pattern) && pattern.length > maxLen) {
          maxLen = pattern.length;
          matchedText = pattern;
        }
      }
      if (maxLen > 0) {
        const confidence = this.score(maxLen, lower.length);
        matches.push({ intent, confidence, matchedText });
      }
    }

    matches.sort((a, b) => {
      if (b.confidence !== a.confidence) return b.confidence - a.confidence;
      return b.intent.priority - a.intent.priority;
    });

    return {
      best: matches[0] ?? null,
      alternatives: matches.slice(1),
    };
  }

  private score(matchLen: number, textLen: number): number {
    const ratio = matchLen / Math.max(textLen, 1);
    return Math.min(1, Math.round(ratio * 100) / 100);
  }
}
