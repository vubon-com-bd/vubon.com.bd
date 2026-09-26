/**
 * Queue Module
 * @module shared-kernel/infrastructure/messaging/queue
 */
import { Global, Module } from '@nestjs/common';
import { QueueService } from './queue.service';

@Global()
@Module({
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
