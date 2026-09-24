import { Injectable, Logger } from '@nestjs/common';
import type { ChatbotProvider, ClassifyInput, IntentResult } from './custom.provider';

@Injectable()
export class RasaProvider implements ChatbotProvider {
  private readonly logger = new Logger(RasaProvider.name);

  async detectIntent(input: ClassifyInput): Promise<IntentResult> {
    // Real implementation: axios.post(RASA_URL, ...)
    this.logger.debug(`Rasa detect: ${input.message}`);
    return { intent: null, confidence: 0, entities: {} };
  }
}
