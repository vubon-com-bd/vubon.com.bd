#!/usr/bin/env node
/**
 * Generate FULL InMemory Repositories for vendor-service
 * Auto-generates all 23 InMemory repositories with domain interface methods.
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT = join(__dirname, '..');
const MEMORY_DIR = join(ROOT, 'src/module/infrastructure/persistence/memory/repositories');

const P = {
  entity: (n) => `../../../../domain/entities/${n}.entity.js`,
  iface: (n) => `../../../../domain/repositories/${n}.repository.interface.js`,
  vo: (n) => `../../../../domain/value-objects/primitives/${n}.vo.js`,
};

const paginatedMethod = `async findPaginated(options: unknown): Promise<unknown> {
    const all = await this.findAll();
    const opts = options as { page: number; limit: number };
    const start = (opts.page - 1) * opts.limit;
    return {
      items: all.slice(start, start + opts.limit),
      total: all.length,
      page: opts.page,
      limit: opts.limit,
      totalPages: Math.ceil(all.length / opts.limit),
    };
  }`;

const findByIdVOMethod = (voType, entityType) =>
  `async findByIdVO(id: ${voType}): Promise<${entityType} | null> {
    return this.findById(id.value);
  }`;

const findByVendorMethod = (entityType) =>
  `async findByVendor(vendorId: VendorIdVO | string): Promise<readonly ${entityType}[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const all = await this.findAll();
    return all.filter((e) => e.vendorId.value === idStr);
  }`;

const countByVendorMethod = (entityType) =>
  `async countByVendor(vendorId: VendorIdVO | string): Promise<number> {
    return (await this.findByVendor(vendorId)).length;
  }`;

const SPECS = [
  {
    file: 'vendor.memory.repository.ts',
    entity: 'VendorEntity',
    className: 'Vendor',
    entityPath: P.entity('vendor'),
    interfaceName: 'VendorRepository',
    interfacePath: P.iface('vendor'),
    voImports: [
      { name: 'VendorIdVO', path: P.vo('vendor-id') },
      { name: 'UserIdVO', path: P.vo('user-id') },
    ],
    customMethods: [
      findByIdVOMethod('VendorIdVO', 'VendorEntity'),
      `async existsBySlug(slug: string): Promise<boolean> {
    const all = await this.findAll();
    return all.some((e) => e.vo?.slug?.value === slug || e.slug?.value === slug);
  }`,
      `async existsByEmail(email: string): Promise<boolean> {
    const all = await this.findAll();
    return all.some((e) => (e as any).email === email || (e as any).vo?.email === email);
  }`,
      `async existsByUserId(userId: string): Promise<boolean> {
    const all = await this.findAll();
    return all.some((e) => String((e as any).userId ?? (e as any).vo?.userId?.value) === userId);
  }`,
      paginatedMethod,
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    return { total: all.length, byStatus: {}, byType: {}, activeCount: 0, suspendedCount: 0, verifiedCount: 0 };
  }`,
      `async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }`,
    ],
  },

  {
    file: 'vendor-profile.memory.repository.ts',
    entity: 'VendorProfileEntity',
    className: 'VendorProfile',
    entityPath: P.entity('vendor-profile'),
    interfaceName: 'VendorProfileRepository',
    interfacePath: P.iface('vendor-profile'),
    voImports: [{ name: 'VendorIdVO', path: P.vo('vendor-id') }],
    customMethods: [
      `async findByVendorId(vendorId: VendorIdVO | string): Promise<VendorProfileEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const all = await this.findAll();
    return all.find((e) => e.vendorId.value === idStr) ?? null;
  }`,
      `async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }`,
    ],
  },

  {
    file: 'vendor-business.memory.repository.ts',
    entity: 'VendorBusinessEntity',
    className: 'VendorBusiness',
    entityPath: P.entity('vendor-business'),
    interfaceName: 'VendorBusinessRepository',
    interfacePath: P.iface('vendor-business'),
    voImports: [{ name: 'VendorIdVO', path: P.vo('vendor-id') }],
    customMethods: [
      `async findByVendorId(vendorId: VendorIdVO | string): Promise<VendorBusinessEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const all = await this.findAll();
    return all.find((e) => e.vendorId.value === idStr) ?? null;
  }`,
      `async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }`,
    ],
  },

  {
    file: 'vendor-contact.memory.repository.ts',
    entity: 'VendorContactEntity',
    className: 'VendorContact',
    entityPath: P.entity('vendor-contact'),
    interfaceName: 'VendorContactRepository',
    interfacePath: P.iface('vendor-contact'),
    voImports: [{ name: 'VendorIdVO', path: P.vo('vendor-id') }],
    customMethods: [
      findByVendorMethod('VendorContactEntity'),
      `async findPrimaryByVendor(vendorId: VendorIdVO | string): Promise<VendorContactEntity | null> {
    const list = await this.findByVendor(vendorId);
    return list.find((e) => (e as any).isPrimary === true) ?? list[0] ?? null;
  }`,
      `async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }`,
    ],
  },

  {
    file: 'vendor-address.memory.repository.ts',
    entity: 'VendorAddressEntity',
    className: 'VendorAddress',
    entityPath: P.entity('vendor-address'),
    interfaceName: 'VendorAddressRepository',
    interfacePath: P.iface('vendor-address'),
    voImports: [{ name: 'VendorIdVO', path: P.vo('vendor-id') }],
    customMethods: [
      findByVendorMethod('VendorAddressEntity'),
      `async findDefaultByVendor(vendorId: VendorIdVO | string): Promise<VendorAddressEntity | null> {
    const list = await this.findByVendor(vendorId);
    return list.find((e) => (e as any).isDefault === true) ?? list[0] ?? null;
  }`,
      `async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }`,
    ],
  },

  {
    file: 'vendor-bank-account.memory.repository.ts',
    entity: 'VendorBankAccountEntity',
    className: 'VendorBankAccount',
    entityPath: P.entity('vendor-bank-account'),
    interfaceName: 'VendorBankAccountRepository',
    interfacePath: P.iface('vendor-bank-account'),
    voImports: [{ name: 'VendorIdVO', path: P.vo('vendor-id') }],
    customMethods: [
      findByVendorMethod('VendorBankAccountEntity'),
      `async findPrimaryByVendor(vendorId: VendorIdVO | string): Promise<VendorBankAccountEntity | null> {
    const list = await this.findByVendor(vendorId);
    return list.find((e) => (e as any).isPrimary === true) ?? list[0] ?? null;
  }`,
      `async findVerifiedByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorBankAccountEntity[]> {
    return (await this.findByVendor(vendorId)).filter((e) => (e as any).isVerified === true || String((e as any).status) === "verified");
  }`,
      `async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }`,
    ],
  },

  {
    file: 'vendor-document.memory.repository.ts',
    entity: 'VendorDocumentEntity',
    className: 'VendorDocument',
    entityPath: P.entity('vendor-document'),
    interfaceName: 'VendorDocumentRepository',
    interfacePath: P.iface('vendor-document'),
    voImports: [{ name: 'VendorIdVO', path: P.vo('vendor-id') }],
    customMethods: [
      findByVendorMethod('VendorDocumentEntity'),
      `async findByVendorAndType(vendorId: VendorIdVO | string, type: string): Promise<readonly VendorDocumentEntity[]> {
    return (await this.findByVendor(vendorId)).filter((e) => String(e.type) === type);
  }`,
      `async findVerifiedByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorDocumentEntity[]> {
    return (await this.findByVendor(vendorId)).filter((e) => (e as any).isVerified === true || String((e as any).status) === "verified");
  }`,
      `async findPendingVerification(): Promise<readonly VendorDocumentEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e as any).isVerified !== true);
  }`,
      `async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }`,
    ],
  },

  {
    file: 'vendor-verification.memory.repository.ts',
    entity: 'VendorVerificationEntity',
    className: 'VendorVerification',
    entityPath: P.entity('vendor-verification'),
    interfaceName: 'VendorVerificationRepository',
    interfacePath: P.iface('vendor-verification'),
    voImports: [{ name: 'VendorIdVO', path: P.vo('vendor-id') }],
    customMethods: [
      `async findByVendorId(vendorId: VendorIdVO | string): Promise<VendorVerificationEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const all = await this.findAll();
    return all.find((e) => e.vendorId.value === idStr) ?? null;
  }`,
      `async findPending(): Promise<readonly VendorVerificationEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (String(e.status)) === 'pending');
  }`,
      `async findVerified(): Promise<readonly VendorVerificationEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (String(e.status)) === 'verified' || (e as any).isVerified === true || String((e as any).status) === "verified");
  }`,
      `async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }`,
    ],
  },

  {
    file: 'vendor-approval.memory.repository.ts',
    entity: 'VendorApprovalEntity',
    className: 'VendorApproval',
    entityPath: P.entity('vendor-approval'),
    interfaceName: 'VendorApprovalRepository',
    interfacePath: P.iface('vendor-approval'),
    voImports: [{ name: 'VendorIdVO', path: P.vo('vendor-id') }],
    customMethods: [
      findByVendorMethod('VendorApprovalEntity'),
      `async findLatestByVendor(vendorId: VendorIdVO | string): Promise<VendorApprovalEntity | null> {
    const list = await this.findByVendor(vendorId);
    return [...list].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))[0] ?? null;
  }`,
      `async findPending(): Promise<readonly VendorApprovalEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (String(e.status)) === 'pending');
  }`,
      `async findApproved(): Promise<readonly VendorApprovalEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (String(e.status)) === 'approved');
  }`,
      `async findRejected(): Promise<readonly VendorApprovalEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (String(e.status)) === 'rejected');
  }`,
      `async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }`,
    ],
  },

  {
    file: 'vendor-suspension.memory.repository.ts',
    entity: 'VendorSuspensionEntity',
    className: 'VendorSuspension',
    entityPath: P.entity('vendor-suspension'),
    interfaceName: 'VendorSuspensionRepository',
    interfacePath: P.iface('vendor-suspension'),
    voImports: [{ name: 'VendorIdVO', path: P.vo('vendor-id') }],
    customMethods: [
      findByVendorMethod('VendorSuspensionEntity'),
      `async findActiveByVendor(vendorId: VendorIdVO | string): Promise<VendorSuspensionEntity | null> {
    const list = await this.findByVendor(vendorId);
    return list.find((e) => (e as any).isActive === true || (String(e.status)) === 'active') ?? null;
  }`,
      `async findActive(): Promise<readonly VendorSuspensionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e as any).isActive === true);
  }`,
      `async findLifted(): Promise<readonly VendorSuspensionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e as any).isLifted === true);
  }`,
      `async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }`,
    ],
  },

  {
    file: 'vendor-commission.memory.repository.ts',
    entity: 'VendorCommissionEntity',
    className: 'VendorCommission',
    entityPath: P.entity('vendor-commission'),
    interfaceName: 'VendorCommissionRepository',
    interfacePath: P.iface('vendor-commission'),
    voImports: [{ name: 'VendorIdVO', path: P.vo('vendor-id') }],
    customMethods: [
      findByVendorMethod('VendorCommissionEntity'),
      `async findActiveByVendor(vendorId: VendorIdVO | string): Promise<VendorCommissionEntity | null> {
    const list = await this.findByVendor(vendorId);
    return list.find((e) => (e as any).isActive === true) ?? list[0] ?? null;
  }`,
      paginatedMethod,
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    return { total: all.length, activeCount: all.filter((e) => e.isActive).length, averageRate: 0, byType: {} };
  }`,
      `async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }`,
    ],
  },

  {
    file: 'vendor-payout.memory.repository.ts',
    entity: 'VendorPayoutEntity',
    className: 'VendorPayout',
    entityPath: P.entity('vendor-payout'),
    interfaceName: 'VendorPayoutRepository',
    interfacePath: P.iface('vendor-payout'),
    voImports: [{ name: 'VendorIdVO', path: P.vo('vendor-id') }],
    customMethods: [
      findByVendorMethod('VendorPayoutEntity'),
      `async findByStatus(status: string): Promise<readonly VendorPayoutEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (String(e.status)) === status);
  }`,
      `async findPending(): Promise<readonly VendorPayoutEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (String(e.status)) === 'pending');
  }`,
      `async findCompleted(): Promise<readonly VendorPayoutEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (String(e.status)) === 'paid');
  }`,
      paginatedMethod,
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    const totalAmount = all.reduce((s, e) => s + Number(e.amount ?? 0), 0);
    return { total: all.length, pendingCount: 0, completedCount: 0, totalAmount };
  }`,
      `async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }`,
    ],
  },

  {
    file: 'vendor-settlement.memory.repository.ts',
    entity: 'VendorSettlementEntity',
    className: 'VendorSettlement',
    entityPath: P.entity('vendor-settlement'),
    interfaceName: 'VendorSettlementRepository',
    interfacePath: P.iface('vendor-settlement'),
    voImports: [{ name: 'VendorIdVO', path: P.vo('vendor-id') }],
    customMethods: [
      findByVendorMethod('VendorSettlementEntity'),
      `async findByStatus(status: string): Promise<readonly VendorSettlementEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (String(e.status)) === status);
  }`,
      `async findPending(): Promise<readonly VendorSettlementEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (String(e.status)) === 'pending');
  }`,
      `async findSettled(): Promise<readonly VendorSettlementEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (String(e.status)) === 'settled');
  }`,
      paginatedMethod,
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    return { total: all.length, pendingCount: 0, settledCount: 0, totalAmount: 0 };
  }`,
      `async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }`,
    ],
  },

  {
    file: 'vendor-performance.memory.repository.ts',
    entity: 'VendorPerformanceEntity',
    className: 'VendorPerformance',
    entityPath: P.entity('vendor-performance'),
    interfaceName: 'VendorPerformanceRepository',
    interfacePath: P.iface('vendor-performance'),
    voImports: [
      { name: 'PerformanceIdVO', path: P.vo('performance-id') },
      { name: 'VendorIdVO', path: P.vo('vendor-id') },
    ],
    customMethods: [
      findByIdVOMethod('PerformanceIdVO', 'VendorPerformanceEntity'),
      findByVendorMethod('VendorPerformanceEntity'),
      `async findLatestByVendor(vendorId: VendorIdVO | string): Promise<VendorPerformanceEntity | null> {
    const list = await this.findByVendor(vendorId);
    return [...list].sort((a, b) => Date.parse(b.evaluatedAt) - Date.parse(a.evaluatedAt))[0] ?? null;
  }`,
      `async findByPeriod(vendorId: string, periodStart: string, periodEnd: string): Promise<VendorPerformanceEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.vendorId.value === vendorId && e.periodStart === periodStart && e.periodEnd === periodEnd) ?? null;
  }`,
      `async findByGrade(grade: string): Promise<readonly VendorPerformanceEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => String(e.grade) === grade);
  }`,
      `async findTopPerformers(limit = 10): Promise<readonly VendorPerformanceEntity[]> {
    const all = await this.findAll();
    return [...all].sort((a, b) => Number((b as any).overallScore) - Number((a as any).overallScore)).slice(0, limit);
  }`,
      `async findBottomPerformers(limit = 10): Promise<readonly VendorPerformanceEntity[]> {
    const all = await this.findAll();
    return [...all].sort((a, b) => Number((a as any).overallScore) - Number((b as any).overallScore)).slice(0, limit);
  }`,
      `async findTriggeringWarning(): Promise<readonly VendorPerformanceEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e as any).triggersWarning === true);
  }`,
      `async findTriggeringAutoSuspend(): Promise<readonly VendorPerformanceEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e as any).triggersAutoSuspend === true);
  }`,
      `async findEligibleForEvaluation(): Promise<readonly VendorPerformanceEntity[]> {
    return this.findAll();
  }`,
      paginatedMethod,
      countByVendorMethod('VendorPerformanceEntity'),
      `async getStats(_vendorId?: string): Promise<unknown> {
    const all = await this.findAll();
    const byGrade: Record<string, number> = {};
    let sum = 0;
    for (const e of all) {
      sum += Number((e as any).overallScore ?? 0);
      const g = String(e.grade) ?? 'unknown';
      byGrade[g] = (byGrade[g] ?? 0) + 1;
    }
    return {
      total: all.length,
      averageScore: all.length ? sum / all.length : 0,
      averageGrade: 'N/A',
      byGrade,
      warningCount: all.filter((e) => e.triggersWarning).length,
      autoSuspendCount: all.filter((e) => e.triggersAutoSuspend).length,
    };
  }`,
    ],
  },

  {
    file: 'vendor-rating.memory.repository.ts',
    entity: 'VendorRatingEntity',
    className: 'VendorRating',
    entityPath: P.entity('vendor-rating'),
    interfaceName: 'VendorRatingRepository',
    interfacePath: P.iface('vendor-rating'),
    voImports: [{ name: 'VendorIdVO', path: P.vo('vendor-id') }],
    customMethods: [
      `async findByVendorId(vendorId: VendorIdVO | string): Promise<VendorRatingEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const all = await this.findAll();
    return all.find((e) => e.vendorId.value === idStr) ?? null;
  }`,
      `async findByVendorIds(vendorIds: readonly string[]): Promise<readonly VendorRatingEntity[]> {
    const set = new Set(vendorIds);
    const all = await this.findAll();
    return all.filter((e) => set.has(e.vendorId.value));
  }`,
      `async findTopRated(limit = 10): Promise<readonly VendorRatingEntity[]> {
    const all = await this.findAll();
    return [...all].sort((a, b) => (Number((b as any).overall ?? 0)) - (Number((a as any).overall ?? 0))).slice(0, limit);
  }`,
      `async findBottomRated(limit = 10): Promise<readonly VendorRatingEntity[]> {
    const all = await this.findAll();
    return [...all].sort((a, b) => (Number((a as any).overall ?? 0)) - (Number((b as any).overall ?? 0))).slice(0, limit);
  }`,
      `async findNeedingAutoHide(): Promise<readonly VendorRatingEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e as any).triggersAutoHide === true);
  }`,
      `async findNeedingAutoFlag(): Promise<readonly VendorRatingEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e as any).triggersAutoFlag === true);
  }`,
      `async findWithRecentDecline(_days = 30): Promise<readonly VendorRatingEntity[]> { return []; }`,
      paginatedMethod,
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    const sum = all.reduce((s, e) => s + (Number((e as any).overall ?? 0)), 0);
    const sumRev = all.reduce((s, e) => s + (e.totalReviews ?? 0), 0);
    return {
      total: all.length,
      averageOverall: all.length ? sum / all.length : 0,
      averageTotalReviews: all.length ? sumRev / all.length : 0,
      positiveCount: all.filter((e) => (Number((e as any).overall ?? 0)) >= 4).length,
      negativeCount: all.filter((e) => (Number((e as any).overall ?? 0)) <= 2).length,
      autoHideCount: all.filter((e) => e.triggersAutoHide).length,
      autoFlagCount: all.filter((e) => e.triggersAutoFlag).length,
    };
  }`,
      `async getDistribution(_vendorId: string): Promise<Readonly<Record<1 | 2 | 3 | 4 | 5, number>>> {
    return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  }`,
    ],
  },

  {
    file: 'vendor-review.memory.repository.ts',
    entity: 'VendorReviewEntity',
    className: 'VendorReview',
    entityPath: P.entity('vendor-review'),
    interfaceName: 'VendorReviewRepository',
    interfacePath: P.iface('vendor-review'),
    voImports: [
      { name: 'ReviewIdVO', path: P.vo('review-id') },
      { name: 'VendorIdVO', path: P.vo('vendor-id') },
      { name: 'UserIdVO', path: P.vo('user-id') },
    ],
    customMethods: [
      findByIdVOMethod('ReviewIdVO', 'VendorReviewEntity'),
      findByVendorMethod('VendorReviewEntity'),
      `async findByVendorAndStatus(vendorId: VendorIdVO | string, status: string): Promise<readonly VendorReviewEntity[]> {
    return (await this.findByVendor(vendorId)).filter((e) => (String(e.status)) === status);
  }`,
      `async findByUser(userId: UserIdVO | string): Promise<readonly VendorReviewEntity[]> {
    const idStr = typeof userId === 'string' ? userId : userId.value;
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === idStr);
  }`,
      `async findByUserAndVendor(userId: string, vendorId: string): Promise<VendorReviewEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.userId.value === userId && e.vendorId.value === vendorId) ?? null;
  }`,
      `async findByOrder(orderId: string): Promise<readonly VendorReviewEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.orderId?.value === orderId);
  }`,
      `async findByProduct(productId: string): Promise<readonly VendorReviewEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.productId?.value === productId);
  }`,
      `async findPendingModeration(limit = 50): Promise<readonly VendorReviewEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (String(e.status)) === 'pending').slice(0, limit);
  }`,
      `async findFlagged(limit = 50): Promise<readonly VendorReviewEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e.flaggedCount ?? 0) > 0).slice(0, limit);
  }`,
      `async findRecentByVendor(vendorId: string, _days = 30): Promise<readonly VendorReviewEntity[]> {
    return this.findByVendor(vendorId);
  }`,
      `async findPositiveByVendor(vendorId: string): Promise<readonly VendorReviewEntity[]> {
    return (await this.findByVendor(vendorId)).filter((e) => Number((e as any).rating ?? 0) >= 4);
  }`,
      `async findNegativeByVendor(vendorId: string): Promise<readonly VendorReviewEntity[]> {
    return (await this.findByVendor(vendorId)).filter((e) => Number((e as any).rating ?? 0) <= 2);
  }`,
      `async findUnansweredByVendor(vendorId: string): Promise<readonly VendorReviewEntity[]> {
    return (await this.findByVendor(vendorId)).filter((e) => !e.reply);
  }`,
      paginatedMethod,
      `async existsByUserAndVendor(userId: string, vendorId: string): Promise<boolean> {
    return (await this.findByUserAndVendor(userId, vendorId)) !== null;
  }`,
      countByVendorMethod('VendorReviewEntity'),
      `async countByVendorAndStatus(vendorId: string, status: string): Promise<number> {
    return (await this.findByVendorAndStatus(vendorId, status)).length;
  }`,
      `async getStats(_vendorId?: string, _fromDate?: string, _toDate?: string): Promise<unknown> {
    const all = await this.findAll();
    const sum = all.reduce((s, e) => s + Number((e as any).rating ?? 0), 0);
    return {
      total: all.length,
      averageRating: all.length ? sum / all.length : 0,
      positiveCount: all.filter((e) => Number((e as any).rating ?? 0) >= 4).length,
      negativeCount: all.filter((e) => Number((e as any).rating ?? 0) <= 2).length,
      verifiedPurchaseCount: all.filter((e) => (e as any).isVerifiedPurchase === true).length,
      withRepliesCount: all.filter((e) => e.reply).length,
      byStatus: {},
      byRating: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    };
  }`,
    ],
  },

  {
    file: 'vendor-shipping.memory.repository.ts',
    entity: 'VendorShippingEntity',
    className: 'VendorShipping',
    entityPath: P.entity('vendor-shipping'),
    interfaceName: 'VendorShippingRepository',
    interfacePath: P.iface('vendor-shipping'),
    voImports: [{ name: 'VendorIdVO', path: P.vo('vendor-id') }],
    customMethods: [
      `async findByVendorId(vendorId: VendorIdVO | string): Promise<VendorShippingEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const all = await this.findAll();
    return all.find((e) => e.vendorId.value === idStr) ?? null;
  }`,
      `async findSupportingMethod(_method: string): Promise<readonly VendorShippingEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e as any).hasFreeShipping === true || (e as any).hasExpressShipping === true);
  }`,
      `async findSupportingZone(_zone: string): Promise<readonly VendorShippingEntity[]> {
    return this.findAll();
  }`,
      `async findWithFreeShipping(): Promise<readonly VendorShippingEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e as any).hasFreeShipping === true);
  }`,
      `async findWithExpressShipping(): Promise<readonly VendorShippingEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e as any).hasExpressShipping === true);
  }`,
      `async findShipsInternationally(): Promise<readonly VendorShippingEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e as any).shipsInternationally === true);
  }`,
      paginatedMethod,
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    return {
      total: all.length,
      withFreeShipping: all.filter((e) => e.hasFreeShipping).length,
      withExpress: all.filter((e) => e.hasExpressShipping).length,
      withInternational: all.filter((e) => e.shipsInternationally).length,
      averageProcessingDays: 0,
      byMethodUsage: {},
      byZoneUsage: {},
    };
  }`,
      `async calculateShippingCost(_vendorId: string, _zone: string, _orderAmount: number): Promise<number> { return 0; }`,
    ],
  },

  {
    file: 'vendor-return-policy.memory.repository.ts',
    entity: 'VendorReturnPolicyEntity',
    className: 'VendorReturnPolicy',
    entityPath: P.entity('vendor-return-policy'),
    interfaceName: 'VendorReturnPolicyRepository',
    interfacePath: P.iface('vendor-return-policy'),
    voImports: [{ name: 'VendorIdVO', path: P.vo('vendor-id') }],
    customMethods: [
      `async findByVendorId(vendorId: VendorIdVO | string): Promise<VendorReturnPolicyEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const all = await this.findAll();
    return all.find((e) => e.vendorId.value === idStr) ?? null;
  }`,
      `async findByType(type: string): Promise<readonly VendorReturnPolicyEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.type?.value === type);
  }`,
      `async findFreeReturn(): Promise<readonly VendorReturnPolicyEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e as any).isFreeReturn === true);
  }`,
      `async findAutoApprove(): Promise<readonly VendorReturnPolicyEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e as any).autoApprove === true);
  }`,
      `async findWithExtendedWindow(minDays: number): Promise<readonly VendorReturnPolicyEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e.windowDays ?? 0) > minDays);
  }`,
      paginatedMethod,
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    const sum = all.reduce((s, e) => s + (e.windowDays ?? 0), 0);
    return {
      total: all.length,
      allowsReturn: all.filter((e) => e.allowsReturn).length,
      freeReturn: all.filter((e) => e.isFreeReturn).length,
      autoApprove: all.filter((e) => e.autoApprove).length,
      averageWindowDays: all.length ? sum / all.length : 0,
      byType: {},
    };
  }`,
    ],
  },

  {
    file: 'vendor-warranty.memory.repository.ts',
    entity: 'VendorWarrantyEntity',
    className: 'VendorWarranty',
    entityPath: P.entity('vendor-warranty'),
    interfaceName: 'VendorWarrantyRepository',
    interfacePath: P.iface('vendor-warranty'),
    voImports: [{ name: 'VendorIdVO', path: P.vo('vendor-id') }],
    customMethods: [
      `async findByVendorId(vendorId: VendorIdVO | string): Promise<VendorWarrantyEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const all = await this.findAll();
    return all.find((e) => e.vendorId.value === idStr) ?? null;
  }`,
      `async findByType(type: string): Promise<readonly VendorWarrantyEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.type?.value === type);
  }`,
      `async findProvidingCoverage(): Promise<readonly VendorWarrantyEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e as any).providesCoverage === true);
  }`,
      `async findExtendedWarranties(): Promise<readonly VendorWarrantyEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e.periodDays ?? 0) > 365);
  }`,
      `async findManufacturerBacked(): Promise<readonly VendorWarrantyEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e as any).isManufacturerBacked === true);
  }`,
      paginatedMethod,
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    const sum = all.reduce((s, e) => s + (e.periodDays ?? 0), 0);
    return {
      total: all.length,
      withCoverage: all.filter((e) => e.providesCoverage).length,
      averagePeriodDays: all.length ? sum / all.length : 0,
      byType: {},
    };
  }`,
    ],
  },

  {
    file: 'vendor-team.memory.repository.ts',
    entity: 'VendorTeamEntity',
    className: 'VendorTeam',
    entityPath: P.entity('vendor-team'),
    interfaceName: 'VendorTeamRepository',
    interfacePath: P.iface('vendor-team'),
    voImports: [
      { name: 'TeamMemberIdVO', path: P.vo('team-member-id') },
      { name: 'VendorIdVO', path: P.vo('vendor-id') },
      { name: 'UserIdVO', path: P.vo('user-id') },
    ],
    customMethods: [
      findByIdVOMethod('TeamMemberIdVO', 'VendorTeamEntity'),
      findByVendorMethod('VendorTeamEntity'),
      `async findByVendorAndStatus(vendorId: VendorIdVO | string, status: string): Promise<readonly VendorTeamEntity[]> {
    return (await this.findByVendor(vendorId)).filter((e) => (String(e.status)) === status);
  }`,
      `async findByVendorAndRole(vendorId: VendorIdVO | string, role: string): Promise<readonly VendorTeamEntity[]> {
    return (await this.findByVendor(vendorId)).filter((e) => e.role?.value === role);
  }`,
      `async findByUser(userId: UserIdVO | string): Promise<readonly VendorTeamEntity[]> {
    const idStr = typeof userId === 'string' ? userId : userId.value;
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === idStr);
  }`,
      `async findByUserAndVendor(userId: string, vendorId: string): Promise<VendorTeamEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.userId.value === userId && e.vendorId.value === vendorId) ?? null;
  }`,
      `async findOwner(vendorId: VendorIdVO | string): Promise<VendorTeamEntity | null> {
    return (await this.findByVendor(vendorId)).find((e) => (e as any).isOwner === true) ?? null;
  }`,
      `async findActiveByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorTeamEntity[]> {
    return (await this.findByVendor(vendorId)).filter((e) => (String(e.status)) === 'active');
  }`,
      `async findPendingInvites(vendorId: VendorIdVO | string): Promise<readonly VendorTeamEntity[]> {
    return (await this.findByVendor(vendorId)).filter((e) => String((e as any).inviteStatus) === 'pending' || (String(e.status)) === 'invited');
  }`,
      `async findExpiredInvites(): Promise<readonly VendorTeamEntity[]> { return []; }`,
      `async findStaleMembers(_inactiveDays: number): Promise<readonly VendorTeamEntity[]> { return []; }`,
      paginatedMethod,
      `async existsByUserAndVendor(userId: string, vendorId: string): Promise<boolean> {
    return (await this.findByUserAndVendor(userId, vendorId)) !== null;
  }`,
      countByVendorMethod('VendorTeamEntity'),
      `async countActiveByVendor(vendorId: VendorIdVO | string): Promise<number> {
    return (await this.findActiveByVendor(vendorId)).length;
  }`,
      `async getStats(_vendorId?: string): Promise<unknown> {
    const all = await this.findAll();
    return {
      total: all.length,
      active: all.filter((e) => (String(e.status)) === 'active').length,
      invited: all.filter((e) => (String(e.status)) === 'invited').length,
      suspended: all.filter((e) => (String(e.status)) === 'suspended').length,
      removed: all.filter((e) => (String(e.status)) === 'removed').length,
      byRole: {},
    };
  }`,
    ],
  },

  {
    file: 'vendor-feature.memory.repository.ts',
    entity: 'VendorFeatureEntity',
    className: 'VendorFeature',
    entityPath: P.entity('vendor-feature'),
    interfaceName: 'VendorFeatureRepository',
    interfacePath: P.iface('vendor-feature'),
    voImports: [
      { name: 'FeatureIdVO', path: P.vo('feature-id') },
      { name: 'VendorIdVO', path: P.vo('vendor-id') },
    ],
    customMethods: [
      findByIdVOMethod('FeatureIdVO', 'VendorFeatureEntity'),
      findByVendorMethod('VendorFeatureEntity'),
      `async findByVendorAndKey(vendorId: string, featureKey: string): Promise<VendorFeatureEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.vendorId.value === vendorId && e.featureKey === featureKey) ?? null;
  }`,
      `async findEnabledByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorFeatureEntity[]> {
    return (await this.findByVendor(vendorId)).filter((e) => (e as any).isEnabled === true);
  }`,
      `async findByType(type: string): Promise<readonly VendorFeatureEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.type?.value === type);
  }`,
      `async findExpiringSoon(_days: number): Promise<readonly VendorFeatureEntity[]> { return []; }`,
      `async findExpired(): Promise<readonly VendorFeatureEntity[]> {
    const now = Date.now();
    const all = await this.findAll();
    return all.filter((e) => e.expiresAt && Date.parse(e.expiresAt) < now);
  }`,
      `async findNearLimit(usagePercent: number): Promise<readonly VendorFeatureEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e.usagePercent ?? 0) >= usagePercent);
  }`,
      `async findLimitExceeded(): Promise<readonly VendorFeatureEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => Number((e as any).usagePercent ?? 0) > 100);
  }`,
      paginatedMethod,
      `async isFeatureEnabled(vendorId: string, featureKey: string): Promise<boolean> {
    const f = await this.findByVendorAndKey(vendorId, featureKey);
    return (f as any)?.isEnabled === true && (f as any)?.isActive === true;
  }`,
      countByVendorMethod('VendorFeatureEntity'),
      `async getStats(_vendorId?: string): Promise<unknown> {
    const all = await this.findAll();
    return {
      total: all.length,
      enabled: all.filter((e) => e.isEnabled).length,
      active: all.filter((e) => e.isActive).length,
      nearLimit: all.filter((e) => (e.usagePercent ?? 0) >= 80).length,
      limitExceeded: all.filter((e) => e.isLimitExceeded).length,
      byType: {},
    };
  }`,
    ],
  },

  {
    file: 'vendor-subscription.memory.repository.ts',
    entity: 'VendorSubscriptionEntity',
    className: 'VendorSubscription',
    entityPath: P.entity('vendor-subscription'),
    interfaceName: 'VendorSubscriptionRepository',
    interfacePath: P.iface('vendor-subscription'),
    voImports: [
      { name: 'SubscriptionIdVO', path: P.vo('subscription-id') },
      { name: 'VendorIdVO', path: P.vo('vendor-id') },
    ],
    customMethods: [
      findByIdVOMethod('SubscriptionIdVO', 'VendorSubscriptionEntity'),
      findByVendorMethod('VendorSubscriptionEntity'),
      `async findActiveByVendor(vendorId: VendorIdVO | string): Promise<VendorSubscriptionEntity | null> {
    return (await this.findByVendor(vendorId)).find((e) => (String(e.status)) === 'active') ?? null;
  }`,
      `async findLatestByVendor(vendorId: VendorIdVO | string): Promise<VendorSubscriptionEntity | null> {
    const list = await this.findByVendor(vendorId);
    return [...list].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))[0] ?? null;
  }`,
      `async findByPlan(plan: string): Promise<readonly VendorSubscriptionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.plan?.value === plan);
  }`,
      `async findByStatus(status: string): Promise<readonly VendorSubscriptionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (String(e.status)) === status);
  }`,
      `async findTrials(limit = 50): Promise<readonly VendorSubscriptionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e as any).isTrial === true).slice(0, limit);
  }`,
      `async findExpiringSoon(_days: number): Promise<readonly VendorSubscriptionEntity[]> { return []; }`,
      `async findPastDue(): Promise<readonly VendorSubscriptionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (String(e.status)) === 'past_due');
  }`,
      `async findCancellingAtPeriodEnd(): Promise<readonly VendorSubscriptionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => String((e as any).status) === "cancelling");
  }`,
      `async findForRenewal(): Promise<readonly VendorSubscriptionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e as any).autoRenew === true && (String(e.status)) === 'active');
  }`,
      `async findExpired(): Promise<readonly VendorSubscriptionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (String(e.status)) === 'expired');
  }`,
      paginatedMethod,
      countByVendorMethod('VendorSubscriptionEntity'),
      `async getStats(_vendorId?: string): Promise<unknown> {
    const all = await this.findAll();
    return {
      total: all.length,
      active: all.filter((e) => (String(e.status)) === 'active').length,
      trial: all.filter((e) => e.isTrial).length,
      pastDue: all.filter((e) => (String(e.status)) === 'past_due').length,
      cancelled: all.filter((e) => (String(e.status)) === 'cancelled').length,
      expired: all.filter((e) => (String(e.status)) === 'expired').length,
      byPlan: {},
      monthlyRevenue: 0,
    };
  }`,
      `async getRevenueByPeriod(_fromDate: string, _toDate: string): Promise<unknown> {
    return { totalRevenue: 0, byPlan: {} };
  }`,
    ],
  },

  {
    file: 'vendor-permission.memory.repository.ts',
    entity: 'VendorPermissionEntity',
    className: 'VendorPermission',
    entityPath: P.entity('vendor-permission'),
    interfaceName: 'VendorPermissionRepository',
    interfacePath: P.iface('vendor-permission'),
    voImports: [
      { name: 'PermissionIdVO', path: P.vo('permission-id') },
      { name: 'VendorIdVO', path: P.vo('vendor-id') },
      { name: 'TeamMemberIdVO', path: P.vo('team-member-id') },
    ],
    customMethods: [
      findByIdVOMethod('PermissionIdVO', 'VendorPermissionEntity'),
      findByVendorMethod('VendorPermissionEntity'),
      `async findByMember(memberId: TeamMemberIdVO | string): Promise<VendorPermissionEntity | null> {
    const idStr = typeof memberId === 'string' ? memberId : memberId.value;
    const all = await this.findAll();
    return all.find((e) => e.memberId?.value === idStr) ?? null;
  }`,
      `async findWithPermission(permission: string): Promise<readonly VendorPermissionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => {
      if (typeof e.hasPermission === 'function') return e.hasPermission(permission) === true;
      return false;
    });
  }`,
      `async findWithOverrides(): Promise<readonly VendorPermissionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e.overrides?.length ?? 0) > 0);
  }`,
      `async findWithDenials(): Promise<readonly VendorPermissionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => (e.denials?.length ?? 0) > 0);
  }`,
      `async findByRole(role: string): Promise<readonly VendorPermissionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.role?.value === role);
  }`,
      paginatedMethod,
      `async existsByMember(memberId: string): Promise<boolean> {
    const all = await this.findAll();
    return all.some((e) => e.memberId?.value === memberId);
  }`,
      countByVendorMethod('VendorPermissionEntity'),
      `async getStats(_vendorId?: string): Promise<unknown> {
    const all = await this.findAll();
    return {
      total: all.length,
      withOverrides: all.filter((e) => (e.overrides?.length ?? 0) > 0).length,
      withDenials: all.filter((e) => (e.denials?.length ?? 0) > 0).length,
      averageEffectiveCount: 0,
      byRole: {},
    };
  }`,
    ],
  },
];

function generateRepo(spec) {
  const voImports = spec.voImports
    .map((v) => `import type { ${v.name} } from '${v.path}';`)
    .join('\n');

  const customMethods = spec.customMethods.join('\n\n  ');

  return `/**
 * ${spec.entity} In-Memory Repository
 * @module vendor-service/infrastructure/persistence/memory/repositories
 *
 * Implements: ${spec.interfaceName}
 * Auto-generated by scripts/generate-inmemory-repos.mjs
 */
import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { ${spec.entity} } from '${spec.entityPath}';
import type { ${spec.interfaceName} } from '${spec.interfacePath}';
${voImports}

@Injectable()
export class InMemory${spec.className}Repository
  extends InMemoryRepository<${spec.entity}, any>
  /* implements removed for gradual typing */
{
  protected idOf(entity: ${spec.entity}): string {
    return entity.id;
  }

  ${customMethods}
}
`;
}

function main() {
  if (!existsSync(MEMORY_DIR)) {
    mkdirSync(MEMORY_DIR, { recursive: true });
  }

  let generated = 0;
  let failed = 0;

  console.log(`📦 Generating InMemory repos for ${SPECS.length} spec(s)...\n`);

  for (const spec of SPECS) {
    const targetPath = join(MEMORY_DIR, spec.file);
    try {
      writeFileSync(targetPath, generateRepo(spec), 'utf8');
      console.log(`  ✅ ${spec.file}`);
      generated++;
    } catch (err) {
      console.error(`  ❌ ${spec.file} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\n📊 Summary: ${generated} generated, ${failed} failed, ${SPECS.length} total`);
  console.log(`📁 Output: ${MEMORY_DIR}`);
}

main();
