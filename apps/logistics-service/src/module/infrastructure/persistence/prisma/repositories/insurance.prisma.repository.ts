import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  InsuranceRepository, InsuranceListOptions, InsurancePaginationResult, InsuranceStats,
} from '../../../../domain/repositories/insurance.repository.interface.js';
import { InsuranceEntity } from '../../../../domain/entities/insurance.entity.js';
import { InsuranceIdVO } from '../../../../domain/value-objects/primitives/insurance-id.vo.js';
import { PolicyNumberVO } from '../../../../domain/value-objects/primitives/policy-number.vo.js';
import { ShipmentIdVO } from '../../../../domain/value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { InsuranceStatusVO } from '../../../../domain/value-objects/primitives/insurance-status.vo.js';
import { InsuranceClaimStatusVO } from '../../../../domain/value-objects/primitives/insurance-claim-status.vo.js';
import { InsurancePrismaMapper } from '../insurance.prisma.mapper.js';

@Injectable()
export class InsurancePrismaRepository implements InsuranceRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findById(id: string): Promise<InsuranceEntity | null> { return this.findByIdVO(InsuranceIdVO.reconstitute(id)); }
  async findByIdVO(id: InsuranceIdVO): Promise<InsuranceEntity | null> {
    const row = await this.prisma.logisticsInsurance.findFirst({ where: { id: id.value, deletedAt: null } });
    return row ? InsurancePrismaMapper.toDomain(row as never) : null;
  }
  async findAll(): Promise<readonly InsuranceEntity[]> {
    const rows = await this.prisma.logisticsInsurance.findMany({ where: { deletedAt: null }, orderBy: { createdAt: 'desc' } });
    return rows.map((r) => InsurancePrismaMapper.toDomain(r as never));
  }
  async findByPolicyNumber(policyNumber: PolicyNumberVO): Promise<InsuranceEntity | null> {
    const row = await this.prisma.logisticsInsurance.findFirst({ where: { policyNumber: policyNumber.value, deletedAt: null } });
    return row ? InsurancePrismaMapper.toDomain(row as never) : null;
  }
  async findByShipmentId(shipmentId: ShipmentIdVO): Promise<InsuranceEntity | null> {
    const row = await this.prisma.logisticsInsurance.findFirst({ where: { shipmentId: shipmentId.value, deletedAt: null } });
    return row ? InsurancePrismaMapper.toDomain(row as never) : null;
  }
  async findByOrderId(orderId: OrderIdVO): Promise<readonly InsuranceEntity[]> {
    const rows = await this.prisma.logisticsInsurance.findMany({ where: { orderId: orderId.value, deletedAt: null }, orderBy: { createdAt: 'desc' } });
    return rows.map((r) => InsurancePrismaMapper.toDomain(r as never));
  }
  async findByUserId(userId: UserIdVO): Promise<readonly InsuranceEntity[]> {
    const rows = await this.prisma.logisticsInsurance.findMany({ where: { userId: userId.value, deletedAt: null }, orderBy: { createdAt: 'desc' } });
    return rows.map((r) => InsurancePrismaMapper.toDomain(r as never));
  }
  async findByStatus(status: InsuranceStatusVO): Promise<readonly InsuranceEntity[]> {
    const rows = await this.prisma.logisticsInsurance.findMany({ where: { status: status.value, deletedAt: null }, orderBy: { createdAt: 'desc' } });
    return rows.map((r) => InsurancePrismaMapper.toDomain(r as never));
  }
  async findByClaimStatus(status: InsuranceClaimStatusVO): Promise<readonly InsuranceEntity[]> {
    const rows = await this.prisma.logisticsInsurance.findMany({ where: { claimStatus: status.value, deletedAt: null }, orderBy: { createdAt: 'desc' } });
    return rows.map((r) => InsurancePrismaMapper.toDomain(r as never));
  }
  async findActive(): Promise<readonly InsuranceEntity[]> {
    const rows = await this.prisma.logisticsInsurance.findMany({ where: { status: 'active', deletedAt: null }, orderBy: { createdAt: 'desc' } });
    return rows.map((r) => InsurancePrismaMapper.toDomain(r as never));
  }
  async findExpiring(withinDays: number): Promise<readonly InsuranceEntity[]> {
    const cutoff = new Date(Date.now() + withinDays * 24 * 60 * 60 * 1000);
    const rows = await this.prisma.logisticsInsurance.findMany({
      where: { expiresAt: { lte: cutoff }, status: 'active', deletedAt: null },
      orderBy: { expiresAt: 'asc' },
    });
    return rows.map((r) => InsurancePrismaMapper.toDomain(r as never));
  }
  async findWithOpenClaims(): Promise<readonly InsuranceEntity[]> {
    const rows = await this.prisma.logisticsInsurance.findMany({
      where: { claimStatus: { in: ['submitted', 'under_review', 'appealed'] }, deletedAt: null },
      orderBy: { claimSubmittedAt: 'asc' },
    });
    return rows.map((r) => InsurancePrismaMapper.toDomain(r as never));
  }
  async findPaginated(options: InsuranceListOptions): Promise<InsurancePaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.shipmentId) where['shipmentId'] = f.shipmentId;
    if (f.orderId) where['orderId'] = f.orderId;
    if (f.userId) where['userId'] = f.userId;
    if (f.status) where['status'] = f.status;
    if (f.type) where['type'] = f.type;
    if (f.isClaimed !== undefined) where['isClaimed'] = f.isClaimed;
    if (f.claimStatus) where['claimStatus'] = f.claimStatus;
    if (f.fromDate || f.toDate) where['createdAt'] = { ...(f.fromDate ? { gte: new Date(f.fromDate) } : {}), ...(f.toDate ? { lte: new Date(f.toDate) } : {}) };
    const orderBy = { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' } as Record<string, 'asc' | 'desc'>;
    const [rows, total] = await Promise.all([
      this.prisma.logisticsInsurance.findMany({ where: where as never, orderBy, skip: (options.page - 1) * options.limit, take: options.limit }),
      this.prisma.logisticsInsurance.count({ where: where as never }),
    ]);
    return { items: rows.map((r) => InsurancePrismaMapper.toDomain(r as never)), total, page: options.page, limit: options.limit, totalPages: Math.ceil(total / options.limit) };
  }
  async existsByPolicyNumber(policyNumber: PolicyNumberVO): Promise<boolean> {
    return (await this.prisma.logisticsInsurance.count({ where: { policyNumber: policyNumber.value } })) > 0;
  }
  async exists(id: string): Promise<boolean> {
    return (await this.prisma.logisticsInsurance.count({ where: { id } })) > 0;
  }
  async getStats(userId?: string, fromDate?: string, toDate?: string): Promise<InsuranceStats> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (userId) where['userId'] = userId;
    if (fromDate || toDate) where['createdAt'] = { ...(fromDate ? { gte: new Date(fromDate) } : {}), ...(toDate ? { lte: new Date(toDate) } : {}) };
    const rows = await this.prisma.logisticsInsurance.findMany({
      where: where as never,
      select: { status: true, isClaimed: true, declaredValue: true, premium: true, currency: true },
    });
    let activePolicies = 0, claimedPolicies = 0, totalDeclared = 0, totalPremium = 0;
    const byStatus: Record<string, number> = {};
    const currency = rows[0]?.currency ?? 'BDT';
    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      if (r.status === 'active') activePolicies++;
      if (r.isClaimed) claimedPolicies++;
      totalDeclared += Number(r.declaredValue);
      totalPremium += Number(r.premium);
    }
    return {
      totalPolicies: rows.length, activePolicies, claimedPolicies,
      totalDeclaredValue: Math.round(totalDeclared * 100) / 100,
      totalPremium: Math.round(totalPremium * 100) / 100,
      currency, byStatus,
    };
  }
  async save(entity: InsuranceEntity): Promise<InsuranceEntity> {
    const data = InsurancePrismaMapper.toPersistence(entity);
    const existing = await this.prisma.logisticsInsurance.findUnique({ where: { id: entity.id }, select: { id: true } });
    if (existing) {
      const updated = await this.prisma.logisticsInsurance.update({ where: { id: entity.id }, data: data as never });
      return InsurancePrismaMapper.toDomain(updated as never);
    }
    const created = await this.prisma.logisticsInsurance.create({ data: data as never });
    return InsurancePrismaMapper.toDomain(created as never);
  }
  async delete(id: string): Promise<void> { await this.prisma.logisticsInsurance.delete({ where: { id } }); }
  async softDelete(id: string): Promise<void> {
    await this.prisma.logisticsInsurance.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
