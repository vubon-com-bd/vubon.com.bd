import { Module } from '@nestjs/common';
import { OpenAiModule } from './openai/openai.module';
import { AnthropicModule } from './anthropic/anthropic.module';
import { GoogleAiModule } from './google-ai/google-ai.module';
import { HuggingFaceModule } from './huggingface/huggingface.module';
import { CohereModule } from './cohere/cohere.module';
import { LocalModule } from './local/local.module';
import { CustomModule } from './custom/custom.module';

@Module({
  imports: [
    OpenAiModule,
    AnthropicModule,
    GoogleAiModule,
    HuggingFaceModule,
    CohereModule,
    LocalModule,
    CustomModule,
  ],
  exports: [
    OpenAiModule,
    AnthropicModule,
    GoogleAiModule,
    HuggingFaceModule,
    CohereModule,
    LocalModule,
    CustomModule,
  ],
})
export class MlProvidersModule {}
