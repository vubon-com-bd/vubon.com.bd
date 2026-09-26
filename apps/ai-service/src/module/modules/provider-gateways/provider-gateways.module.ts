import { Global, Module } from '@nestjs/common';
import { OpenAiModule } from './providers/openai.module';
import { AnthropicModule } from './providers/anthropic.module';
import { GoogleAiModule } from './providers/google-ai.module';
import { HuggingFaceModule } from './providers/huggingface.module';
import { CohereModule } from './providers/cohere.module';
import { LocalModule } from './providers/local.module';
import { MlProvidersService } from '../../infrastructure/ml-providers/ml-providers.service';
import { OpenAiProvider } from '../../infrastructure/ml-providers/openai/openai.provider';
import { AnthropicProvider } from '../../infrastructure/ml-providers/anthropic/anthropic.provider';
import { GoogleAiProvider } from '../../infrastructure/ml-providers/google-ai/google-ai.provider';
import { HuggingFaceProvider } from '../../infrastructure/ml-providers/huggingface/huggingface.provider';
import { CohereProvider } from '../../infrastructure/ml-providers/cohere/cohere.provider';
import { LocalProvider } from '../../infrastructure/ml-providers/local/local.provider';
import { CustomProvider } from '../../infrastructure/ml-providers/custom/custom.provider';

@Global()
@Module({
  imports: [
    OpenAiModule,
    AnthropicModule,
    GoogleAiModule,
    HuggingFaceModule,
    CohereModule,
    LocalModule,
  ],
  providers: [
    CustomProvider,
    MlProvidersService,
    {
      provide: 'MlProviderNames',
      useValue: ['openai', 'anthropic', 'google-ai', 'huggingface', 'cohere', 'local', 'custom'],
    },
  ],
  exports: [
    OpenAiModule,
    AnthropicModule,
    GoogleAiModule,
    HuggingFaceModule,
    CohereModule,
    LocalModule,
    CustomProvider,
    MlProvidersService,
  ],
})
export class ProviderGatewaysModule {
  static forRoot() {
    return {
      module: ProviderGatewaysModule,
      global: true,
    };
  }

  constructor(
    _openai: OpenAiProvider,
    _anthropic: AnthropicProvider,
    _googleAi: GoogleAiProvider,
    _hf: HuggingFaceProvider,
    _cohere: CohereProvider,
    _local: LocalProvider,
    _providers: MlProvidersService,
  ) {}
}
