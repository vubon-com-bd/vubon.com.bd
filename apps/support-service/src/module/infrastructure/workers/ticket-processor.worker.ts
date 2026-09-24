import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';
import type { TicketRepository } from '../../domain/repositories/ticket.repository.interface';
import { TicketIdVO } from '../../domain/value-objects/primitives/ticket-id.vo';

@Injectable()
export class TicketProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(TicketProcessorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly ticketRepo: TicketRepository,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ ticketId: string }>(
      QUEUE_NAME.NOTIFICATION,
      async (payload) => {
        this.logger.log(`Processing ticket job: ${payload.ticketId}`);
        const ticket = await this.ticketRepo.findById(
          TicketIdVO.create(payload.ticketId),
        );
        if (ticket) {
          this.logger.debug(`Ticket status: ${ticket.status.value}`);
        }
      },
    );
  }
}
