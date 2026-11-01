/**
 * VendorPerformancePrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  VendorPerformanceRepository,
  VendorPerformanceListOptions,
  VendorPerformancePaginationResult,
} from '../../../../domain/repositories/vendor-performance.repository.interface.js';
import { VendorPerformanceEntity } from '../../../../domain/entities/vendor-performance.entity.js';
import { PerformanceIdVO } from '../../../../domain/value-objects/primitives/performance-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorPrismaService } from '../prisma.service.js';
import {
  VendorPerformancePrismaMapper,
  type VendorPerformancePrismaRow,
} from '../mappers/vendor-performance.prisma.mapper.js';

interface PerformanceDelegate {
  findFirst(args: unknown): Promise<VendorPerformancePrismaRow | null>;
  findMany(args: unknown): Promise<VendorPerformancePrismaRow[]>;
  create(args: unknown): Promise<VendorPerformancePrismaRow>;
  update(args: unknown): Promise<VendorPerformancePrismaRow>;
  delete(args: unknown): Promise<VendorPerformancePrismaRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class VendorPerformancePrismaRepository implements VendorPerformanceRepository {
  private readonly logger = new Logger(VendorPerformancePrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): PerformanceDelegate {
    return this.prisma.getModel<PerformanceDelegate>('vendorPerformance');
  }

  async findById(id: string): Promise<VendorPerformanceEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? VendorPerformancePrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: PerformanceIdVO): Promise<VendorPerformanceEntity | null> {
    return this.findById(id.value);
  }

  async findByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorPerformanceEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, deletedAt: null },
      orderBy: { evaluatedAt: 'desc' },
    });
    return rows.map(VendorPerformancePrismaMapper.toDomain);
  }

  async findLatestByVendor(vendorId: VendorIdVO | string): Promise<VendorPerformanceEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const raw = await this.delegate.findFirst({
      where: { vendorId: idStr, deletedAt: null },
      orderBy: { evaluatedAt: 'desc' },
    });
    return raw ? VendorPerformancePrismaMapper.toDomain(raw) : null;
  }

  async findByPeriod(
    vendorId: string,
    periodStart: string,
    periodEnd: string,
  ): Promise<VendorPerformanceEntity | null> {
    const raw = await this.delegate.findFirst({
      where: {
        vendorId,
        evaluationPeriodStart: new Date(periodStart),
        evaluationPeriodEnd: new Date(periodEnd),
        deletedAt: null,
      },
    });
    return raw ? VendorPerformancePrismaMapper.toDomain(raw) : null;
  }

  async findByGrade(grade: string): Promise<readonly VendorPerformanceEntity[]> {
    const rows = await this.delegate.findMany({
      where: { grade, deletedAt: null },
    });
    return rows.map(VendorPerformancePrismaMapper.toDomain);
  }

  async findTopPerformers(limit = 20): Promise<readonly VendorPerformanceEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { overallScore: 'desc' },
      take: limit,
    });
    return rows.map(VendorPerformancePrismaMapper.toDomain);
  }

  async findBottomPerformers(limit = 20): Promise<readonly VendorPerformanceEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { overallScore: 'asc' },
      take: limit,
    });
    return rows.map(VendorPerformancePrismaMapper.toDomain);
  }

  async findTriggeringWarning(): Promise<readonly VendorPerformanceEntity[]> {
    const rows = await this.delegate.findMany({
      where: { overallScore: { lt: 60 }, deletedAt: null },
    });
    return rows.map(VendorPerformancePrismaMapper.toDomain);
  }

  async findTriggeringAutoSuspend(): Promise<readonly VendorPerformanceEntity[]> {
    const rows = await this.delegate.findMany({
      where: { overallScore: { lt: 40 }, deletedAt: null },
    });
    return rows.map(VendorPerformancePrismaMapper.toDomain);
  }

  async findEligibleForEvaluation(): Promise<readonly VendorPerformanceEntity[]> {
    // Simplified: return latest for vendors with enough orders
    const rows = await this.delegate.findMany({
      where: { totalOrders: { gte: 10 }, deletedAt: null },
      orderBy: { evaluatedAt: 'desc' },
    });
    return rows.map(VendorPerformancePrismaMapper.toDomain);
  }

  async findAll(): Promise<readonly VendorPerformanceEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorPerformancePrismaMapper.toDomain);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: VendorPerformanceEntity): Promise<VendorPerformanceEntity> {
    const data = VendorPerformancePrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findFirst({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return VendorPerformancePrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return VendorPerformancePrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async findPaginated(options: VendorPerformanceListOptions): Promise<VendorPerformancePaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.grade) where['grade'] = Array.isArray(f.grade) ? { in: f.grade } : f.grade;
    if (f.minScore !== undefined) where['overallScore'] = { gte: f.minScore };
    if (f.maxScore !== undefined) {
      where['overallScore'] = { ...(where['overallScore'] as object ?? {}), lte: f.maxScore };
    }
    if (f.minOrders !== undefined) where['totalOrders'] = { gte: f.minOrders };
    if (f.periodStartFrom) where['evaluationPeriodStart'] = { gte: new Date(f.periodStartFrom) };
    if (f.periodEndTo) where['evaluationPeriodEnd'] = { lte: new Date(f.periodEndTo) };

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where,
        orderBy: { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' },
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where }),
    ]);

    return {
      items: rows.map(VendorPerformancePrismaMapper.toDomain),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async countByVendor(vendorId: VendorIdVO | string): Promise<number> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    return this.delegate.count({ where: { vendorId: idStr, deletedAt: null } });
  }

  async getStats(vendorId?: string): Promise<{
    readonly total: number;
    readonly averageScore: number;
    readonly averageGrade: string;
    readonly byGrade: Readonly<Record<string, number>>;
    readonly warningCount: number;
    readonly autoSuspendCount: number;
  }> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (vendorId) where['vendorId'] = vendorId;

    const rows = await this.delegate.findMany({
      where,
      select: { grade: true, overallScore: true },
    } as never) as Array<{ grade: string; overallScore: unknown }>;

    const byGrade: Record<string, number> = {};
    let totalScore = 0;
    let warningCount = 0;
    let autoSuspendCount = 0;
    for (const r of rows) {
      byGrade[r.grade] = (byGrade[r.grade] ?? 0) + 1;
      const score = Number(r.overallScore) || 0;
      totalScore += score;
      if (score < 60) warningCount += 1;
      if (score < 40) autoSuspendCount += 1;
    }

    return {
      total: rows.length,
      averageScore: rows.length ? Math.round((totalScore / rows.length) * 100) / 100 : 0,
      averageGrade: 'b',
      byGrade,
      warningCount,
      autoSuspendCount,
    };
  }
}
