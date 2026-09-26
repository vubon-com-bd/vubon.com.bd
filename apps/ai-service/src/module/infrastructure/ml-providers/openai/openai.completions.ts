import { Injectable } from '@nestjs/common';
import { OpenAiClient } from './openai.client';
import { OPENAI_CONFIG } from './openai.config';
import {
  ProviderRateLimitError,
  ProviderAuthError,
  ProviderTimeoutError,
  ProviderUnavailableError,
} from '../base/ml-provider.errors';
import type { CompleteInput, CompleteOutput } from '../base/ml-provider.types';

@Injectable()
export class OpenAiCompletions {
  constructor(private readonly client: OpenAiClient) {}

  async generate(input: CompleteInput): Promise<CompleteOutput> {
    try {
      const response = await this.client.raw.chat.completions.create({
        model: input.model ?? OPENAI_CONFIG.defaultModel,
        messages: [
          ...(input.systemPrompt
            ? [{ role: 'system' as const, content: input.systemPrompt }]
            : []),
          { role: 'user' as const, content: input.prompt },
        ],
        max_tokens: input.maxTokens,
        temperature: input.temperature ?? 0.7,
        stop: input.stopSequences ? [...input.stopSequences] : undefined,
      });

      const choice = response.choices[0];
      return {
        text: choice?.message?.content ?? '',
        tokensUsed: response.usage?.total_tokens ?? 0,
        promptTokens: response.usage?.prompt_tokens ?? 0,
        completionTokens: response.usage?.completion_tokens ?? 0,
        model: response.model,
        finishReason: choice?.finish_reason ?? 'stop',
      };
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        if (error.status === 429) throw new ProviderRateLimitError('openai');
        if (error.status === 401) throw new ProviderAuthError('openai');
        if (error.status === 408) throw new ProviderTimeoutError('openai', OPENAI_CONFIG.timeoutMs);
      }
      throw new ProviderUnavailableError('openai', error instanceof Error ? error.message : String(error));
    }
  }
}

import OpenAI from 'openai';
