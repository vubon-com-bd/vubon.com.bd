import { Injectable } from '@nestjs/common';
import { HuggingFaceClient } from './huggingface.client';
import { HUGGINGFACE_CONFIG } from './huggingface.config';
import type { EmbedInput, EmbedOutput } from '../base/ml-provider.types';

@Injectable()
export class HuggingFaceEmbeddings {
  constructor(private readonly client: HuggingFaceClient) {}

  async generate(input: EmbedInput): Promise<EmbedOutput> {
    const model = input.model ?? HUGGINGFACE_CONFIG.defaultEmbeddingModel;
    const vectors: number[][] = [];
    for (const text of input.texts) {
      const result = await this.client.raw.featureExtraction({ model, inputs: text });
      vectors.push(Array.isArray(result) ? (result as number[]) : []);
    }
    return {
      vectors,
      dimension: vectors[0]?.length ?? HUGGINGFACE_CONFIG.defaultEmbeddingDimension,
      model,
      tokensUsed: 0,
    };
  }
}
