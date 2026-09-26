import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { BROADCAST_QUEUE, type ProcessBroadcastJobPayload } from '../queues/broadcast.queue';
import type { BroadcastRepository } from '../../domain/repositories/broadcast.repository.interface';
import { BroadcastIdVO } from '../../domain/value-objects/primitives/broadcast-id.vo';

@Injectable()
export class BroadcastProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(BroadcastProcessorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly broadcastRepo: BroadcastRepository,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<ProcessBroadcastJobPayload>(
      BROADCAST_QUEUE,
      async (payload) => {
        await this.process(payload);
      },
    );
  }

  private async process(payload: ProcessBroadcastJobPayload): Promise<void> {
    try {
      const entity = await this.broadcastRepo.findById(
        BroadcastIdVO.create(payload.broadcastId),
      );
      if (!entity) {
        this.logger.warn(`Broadcast not found: ${payload.broadcastId}`);
        return;
      }
      this.logger.log(`Processing broadcast ${entity.id.value}`);

      const completed = entity.complete();
      await this.broadcastRepo.save(completed);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Broadcast processing error: ${message}`);
      throw error;
    }
  }
}
