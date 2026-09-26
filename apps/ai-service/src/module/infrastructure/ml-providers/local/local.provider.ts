import { Injectable } from '@nestjs/common';
import { MlProviderAbstract } from '../base/ml-provider.abstract';
import { LocalClient } from './local.client';
import { LOCAL_CONFIG } from './local.config';
import { ProviderUnavailableError } from '../base/ml-provider.errors';
import type { EmbedInput, EmbedOutput, CompleteInput, CompleteOutput } from '../base/ml-provider.types';

@Injectable()
export class LocalProvider extends MlProviderAbstract {
  readonly name = 'local';

  constructor(private readonly client: LocalClient) { super(); }

  async embed(input: EmbedInput): Promise<EmbedOutput> {
    try {
      const vectors: number[][] = [];
      for (const text of input.texts) {
        const { data } = await this.client.client.post('/api/embeddings', {
          model: input.model ?? LOCAL_CONFIG.defaultEmbeddingModel,
          prompt: text,
        });
        vectors.push(data.embedding as number[]);
      }
      return {
        vectors,
        dimension: vectors[0]?.length ?? LOCAL_CONFIG.defaultEmbeddingDimension,
        model: input.model ?? LOCAL_CONFIG.defaultEmbeddingModel,
        tokensUsed: 0,
      };
    } catch (error) {
      throw new ProviderUnavailableError(
        'local',
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  async complete(input: CompleteInput): Promise<CompleteOutput> {
    try {
      const { data } = await this.client.client.post('/api/generate', {
        model: input.model ?? LOCAL_CONFIG.defaultModel,
        prompt: input.prompt,
        system: input.systemPrompt,
        stream: false,
        options: { temperature: input.temperature ?? 0.7 },
      });
      return {
        text: data.response as string,
        tokensUsed: (data.eval_count as number) ?? 0,
        promptTokens: (data.prompt_eval_count as number) ?? 0,
        completionTokens: (data.eval_count as number) ?? 0,
        model: input.model ?? LOCAL_CONFIG.defaultModel,
        finishReason: 'stop',
      };
    } catch (error) {
      throw new ProviderUnavailableError(
        'local',
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  supports(model: string): boolean {
    return model.length > 0;
  }

  protected defaultModels(): readonly string[] {
    return [LOCAL_CONFIG.defaultModel, LOCAL_CONFIG.defaultEmbeddingModel];
  }
}
