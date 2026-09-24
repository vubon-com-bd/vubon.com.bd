import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';
import type { TicketRepository } from '../../domain/repositories/ticket.repository.interface';

@Injectable()
export class EscalationProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(EscalationProcessorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly ticketRepo: TicketRepository,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ ticketId: string }>(
      QUEUE_NAME.NOTIFICATION,
      async (payload) => {
        this.logger.log(`Escalating ticket ${payload.ticketId}`);
        const tickets = await this.ticketRepo.findUnassigned();
        this.logger.debug(`Unassigned tickets: ${tickets.length}`);
      },
    );
  }
}
