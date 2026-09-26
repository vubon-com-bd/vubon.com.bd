import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { MlProviderAbstract } from '../base/ml-provider.abstract';
import { CUSTOM_CONFIG } from './custom.config';
import { ProviderUnavailableError } from '../base/ml-provider.errors';
import type { EmbedInput, EmbedOutput, CompleteInput, CompleteOutput } from '../base/ml-provider.types';

@Injectable()
export class CustomProvider extends MlProviderAbstract {
  readonly name = 'custom';

  async embed(input: EmbedInput): Promise<EmbedOutput> {
    try {
      const { data } = await axios.post(
        `${CUSTOM_CONFIG.baseUrl}/embeddings`,
        { input: [...input.texts], model: input.model ?? CUSTOM_CONFIG.defaultModel },
        {
          headers: { Authorization: `Bearer ${CUSTOM_CONFIG.apiKey}` },
          timeout: CUSTOM_CONFIG.timeoutMs,
        },
      );
      const vectors = (data.data as Array<{ embedding: number[] }>).map((d) => d.embedding);
      return {
        vectors,
        dimension: vectors[0]?.length ?? 0,
        model: input.model ?? CUSTOM_CONFIG.defaultModel,
        tokensUsed: 0,
      };
    } catch (error) {
      throw new ProviderUnavailableError(
        'custom',
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  async complete(input: CompleteInput): Promise<CompleteOutput> {
    try {
      const { data } = await axios.post(
        `${CUSTOM_CONFIG.baseUrl}/chat/completions`,
        {
          model: input.model ?? CUSTOM_CONFIG.defaultModel,
          messages: [
            ...(input.systemPrompt ? [{ role: 'system', content: input.systemPrompt }] : []),
            { role: 'user', content: input.prompt },
          ],
          temperature: input.temperature ?? 0.7,
          max_tokens: input.maxTokens,
        },
        {
          headers: { Authorization: `Bearer ${CUSTOM_CONFIG.apiKey}` },
          timeout: CUSTOM_CONFIG.timeoutMs,
        },
      );
      const choice = (data.choices as Array<{ message: { content: string }; finish_reason: string }>)[0];
      return {
        text: choice.message.content,
        tokensUsed: (data.usage as { total_tokens: number }).total_tokens ?? 0,
        promptTokens: (data.usage as { prompt_tokens: number }).prompt_tokens ?? 0,
        completionTokens: (data.usage as { completion_tokens: number }).completion_tokens ?? 0,
        model: data.model as string,
        finishReason: choice.finish_reason,
      };
    } catch (error) {
      throw new ProviderUnavailableError(
        'custom',
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  supports(model: string): boolean {
    return model.length > 0;
  }

  protected defaultModels(): readonly string[] {
    return [CUSTOM_CONFIG.defaultModel];
  }
}
