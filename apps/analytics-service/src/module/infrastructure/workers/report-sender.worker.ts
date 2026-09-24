import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class ReportSenderWorker implements OnModuleInit {
  private readonly logger = new Logger(ReportSenderWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{
      reportId: string;
      recipients: string[];
    }>('analytics:report:send', async (payload) => {
      this.logger.log(
        `Sending report ${payload.reportId} to ${payload.recipients.length} recipients`,
      );
    }, 1);
  }
}
