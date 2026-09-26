import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { CommandBus } from '@nestjs/cqrs';
import type { SubscriptionJobPayload } from '../queues/subscription.queue';

@Injectable()
export class SubscriptionRenewalWorker implements OnModuleInit {
  private readonly logger = new Logger(SubscriptionRenewalWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly commandBus: CommandBus,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<SubscriptionJobPayload>(
      'subscription',
      async (payload) => {
        this.logger.log(`Renewing subscription ${payload.subscriptionId}`);
        void this.commandBus;
      },
      3,
    );
  }
}
