import { Injectable } from '@nestjs/common';
import { MlProviderAbstract } from '../base/ml-provider.abstract';
import { AnthropicCompletions } from './anthropic.completions';
import { ANTHROPIC_CONFIG } from './anthropic.config';
import type { EmbedInput, EmbedOutput, CompleteInput, CompleteOutput } from '../base/ml-provider.types';

@Injectable()
export class AnthropicProvider extends MlProviderAbstract {
  readonly name = 'anthropic';

  constructor(private readonly completions: AnthropicCompletions) {
    super();
  }

  async embed(_input: EmbedInput): Promise<EmbedOutput> {
    throw new ProviderUnavailableError('anthropic', 'embedding not supported');
  }

  async complete(input: CompleteInput): Promise<CompleteOutput> {
    return this.completions.generate(input);
  }

  supports(model: string): boolean {
    return this.defaultModels().includes(model);
  }

  protected defaultModels(): readonly string[] {
    return [
      ANTHROPIC_CONFIG.defaultModel,
      'claude-3-opus-20240229',
      'claude-3-sonnet-20240229',
      'claude-3-haiku-20240307',
    ];
  }
}

import { ProviderUnavailableError } from '../base/ml-provider.errors';
