import { Injectable } from '@nestjs/common';
import { AnthropicClient } from './anthropic.client';
import { ANTHROPIC_CONFIG } from './anthropic.config';
import {
  ProviderRateLimitError,
  ProviderAuthError,
  ProviderUnavailableError,
} from '../base/ml-provider.errors';
import type { CompleteInput, CompleteOutput } from '../base/ml-provider.types';

@Injectable()
export class AnthropicCompletions {
  constructor(private readonly client: AnthropicClient) {}

  async generate(input: CompleteInput): Promise<CompleteOutput> {
    try {
      const response = await this.client.raw.messages.create({
        model: input.model ?? ANTHROPIC_CONFIG.defaultModel,
        max_tokens: input.maxTokens ?? ANTHROPIC_CONFIG.maxTokens,
        temperature: input.temperature ?? 0.7,
        system: input.systemPrompt,
        messages: [{ role: 'user', content: input.prompt }],
        stop_sequences: input.stopSequences ? [...input.stopSequences] : undefined,
      });

      const textBlock = response.content.find((c) => c.type === 'text');
      const text = textBlock && textBlock.type === 'text' ? textBlock.text : '';
      return {
        text,
        tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
        promptTokens: response.usage.input_tokens,
        completionTokens: response.usage.output_tokens,
        model: response.model,
        finishReason: response.stop_reason ?? 'stop',
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('429')) throw new ProviderRateLimitError('anthropic');
        if (error.message.includes('401')) throw new ProviderAuthError('anthropic');
      }
      throw new ProviderUnavailableError('anthropic', error instanceof Error ? error.message : String(error));
    }
  }
}
