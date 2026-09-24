import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';
import { SentimentAnalyzerService } from '../services/internal/sentiment-analyzer.service';

@Injectable()
export class SentimentProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(SentimentProcessorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly sentimentAnalyzer: SentimentAnalyzerService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ text: string }>(
      QUEUE_NAME.ANALYTICS,
      async (payload) => {
        const sentiment = this.sentimentAnalyzer.analyze(payload.text);
        this.logger.debug(`Sentiment: ${sentiment}`);
      },
    );
  }
}
