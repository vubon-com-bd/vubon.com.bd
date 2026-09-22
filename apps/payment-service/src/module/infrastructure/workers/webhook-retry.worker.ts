import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { CommandBus } from '@nestjs/cqrs';
import type { WebhookJobPayload } from '../queues/webhook.queue';

@Injectable()
export class WebhookRetryWorker implements OnModuleInit {
  private readonly logger = new Logger(WebhookRetryWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly commandBus: CommandBus,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<WebhookJobPayload>(
      'webhook',
      async (payload) => {
        this.logger.log(`Processing webhook from ${payload.gateway}`);
        void this.commandBus;
      },
      5,
    );
  }
}
