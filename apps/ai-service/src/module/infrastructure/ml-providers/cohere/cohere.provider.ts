import { Injectable } from '@nestjs/common';
import { MlProviderAbstract } from '../base/ml-provider.abstract';
import { CohereClientWrapper } from './cohere.client';
import { COHERE_CONFIG } from './cohere.config';
import { ProviderUnavailableError } from '../base/ml-provider.errors';
import type { EmbedInput, EmbedOutput, CompleteInput, CompleteOutput } from '../base/ml-provider.types';

@Injectable()
export class CohereProvider extends MlProviderAbstract {
  readonly name = 'cohere';

  constructor(private readonly client: CohereClientWrapper) { super(); }

  async embed(input: EmbedInput): Promise<EmbedOutput> {
    const response = await this.client.raw.embed({
      texts: [...input.texts],
      model: input.model ?? COHERE_CONFIG.defaultEmbeddingModel,
      inputType: 'search_document',
    });
    const vectors = response.embeddings as number[][];
    return {
      vectors,
      dimension: vectors[0]?.length ?? COHERE_CONFIG.defaultEmbeddingDimension,
      model: input.model ?? COHERE_CONFIG.defaultEmbeddingModel,
      tokensUsed: 0,
    };
  }

  async complete(input: CompleteInput): Promise<CompleteOutput> {
    try {
      const response = await this.client.raw.chat({
        model: input.model ?? COHERE_CONFIG.defaultModel,
        message: input.prompt,
        preamble: input.systemPrompt,
        temperature: input.temperature ?? 0.7,
        maxTokens: input.maxTokens,
      });
      return {
        text: response.text,
        tokensUsed: 0,
        promptTokens: 0,
        completionTokens: 0,
        model: input.model ?? COHERE_CONFIG.defaultModel,
        finishReason: 'stop',
      };
    } catch (error) {
      throw new ProviderUnavailableError(
        'cohere',
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  supports(model: string): boolean {
    return this.defaultModels().includes(model);
  }

  protected defaultModels(): readonly string[] {
    return [COHERE_CONFIG.defaultModel, 'command-r-plus', 'command'];
  }
}
