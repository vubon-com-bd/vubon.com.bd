import { Module } from '@nestjs/common';
import { GoogleAiClient } from './google-ai.client';
import { GoogleAiEmbeddings } from './google-ai.embeddings';
import { GoogleAiCompletions } from './google-ai.completions';
import { GoogleAiProvider } from './google-ai.provider';

@Module({
  providers: [GoogleAiClient, GoogleAiEmbeddings, GoogleAiCompletions, GoogleAiProvider],
  exports: [GoogleAiProvider],
})
export class GoogleAiModule {}
