import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { SentimentProvider } from './sentiment.provider';
import { IntentProvider } from './intent.provider';
import { EmbeddingProvider } from './embedding.provider';

@Module({
  providers: [AiService, SentimentProvider, IntentProvider, EmbeddingProvider],
  exports: [AiService, SentimentProvider, IntentProvider, EmbeddingProvider],
})
export class AiModule {}
