import { Injectable } from '@nestjs/common';
import { GoogleAiClient } from './google-ai.client';
import { GOOGLE_AI_CONFIG } from './google-ai.config';
import { ProviderUnavailableError } from '../base/ml-provider.errors';
import type { CompleteInput, CompleteOutput } from '../base/ml-provider.types';

@Injectable()
export class GoogleAiCompletions {
  constructor(private readonly client: GoogleAiClient) {}

  async generate(input: CompleteInput): Promise<CompleteOutput> {
    try {
      const model = this.client.getModel(input.model);
      const result = await model.generateContent(input.prompt);
      const response = result.response;
      const text = response.text();
      return {
        text,
        tokensUsed: 0,
        promptTokens: 0,
        completionTokens: 0,
        model: input.model ?? GOOGLE_AI_CONFIG.defaultModel,
        finishReason: 'stop',
      };
    } catch (error) {
      throw new ProviderUnavailableError(
        'google-ai',
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
