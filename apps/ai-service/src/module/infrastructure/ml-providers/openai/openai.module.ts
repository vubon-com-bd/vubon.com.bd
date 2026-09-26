import { Module } from '@nestjs/common';
import { OpenAiClient } from './openai.client';
import { OpenAiEmbeddings } from './openai.embeddings';
import { OpenAiCompletions } from './openai.completions';
import { OpenAiProvider } from './openai.provider';

@Module({
  providers: [OpenAiClient, OpenAiEmbeddings, OpenAiCompletions, OpenAiProvider],
  exports: [OpenAiProvider],
})
export class OpenAiModule {}
