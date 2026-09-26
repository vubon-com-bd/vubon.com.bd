import { Module } from '@nestjs/common';
import { OpenAiClient } from '../../../infrastructure/ml-providers/openai/openai.client';
import { OpenAiEmbeddings } from '../../../infrastructure/ml-providers/openai/openai.embeddings';
import { OpenAiCompletions } from '../../../infrastructure/ml-providers/openai/openai.completions';
import { OpenAiProvider } from '../../../infrastructure/ml-providers/openai/openai.provider';

@Module({
  providers: [OpenAiClient, OpenAiEmbeddings, OpenAiCompletions, OpenAiProvider],
  exports: [OpenAiProvider],
})
export class OpenAiModule {}
