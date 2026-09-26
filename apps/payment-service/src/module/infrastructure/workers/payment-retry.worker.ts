import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { CommandBus } from '@nestjs/cqrs';
import type { PaymentJobPayload } from '../queues/payment.queue';

@Injectable()
export class PaymentRetryWorker implements OnModuleInit {
  private readonly logger = new Logger(PaymentRetryWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly commandBus: CommandBus,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<PaymentJobPayload>(
      'payment',
      async (payload) => {
        this.logger.log(`Retrying payment ${payload.paymentId}`);
        void this.commandBus;
      },
      3,
    );
  }
}
