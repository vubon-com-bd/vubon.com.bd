import { Injectable } from '@nestjs/common';
import { MlProvidersService } from '../../ml-providers/ml-providers.service';
import type { EmbedOutput } from '../../ml-providers/base/ml-provider.types';

@Injectable()
export class EmbeddingGeneratorService {
  constructor(private readonly providers: MlProvidersService) {}

  async generate(texts: readonly string[], provider = 'openai', model?: string, dimension?: number): Promise<EmbedOutput> {
    const mlProvider = this.providers.get(provider);
    return mlProvider.embed({ texts, model, dimension });
  }

  normalize(vector: readonly number[]): readonly number[] {
    const magnitude = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0));
    if (magnitude === 0) return vector;
    return vector.map((v) => v / magnitude);
  }
}
