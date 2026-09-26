import { Injectable } from '@nestjs/common';
import { MlProviderAbstract } from '../base/ml-provider.abstract';
import { GoogleAiEmbeddings } from './google-ai.embeddings';
import { GoogleAiCompletions } from './google-ai.completions';
import { GOOGLE_AI_CONFIG } from './google-ai.config';
import type { EmbedInput, EmbedOutput, CompleteInput, CompleteOutput } from '../base/ml-provider.types';

@Injectable()
export class GoogleAiProvider extends MlProviderAbstract {
  readonly name = 'google-ai';

  constructor(
    private readonly embeddings: GoogleAiEmbeddings,
    private readonly completions: GoogleAiCompletions,
  ) { super(); }

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
    return [GOOGLE_AI_CONFIG.defaultModel, 'gemini-1.5-pro', 'gemini-1.0-pro'];
  }
}
