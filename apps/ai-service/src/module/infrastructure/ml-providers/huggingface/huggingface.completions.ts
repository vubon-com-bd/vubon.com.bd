import { Injectable } from '@nestjs/common';
import { HuggingFaceClient } from './huggingface.client';
import { HUGGINGFACE_CONFIG } from './huggingface.config';
import { ProviderUnavailableError } from '../base/ml-provider.errors';
import type { CompleteInput, CompleteOutput } from '../base/ml-provider.types';

@Injectable()
export class HuggingFaceCompletions {
  constructor(private readonly client: HuggingFaceClient) {}

  async generate(input: CompleteInput): Promise<CompleteOutput> {
    try {
      const response = await this.client.raw.textGeneration({
        model: input.model ?? HUGGINGFACE_CONFIG.defaultModel,
        inputs: input.prompt,
        parameters: {
          max_new_tokens: input.maxTokens,
          temperature: input.temperature ?? 0.7,
        },
      });
      return {
        text: response.generated_text,
        tokensUsed: 0,
        promptTokens: 0,
        completionTokens: 0,
        model: input.model ?? HUGGINGFACE_CONFIG.defaultModel,
        finishReason: 'stop',
      };
    } catch (error) {
      throw new ProviderUnavailableError(
        'huggingface',
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
