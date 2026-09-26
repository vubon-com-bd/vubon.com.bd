import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { DIGEST_QUEUE, type ProcessDigestJobPayload } from '../queues/digest.queue';
import type { DigestRepository } from '../../domain/repositories/digest.repository.interface';
import { DigestIdVO } from '../../domain/value-objects/primitives/digest-id.vo';

@Injectable()
export class DigestProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(DigestProcessorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly digestRepo: DigestRepository,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<ProcessDigestJobPayload>(
      DIGEST_QUEUE,
      async (payload) => {
        await this.process(payload);
      },
    );
  }

  private async process(payload: ProcessDigestJobPayload): Promise<void> {
    try {
      const entity = await this.digestRepo.findById(
        DigestIdVO.create(payload.digestId),
      );
      if (!entity) {
        this.logger.warn(`Digest not found: ${payload.digestId}`);
        return;
      }
      const sent = entity.markAsSent();
      await this.digestRepo.save(sent);
      this.logger.log(`Digest sent: ${sent.id.value}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Digest processing error: ${message}`);
      throw error;
    }
  }
}
