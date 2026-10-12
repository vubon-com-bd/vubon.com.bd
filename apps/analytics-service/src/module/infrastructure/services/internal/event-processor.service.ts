/**
 * Event Processor Service (internal)
 * @module analytics-service/infrastructure/services/internal
 *
 * Low-level event processing — enrichment → persist → cache.
 */
import { Injectable, Logger } from '@nestjs/common';
import { EventPrismaRepository } from '../../persistence/prisma/repositories/event.prisma.repository.js';
import { EventPayloadPrismaRepository } from '../../persistence/prisma/repositories/event-payload.prisma.repository.js';
import { EventEntity } from '../../../domain/entities/event.entity.js';

@Injectable()
export class EventProcessorService {
  private readonly logger = new Logger(EventProcessorService.name);

  constructor(
    private readonly eventRepo: EventPrismaRepository,
    private readonly payloadRepo: EventPayloadPrismaRepository
  ) {}

  async process(event: EventEntity): Promise<EventEntity> {
    const now = new Date().toISOString();

    if (event.isReceived()) {
      event.markProcessed(now);
    }

    const saved = await this.eventRepo.save(event);
    this.logger.debug(`Event processed: ${saved.id}`);
    return saved;
  }

  async processBatch(events: readonly EventEntity[]): Promise<number> {
    return this.eventRepo.bulkInsert(events);
  }
}
