import { Injectable } from '@nestjs/common';
import { OpenAiClient } from './openai.client';
import { OPENAI_CONFIG } from './openai.config';
import type { EmbedInput, EmbedOutput } from '../base/ml-provider.types';

@Injectable()
export class OpenAiEmbeddings {
  constructor(private readonly client: OpenAiClient) {}

  async generate(input: EmbedInput): Promise<EmbedOutput> {
    const model = input.model ?? OPENAI_CONFIG.defaultEmbeddingModel;
    const response = await this.client.raw.embeddings.create({
      model,
      input: [...input.texts],
      dimensions: input.dimension,
    });
    const vectors = response.data.map((d) => d.embedding);
    return {
      vectors,
      dimension: vectors[0]?.length ?? input.dimension ?? OPENAI_CONFIG.defaultEmbeddingDimension,
      model,
      tokensUsed: response.usage?.total_tokens ?? 0,
    };
  }
}
