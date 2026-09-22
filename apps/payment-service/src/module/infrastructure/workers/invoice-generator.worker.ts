import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { CommandBus } from '@nestjs/cqrs';
import type { InvoiceJobPayload } from '../queues/invoice.queue';

@Injectable()
export class InvoiceGeneratorWorker implements OnModuleInit {
  private readonly logger = new Logger(InvoiceGeneratorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly commandBus: CommandBus,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<InvoiceJobPayload>(
      'invoice',
      async (payload) => {
        this.logger.log(`Generating invoice ${payload.number}`);
        void this.commandBus;
      },
      3,
    );
  }
}
