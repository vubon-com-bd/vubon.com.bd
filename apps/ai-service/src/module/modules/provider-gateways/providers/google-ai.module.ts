import { Module } from '@nestjs/common';
import { GoogleAiClient } from '../../../infrastructure/ml-providers/google-ai/google-ai.client';
import { GoogleAiEmbeddings } from '../../../infrastructure/ml-providers/google-ai/google-ai.embeddings';
import { GoogleAiCompletions } from '../../../infrastructure/ml-providers/google-ai/google-ai.completions';
import { GoogleAiProvider } from '../../../infrastructure/ml-providers/google-ai/google-ai.provider';

@Module({
  providers: [GoogleAiClient, GoogleAiEmbeddings, GoogleAiCompletions, GoogleAiProvider],
  exports: [GoogleAiProvider],
})
export class GoogleAiModule {}
