import { Injectable, Logger } from '@nestjs/common';
import type { ChatbotProvider, ClassifyInput, IntentResult } from './custom.provider';

@Injectable()
export class DialogflowProvider implements ChatbotProvider {
  private readonly logger = new Logger(DialogflowProvider.name);

  async detectIntent(input: ClassifyInput): Promise<IntentResult> {
    // Real implementation: @google-cloud/dialogflow
    this.logger.debug(`Dialogflow detect: ${input.message}`);
    return { intent: null, confidence: 0, entities: {} };
  }
}
