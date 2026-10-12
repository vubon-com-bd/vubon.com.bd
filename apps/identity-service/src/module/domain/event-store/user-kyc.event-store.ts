/**
 * User KYC Event Store Interface
 * @module identity-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { UserKycEntity } from '../entities/user-kyc.entity.js';

export const USER_KYC_EVENT_STORE = Symbol('USER_KYC_EVENT_STORE');

export interface UserKycEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<UserKycEntity | null>;
  loadLatest(limit: number): Promise<readonly UserKycEntity[]>;
  loadByUserId(userId: string): Promise<readonly UserKycEntity[]>;
  loadByStatus(status: string): Promise<readonly UserKycEntity[]>;
  loadPending(): Promise<readonly UserKycEntity[]>;
  purge(cutoffIso: string): Promise<number>;
}
