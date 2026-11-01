/**
 * DeviceSyncWorker — sync stale devices across services
 * @module identity-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { AUTH_QUEUE_NAME, AUTH_JOB_NAME } from '../queues/queue.constants.js';
import type { DeviceRepository } from '../../domain/repositories/device.repository.interface.js';
import { DEVICE_REPOSITORY } from '../../domain/repositories/device.repository.interface.js';

export interface DeviceSyncPayload {
  readonly inactiveDays: number;
}

@Injectable()
export class DeviceSyncWorker extends BaseWorker<DeviceSyncPayload> {
  protected readonly queueName = AUTH_QUEUE_NAME.SYNC;
  protected readonly jobNames = [AUTH_JOB_NAME.DEVICE_SYNC] as const;

  constructor(
    queueService: QueueService,
    @Inject(DEVICE_REPOSITORY) private readonly deviceRepo: DeviceRepository,
  ) {
    super(queueService, 'DeviceSyncWorker');
  }

  protected async handle(payload: DeviceSyncPayload): Promise<unknown> {
    const stale = await this.deviceRepo.findStale(payload.inactiveDays);
    let synced = 0;
    for (const device of stale) {
      try {
        device.touchActive();
        await this.deviceRepo.save(device);
        synced++;
      } catch (err) {
        this.logger.warn(`device sync failed for ${device.id}`);
      }
    }
    this.logger.log(`Synced ${synced} stale devices`);
    return { synced };
  }

  protected concurrency(): number {
    return 3;
  }
}
