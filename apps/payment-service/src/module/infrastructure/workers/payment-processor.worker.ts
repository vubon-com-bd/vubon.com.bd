import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { CommandBus } from '@nestjs/cqrs';
import { ConfirmPaymentCommand } from '../../application/commands/payment/confirm-payment.command';
import type { PaymentJobPayload } from '../queues/payment.queue';

@Injectable()
export class PaymentProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(PaymentProcessorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly commandBus: CommandBus,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<PaymentJobPayload>(
      'payment',
      async (payload) => {
        this.logger.log(`Processing payment ${payload.paymentId}`);
        try {
          await this.commandBus.execute(
            new ConfirmPaymentCommand(payload.paymentId),
          );
        } catch (error) {
          this.logger.error(`Payment processing failed: ${payload.paymentId}`, error);
          throw error;
        }
      },
      5,
    );
  }
}
