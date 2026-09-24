import { Injectable, Logger } from '@nestjs/common';

export interface DetectIntentResult {
  readonly intent: string | null;
  readonly confidence: number;
}

@Injectable()
export class IntentProvider {
  private readonly logger = new Logger(IntentProvider.name);

  async detect(text: string): Promise<DetectIntentResult> {
    // Real implementation: @google-cloud/dialogflow
    this.logger.debug(`Detecting intent for: ${text.slice(0, 40)}`);
    return { intent: null, confidence: 0 };
  }
}
