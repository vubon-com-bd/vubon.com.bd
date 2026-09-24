import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';
import type { SlaRepository } from '../../domain/repositories/sla.repository.interface';
import type { TicketRepository } from '../../domain/repositories/ticket.repository.interface';

@Injectable()
export class SlaMonitorWorker implements OnModuleInit {
  private readonly logger = new Logger(SlaMonitorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly slaRepo: SlaRepository,
    private readonly ticketRepo: TicketRepository,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ windowMinutes: number }>(
      QUEUE_NAME.ANALYTICS,
      async (payload) => {
        this.logger.log(
          `SLA monitor: checking window ${payload.windowMinutes} minutes`,
        );
        const slas = await this.slaRepo.findAll();
        const tickets = await this.ticketRepo.findAll();
        this.logger.debug(`SLA count: ${slas.length}, tickets: ${tickets.length}`);
      },
    );
  }
}
