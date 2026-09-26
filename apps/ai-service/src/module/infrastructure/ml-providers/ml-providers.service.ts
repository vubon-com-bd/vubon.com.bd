import { Injectable } from '@nestjs/common';
import type { MlProviderInterface } from './base/ml-provider.interface';
import { OpenAiProvider } from './openai/openai.provider';
import { AnthropicProvider } from './anthropic/anthropic.provider';
import { GoogleAiProvider } from './google-ai/google-ai.provider';
import { HuggingFaceProvider } from './huggingface/huggingface.provider';
import { CohereProvider } from './cohere/cohere.provider';
import { LocalProvider } from './local/local.provider';
import { CustomProvider } from './custom/custom.provider';

@Injectable()
export class MlProvidersService {
  private readonly providers: ReadonlyMap<string, MlProviderInterface>;

  constructor(
    openai: OpenAiProvider,
    anthropic: AnthropicProvider,
    googleAi: GoogleAiProvider,
    huggingface: HuggingFaceProvider,
    cohere: CohereProvider,
    local: LocalProvider,
    custom: CustomProvider,
  ) {
    this.providers = new Map<string, MlProviderInterface>([
      ['openai', openai],
      ['anthropic', anthropic],
      ['google-ai', googleAi],
      ['huggingface', huggingface],
      ['cohere', cohere],
      ['local', local],
      ['custom', custom],
    ]);
  }

  get(name: string): MlProviderInterface {
    const provider = this.providers.get(name);
    if (!provider) throw new Error(`Unknown ML provider: ${name}`);
    return provider;
  }

  list(): readonly string[] {
    return [...this.providers.keys()];
  }

  findByModel(model: string): MlProviderInterface | null {
    for (const provider of this.providers.values()) {
      if (provider.supports(model)) return provider;
    }
    return null;
  }
}
