/**
 * VendorSuspensionLogRepository
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorSuspensionLogEntity, SuspensionLogEvent } from '../entities/vendor-suspension-log.entity.js';

export const VENDOR_SUSPENSION_LOG_REPOSITORY = Symbol('VENDOR_SUSPENSION_LOG_REPOSITORY');

export interface VendorSuspensionLogRepository extends BaseRepository<VendorSuspensionLogEntity, string> {
  findByVendorId(vendorId: string): Promise<readonly VendorSuspensionLogEntity[]>;
  findBySuspensionId(suspensionId: string): Promise<readonly VendorSuspensionLogEntity[]>;
  findByEvent(event: SuspensionLogEvent): Promise<readonly VendorSuspensionLogEntity[]>;
  findByActorId(actorId: string): Promise<readonly VendorSuspensionLogEntity[]>;

  /** Timeline of a suspension (ordered by occurredAt). */
  findTimeline(suspensionId: string): Promise<readonly VendorSuspensionLogEntity[]>;
  /** Latest log entry for a suspension. */
  findLatestBySuspensionId(suspensionId: string): Promise<VendorSuspensionLogEntity | null>;

  countByEvent(event: SuspensionLogEvent): Promise<number>;
  countByVendor(vendorId: string): Promise<number>;
  deleteByVendorId(vendorId: string): Promise<void>;
}
