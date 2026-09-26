import { Injectable } from '@nestjs/common';
import { MlProviderAbstract } from '../base/ml-provider.abstract';
import { OpenAiEmbeddings } from './openai.embeddings';
import { OpenAiCompletions } from './openai.completions';
import { OPENAI_CONFIG } from './openai.config';
import type { EmbedInput, EmbedOutput, CompleteInput, CompleteOutput } from '../base/ml-provider.types';

@Injectable()
export class OpenAiProvider extends MlProviderAbstract {
  readonly name = 'openai';

  constructor(
    private readonly embeddings: OpenAiEmbeddings,
    private readonly completions: OpenAiCompletions,
  ) {
    super();
  }

  async embed(input: EmbedInput): Promise<EmbedOutput> {
    return this.embeddings.generate(input);
  }

  async complete(input: CompleteInput): Promise<CompleteOutput> {
    return this.completions.generate(input);
  }

  supports(model: string): boolean {
    return this.defaultModels().includes(model);
  }

  protected defaultModels(): readonly string[] {
    return [
      OPENAI_CONFIG.defaultModel,
      'gpt-4o',
      'gpt-4o-mini',
      'gpt-4-turbo',
      'gpt-3.5-turbo',
    ];
  }
}
