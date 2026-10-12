/**
 * Insurance Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { InsuranceEntity } from '../entities/insurance.entity.js';
import { InsuranceIdVO } from '../value-objects/primitives/insurance-id.vo.js';
import { PolicyNumberVO } from '../value-objects/primitives/policy-number.vo.js';
import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { InsuranceStatusVO } from '../value-objects/primitives/insurance-status.vo.js';
import { InsuranceClaimStatusVO } from '../value-objects/primitives/insurance-claim-status.vo.js';

export const INSURANCE_REPOSITORY = Symbol('INSURANCE_REPOSITORY');

export interface InsuranceListFilter {
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly userId?: string;
  readonly status?: string;
  readonly type?: string;
  readonly isClaimed?: boolean;
  readonly claimStatus?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface InsuranceListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'startsAt' | 'expiresAt' | 'declaredValue';
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
  readonly totalPolicies: number;
  readonly activePolicies: number;
  readonly claimedPolicies: number;
  readonly totalDeclaredValue: number;
  readonly totalPremium: number;
  readonly currency: string;
  readonly byStatus: Readonly<Record<string, number>>;
}

export interface InsuranceRepository extends BaseRepository<InsuranceEntity, string> {
  findByIdVO(id: InsuranceIdVO): Promise<InsuranceEntity | null>;
  findByPolicyNumber(policyNumber: PolicyNumberVO): Promise<InsuranceEntity | null>;
  findByShipmentId(shipmentId: ShipmentIdVO): Promise<InsuranceEntity | null>;
  findByOrderId(orderId: OrderIdVO): Promise<readonly InsuranceEntity[]>;
  findByUserId(userId: UserIdVO): Promise<readonly InsuranceEntity[]>;
  findByStatus(status: InsuranceStatusVO): Promise<readonly InsuranceEntity[]>;
  findByClaimStatus(status: InsuranceClaimStatusVO): Promise<readonly InsuranceEntity[]>;
  findActive(): Promise<readonly InsuranceEntity[]>;
  findExpiring(withinDays: number): Promise<readonly InsuranceEntity[]>;
  findWithOpenClaims(): Promise<readonly InsuranceEntity[]>;
  findPaginated(options: InsuranceListOptions): Promise<InsurancePaginationResult>;
  existsByPolicyNumber(policyNumber: PolicyNumberVO): Promise<boolean>;
  getStats(userId?: string, fromDate?: string, toDate?: string): Promise<InsuranceStats>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
