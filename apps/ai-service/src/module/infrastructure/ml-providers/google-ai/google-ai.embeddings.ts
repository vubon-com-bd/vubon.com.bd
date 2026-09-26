import { Injectable } from '@nestjs/common';
import { GoogleAiClient } from './google-ai.client';
import { GOOGLE_AI_CONFIG } from './google-ai.config';
import type { EmbedInput, EmbedOutput } from '../base/ml-provider.types';

@Injectable()
export class GoogleAiEmbeddings {
  constructor(private readonly client: GoogleAiClient) {}

  async generate(input: EmbedInput): Promise<EmbedOutput> {
    const model = this.client.getModel(
      input.model ?? GOOGLE_AI_CONFIG.defaultEmbeddingModel,
    );
    const response = await model.embedContent([...input.texts]);
    const vectors = [response.embedding.values];
    return {
      vectors,
      dimension: vectors[0].length,
      model: input.model ?? GOOGLE_AI_CONFIG.defaultEmbeddingModel,
      tokensUsed: 0,
    };
  }
}
