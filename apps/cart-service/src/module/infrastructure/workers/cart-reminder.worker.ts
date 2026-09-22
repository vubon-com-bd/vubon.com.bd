import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { REMINDER_QUEUE, type ReminderJobPayload } from '../queues/reminder.queue';
import { EmailService } from '../external/email/email.service';

@Injectable()
export class CartReminderWorker implements OnModuleInit {
  private readonly logger = new Logger(CartReminderWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly email: EmailService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<ReminderJobPayload>(
      REMINDER_QUEUE,
      async (payload) => {
        this.logger.log(
          `Sending reminder [${payload.stage}] for cart ${payload.cartId}`,
        );
        void this.email;
      },
      5,
    );
  }
}
