/**
 * TicketProcessorWorker — consumes support.ticket jobs
 * @module support-service/infrastructure/workers
 *
 * Rule: no business logic; delegate to repository/service
 */
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

import { SupportPrismaService } from '../persistence/prisma/prisma.service';
import { TicketMapper } from '../persistence/prisma/mappers/ticket.mapper';
import { TicketIdVO } from '../../domain/value-objects/primitives/ticket-id.vo';
import { TicketStatusVO } from '../../domain/value-objects/primitives/ticket-status.vo';
import { SUPPORT_QUEUE, SUPPORT_QUEUE_JOB } from '../queues/support-queue.constants';
import { TICKET_CONFIG } from '../config/ticket.config';

@Processor(SUPPORT_QUEUE.TICKET)
export class TicketProcessorWorker extends WorkerHost {
  private readonly logger = new Logger(TicketProcessorWorker.name);

  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: TicketMapper,
  ) {
    super();
  }

  async process(job: Job): Promise<void> {
    this.logger.log(`Processing job ${job.name} (${job.id})`);

    switch (job.name) {
      case SUPPORT_QUEUE_JOB.TICKET_NOTIFY:
        await this.handleNotify(job);
        break;

      case SUPPORT_QUEUE_JOB.TICKET_AUTO_CLOSE:
        await this.handleAutoClose(job);
        break;

      case SUPPORT_QUEUE_JOB.TICKET_ASSIGN:
        // placeholder — routing handled by domain service
        this.logger.log('Assign job received (delegated to domain router)');
        break;

      default:
        this.logger.warn(`Unknown job name: ${job.name}`);
    }
  }

  private async handleNotify(job: Job): Promise<void> {
    const ticketId = (job.data as { ticketId?: string }).ticketId;
    if (!ticketId) {
      throw new Error('ticketId missing from job payload');
    }
    const raw = await this.prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!raw) return;
    const ticket = this.mapper.toDomain(raw);
    this.logger.log(`Notify for ticket ${ticket.number.value}`);
  }

  private async handleAutoClose(job: Job): Promise<void> {
    const ticketId = (job.data as { ticketId?: string }).ticketId;
    if (!ticketId) return;

    const raw = await this.prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!raw) return;

    const ticket = this.mapper.toDomain(raw);
    if (ticket.isTerminal) return;

    const ageMs = Date.now() - Date.parse(ticket.updatedAt);
    const autoCloseMs = TICKET_CONFIG.autoCloseDays * 24 * 60 * 60 * 1000;
    if (ageMs < autoCloseMs) return;

    await this.prisma.ticket.update({
      where: { id: ticketId },
      data: { status: TicketStatusVO.create('closed').value, closedAt: new Date() },
    });

    void TicketIdVO;
    this.logger.log(`Auto-closed ticket ${ticketId}`);
  }
}
