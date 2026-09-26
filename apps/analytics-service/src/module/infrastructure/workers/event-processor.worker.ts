import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { WORKER_CONFIG } from '../config/worker.config';
import { EventProcessorService } from '../services/internal/event-processor.service';

@Injectable()
export class EventProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(EventProcessorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly processor: EventProcessorService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{
      name: string;
      source: string;
      timestamp: string;
      payload: Record<string, unknown>;
      userId?: string;
      sessionId?: string;
    }>(
      'analytics:event',
      async (payload) => {
        this.logger.debug(`Processing event: ${payload.name}`);
        const raw = {
          ...payload,
          timestamp: new Date(payload.timestamp),
        };
        return this.processor.process(raw);
      },
      WORKER_CONFIG.eventProcessorConcurrency,
    );
  }
}
