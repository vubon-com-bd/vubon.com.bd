import { Injectable } from '@nestjs/common';
import type { InsuranceRepository, InsuranceListOptions, InsurancePaginationResult, InsuranceStats } from '@domain/repositories/insurance.repository.interface';
import type { InsuranceEntity } from '@domain/entities/insurance.entity';
import type { InsuranceIdVO } from '@domain/value-objects/primitives/insurance-id.vo';
import { LogisticsPrismaService } from '../prisma.service.js';
import { InsurancePrismaMapper, type LogisticsInsuranceRow } from '../mappers/insurance.prisma.mapper.js';

const MODEL = 'logisticsInsurance';
interface D { findFirst: (a: unknown) => Promise<unknown>; findUnique: (a: unknown) => Promise<unknown>; findMany: (a: unknown) => Promise<unknown[]>; create: (a: unknown) => Promise<unknown>; update: (a: unknown) => Promise<unknown>; delete: (a: unknown) => Promise<unknown>; count: (a?: unknown) => Promise<number>; }

@Injectable()
export class InsurancePrismaRepository implements InsuranceRepository {
  constructor(private readonly prisma: LogisticsPrismaService) {}
  private get delegate(): D { return this.prisma.getModel<D>(MODEL); }
  async findById(id: string): Promise<InsuranceEntity | null> { return this.findByIdVO({ value: id } as InsuranceIdVO); }
  async findByIdVO(id: InsuranceIdVO): Promise<InsuranceEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { id: id.value, deletedAt: null } })) as LogisticsInsuranceRow | null;
    return raw ? InsurancePrismaMapper.toDomain(raw) : null;
  }
  async findAll(): Promise<readonly InsuranceEntity[]> {
    const rows = (await this.delegate.findMany({ where: { deletedAt: null }, orderBy: { createdAt: 'desc' } })) as LogisticsInsuranceRow[];
    return rows.map((r) => InsurancePrismaMapper.toDomain(r));
  }
  async save(e: InsuranceEntity): Promise<InsuranceEntity> {
    const d = InsurancePrismaMapper.toPersistence(e);
    const x = (await this.delegate.findUnique({ where: { id: e.id }, select: { id: true } })) as { id: string } | null;
    if (x) return InsurancePrismaMapper.toDomain((await this.delegate.update({ where: { id: e.id }, data: d as never })) as LogisticsInsuranceRow);
    return InsurancePrismaMapper.toDomain((await this.delegate.create({ data: d as never })) as LogisticsInsuranceRow);
  }
  async delete(id: string): Promise<void> { await this.delegate.delete({ where: { id } }); }
  async exists(id: string): Promise<boolean> { return (await this.delegate.count({ where: { id } })) > 0; }
  async findByPolicyNumber(policyNumber: string): Promise<InsuranceEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { policyNumber, deletedAt: null } })) as LogisticsInsuranceRow | null;
    return raw ? InsurancePrismaMapper.toDomain(raw) : null;
  }
  async findByShipmentId(shipmentId: string): Promise<InsuranceEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { shipmentId, deletedAt: null } })) as LogisticsInsuranceRow | null;
    return raw ? InsurancePrismaMapper.toDomain(raw) : null;
  }
  async findByOrderId(orderId: string): Promise<readonly InsuranceEntity[]> {
    const rows = (await this.delegate.findMany({ where: { orderId, deletedAt: null } })) as LogisticsInsuranceRow[];
    return rows.map((r) => InsurancePrismaMapper.toDomain(r));
  }
  async findByUserId(userId: string): Promise<readonly InsuranceEntity[]> {
    const rows = (await this.delegate.findMany({ where: { userId, deletedAt: null } })) as LogisticsInsuranceRow[];
    return rows.map((r) => InsurancePrismaMapper.toDomain(r));
  }
  async findByStatus(status: string): Promise<readonly InsuranceEntity[]> {
    const rows = (await this.delegate.findMany({ where: { status, deletedAt: null } })) as LogisticsInsuranceRow[];
    return rows.map((r) => InsurancePrismaMapper.toDomain(r));
  }
  async findClaimable(): Promise<readonly InsuranceEntity[]> {
    const rows = (await this.delegate.findMany({ where: { status: 'active', isClaimed: false, deletedAt: null } })) as LogisticsInsuranceRow[];
    return rows.map((r) => InsurancePrismaMapper.toDomain(r));
  }
  async findExpiring(days: number): Promise<readonly InsuranceEntity[]> {
    const cutoff = new Date(Date.now() + days * 86400_000);
    const rows = (await this.delegate.findMany({ where: { expiresAt: { lt: cutoff }, status: 'active', deletedAt: null } })) as LogisticsInsuranceRow[];
    return rows.map((r) => InsurancePrismaMapper.toDomain(r));
  }
  async findPaginated(options: InsuranceListOptions): Promise<InsurancePaginationResult> {
    const opts = options as unknown as Record<string, unknown>;
    const page = (opts['page'] as number) ?? 1;
    const limit = (opts['limit'] as number) ?? 20;
    const filter = (opts['filter'] as Record<string, unknown>) ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (filter['status']) where['status'] = filter['status'];
    if (filter['userId']) where['userId'] = filter['userId'];
    const [rows, total] = await Promise.all([
      this.delegate.findMany({ where: where as never, orderBy: { [(opts['sortBy'] as string) ?? 'createdAt']: opts['sortDir'] ?? 'desc' } as never, skip: (page - 1) * limit, take: limit }) as Promise<LogisticsInsuranceRow[]>,
      this.delegate.count({ where: where as never }),
    ]);
    return { items: rows.map((r) => InsurancePrismaMapper.toDomain(r)), total, page, limit, totalPages: Math.ceil(total / limit) } as InsurancePaginationResult;
  }
  async getStats(_fromDate?: string, _toDate?: string): Promise<InsuranceStats> {
    const rows = (await this.delegate.findMany({ where: { deletedAt: null }, select: { status: true, type: true } })) as Array<{ status: string; type: string }>;
    const byStatus: Record<string, number> = {}; const byType: Record<string, number> = {};
    for (const r of rows) { byStatus[r.status] = (byStatus[r.status] ?? 0) + 1; byType[r.type] = (byType[r.type] ?? 0) + 1; }
    return { total: rows.length, byStatus, byType } as InsuranceStats;
  }
  async softDelete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async findExpiringWithinDays(days: number): Promise<readonly InsuranceEntity[]> {
    const cutoff = new Date(Date.now() + days * 86400_000);
    const rows = (await this.delegate.findMany({ where: { expiresAt: { lt: cutoff }, status: 'active', deletedAt: null } })) as LogisticsInsuranceRow[];
    return rows.map((r) => InsurancePrismaMapper.toDomain(r));
  }

  async existsByPolicyNumber(policyNumber: string): Promise<boolean> { return (await this.delegate.count({ where: { policyNumber } })) > 0; }
}
