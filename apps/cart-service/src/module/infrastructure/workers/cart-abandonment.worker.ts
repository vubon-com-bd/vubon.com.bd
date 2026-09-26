import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { CommandBus } from '@nestjs/cqrs';
import { ABANDONMENT_QUEUE, type AbandonmentJobPayload } from '../queues/abandonment.queue';
import { ABANDONMENT_CONFIG } from '../config/abandonment.config';

@Injectable()
export class CartAbandonmentWorker implements OnModuleInit {
  private readonly logger = new Logger(CartAbandonmentWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly commandBus: CommandBus,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<AbandonmentJobPayload>(
      ABANDONMENT_QUEUE,
      async (payload) => {
        this.logger.log(`Detecting abandonment for cart ${payload.cartId}`);
        void this.commandBus;
        void ABANDONMENT_CONFIG.idleThresholdHours;
      },
      3,
    );
  }
}
