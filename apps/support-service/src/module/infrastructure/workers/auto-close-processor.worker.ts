import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';
import type { TicketRepository } from '../../domain/repositories/ticket.repository.interface';
import { TicketIdVO } from '../../domain/value-objects/primitives/ticket-id.vo';

@Injectable()
export class AutoCloseProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(AutoCloseProcessorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly ticketRepo: TicketRepository,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ ticketId: string }>(
      QUEUE_NAME.CLEANUP,
      async (payload) => {
        const ticket = await this.ticketRepo.findById(
          TicketIdVO.create(payload.ticketId),
        );
        if (ticket && !ticket.isOpen) {
          this.logger.log(`Auto-closing ticket ${payload.ticketId}`);
          const closed = ticket.close();
          await this.ticketRepo.save(closed);
        }
      },
    );
  }
}
