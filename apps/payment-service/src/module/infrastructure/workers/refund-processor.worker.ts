import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { CommandBus } from '@nestjs/cqrs';
import type { RefundJobPayload } from '../queues/refund.queue';

@Injectable()
export class RefundProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(RefundProcessorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly commandBus: CommandBus,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<RefundJobPayload>(
      'refund',
      async (payload) => {
        this.logger.log(`Processing refund ${payload.refundId}`);
        void this.commandBus;
      },
      3,
    );
  }
}
