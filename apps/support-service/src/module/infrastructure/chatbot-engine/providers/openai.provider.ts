import { Injectable, Logger } from '@nestjs/common';
import type { ChatbotProvider, ClassifyInput, IntentResult } from './custom.provider';

@Injectable()
export class OpenAIProvider implements ChatbotProvider {
  private readonly logger = new Logger(OpenAIProvider.name);

  async detectIntent(input: ClassifyInput): Promise<IntentResult> {
    // Real implementation: openai.chat.completions.create
    this.logger.debug(`OpenAI classify: ${input.message}`);
    return { intent: null, confidence: 0, entities: {} };
  }
}
