import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class EmailSenderWorker implements OnModuleInit {
  private readonly logger = new Logger(EmailSenderWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{
      to: string;
      template: string;
      variables: Record<string, string>;
    }>('marketing-email', async (payload) => {
      this.logger.log(`Sending email to ${payload.to} with template ${payload.template}`);
    });
  }
}
