import { Injectable } from '@nestjs/common';
import { MlProviderAbstract } from '../base/ml-provider.abstract';
import { HuggingFaceEmbeddings } from './huggingface.embeddings';
import { HuggingFaceCompletions } from './huggingface.completions';
import { HUGGINGFACE_CONFIG } from './huggingface.config';
import type { EmbedInput, EmbedOutput, CompleteInput, CompleteOutput } from '../base/ml-provider.types';

@Injectable()
export class HuggingFaceProvider extends MlProviderAbstract {
  readonly name = 'huggingface';

  constructor(
    private readonly embeddings: HuggingFaceEmbeddings,
    private readonly completions: HuggingFaceCompletions,
  ) { super(); }

  async embed(input: EmbedInput): Promise<EmbedOutput> {
    return this.embeddings.generate(input);
  }

  async complete(input: CompleteInput): Promise<CompleteOutput> {
    return this.completions.generate(input);
  }

  supports(model: string): boolean {
    return model.length > 0;
  }

  protected defaultModels(): readonly string[] {
    return [HUGGINGFACE_CONFIG.defaultModel, HUGGINGFACE_CONFIG.defaultEmbeddingModel];
  }
}
