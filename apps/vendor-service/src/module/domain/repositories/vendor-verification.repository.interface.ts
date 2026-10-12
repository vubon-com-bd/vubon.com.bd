/**
 * VendorVerificationRepository
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorVerificationEntity } from '../entities/vendor-verification.entity.js';
import { VerificationStatusVO } from '../value-objects/primitives/verification-status.vo.js';

export const VENDOR_VERIFICATION_REPOSITORY = Symbol('VENDOR_VERIFICATION_REPOSITORY');

export interface VendorVerificationRepository extends BaseRepository<VendorVerificationEntity, string> {
  findByVendorId(vendorId: string): Promise<VendorVerificationEntity | null>;
  existsByVendorId(vendorId: string): Promise<boolean>;
  findByStatus(status: VerificationStatusVO): Promise<readonly VendorVerificationEntity[]>;

  /** Verification records pending review (SLA tracking). */
  findPendingReview(): Promise<readonly VendorVerificationEntity[]>;
  /** Records pending review past SLA hours. */
  findReviewPastSla(hours: number): Promise<readonly VendorVerificationEntity[]>;
  /** Records that expired. */
  findExpired(): Promise<readonly VendorVerificationEntity[]>;
  /** Records expiring soon. */
  findExpiring(days: number): Promise<readonly VendorVerificationEntity[]>;

  countByStatus(status: VerificationStatusVO): Promise<number>;
  upsert(entity: VendorVerificationEntity): Promise<VendorVerificationEntity>;
}
