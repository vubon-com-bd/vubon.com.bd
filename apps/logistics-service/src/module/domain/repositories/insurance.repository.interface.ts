/**
 * Insurance Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { InsuranceEntity } from '../entities/insurance.entity.js';
import type { InsuranceIdVO } from '../value-objects/primitives/insurance-id.vo.js';

export const INSURANCE_REPOSITORY = Symbol('INSURANCE_REPOSITORY');

export interface InsuranceListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly userId?: string;
  readonly isClaimed?: boolean;
  readonly minValue?: number;
  readonly maxValue?: number;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}

export interface InsuranceListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'declaredValue' | 'expiresAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: InsuranceListFilter;
}

export interface InsurancePaginationResult {
  readonly items: readonly InsuranceEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface InsuranceStats {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly totalInsured: number;
  readonly totalPremium: number;
  readonly currency: string;
  readonly claimCount: number;
  readonly claimRate: number;
}

export interface InsuranceRepository extends BaseRepository<InsuranceEntity, string> {
  findByIdVO(id: InsuranceIdVO): Promise<InsuranceEntity | null>;
  findByPolicyNumber(policyNumber: string): Promise<InsuranceEntity | null>;
  findByShipmentId(shipmentId: string): Promise<InsuranceEntity | null>;
  findByOrderId(orderId: string): Promise<readonly InsuranceEntity[]>;
  findByUserId(userId: string): Promise<readonly InsuranceEntity[]>;
  findByStatus(status: string): Promise<readonly InsuranceEntity[]>;
  findClaimable(): Promise<readonly InsuranceEntity[]>;
  findExpiringWithinDays(days: number): Promise<readonly InsuranceEntity[]>;
  findPaginated(options: InsuranceListOptions): Promise<InsurancePaginationResult>;
  getStats(fromDate?: string, toDate?: string): Promise<InsuranceStats>;
  existsByPolicyNumber(policyNumber: string): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
