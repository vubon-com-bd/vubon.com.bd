/**
 * VendorPerformancePrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  VendorPerformanceRepository,
  PerformanceStats,
} from '../../../../domain/repositories/vendor-performance.repository.interface.js';
import { VendorPerformanceEntity } from '../../../../domain/entities/vendor-performance.entity.js';
import { PerformanceGradeVO } from '../../../../domain/value-objects/primitives/performance-grade.vo.js';
import { VendorPerformancePrismaMapper } from '../mappers/vendor-performance.prisma-mapper.js';

@Injectable()
export class VendorPerformancePrismaRepository implements VendorPerformanceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorPerformanceEntity | null> {
    const row = await this.prisma.vendorPerformance.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? VendorPerformancePrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorPerformanceEntity[]> {
    const rows = await this.prisma.vendorPerformance.findMany({
      where: { deletedAt: null },
      orderBy: { evaluationPeriodEnd: 'desc' },
    });
    return rows.map((r) => VendorPerformancePrismaMapper.toDomain(r));
  }

  async findByVendorId(vendorId: string): Promise<readonly VendorPerformanceEntity[]> {
    const rows = await this.prisma.vendorPerformance.findMany({
      where: { vendorId, deletedAt: null },
      orderBy: { evaluationPeriodEnd: 'desc' },
    });
    return rows.map((r) => VendorPerformancePrismaMapper.toDomain(r));
  }

  async findLatestByVendorId(vendorId: string): Promise<VendorPerformanceEntity | null> {
    const row = await this.prisma.vendorPerformance.findFirst({
      where: { vendorId, deletedAt: null },
      orderBy: { evaluationPeriodEnd: 'desc' },
    });
    return row ? VendorPerformancePrismaMapper.toDomain(row) : null;
  }

  async findByGrade(grade: PerformanceGradeVO): Promise<readonly VendorPerformanceEntity[]> {
    const rows = await this.prisma.vendorPerformance.findMany({
      where: { grade: grade.value, deletedAt: null },
    });
    return rows.map((r) => VendorPerformancePrismaMapper.toDomain(r));
  }

  async findAtRisk(): Promise<readonly VendorPerformanceEntity[]> {
    const rows = await this.prisma.vendorPerformance.findMany({
      where: { overallScore: { lt: 60 }, deletedAt: null },
      orderBy: { overallScore: 'asc' },
    });
    return rows.map((r) => VendorPerformancePrismaMapper.toDomain(r));
  }

  async findAutoSuspendCandidates(): Promise<readonly VendorPerformanceEntity[]> {
    const rows = await this.prisma.vendorPerformance.findMany({
      where: {
        overallScore: { lt: 40 },
        isSuspended: false,
        deletedAt: null,
      },
    });
    return rows.map((r) => VendorPerformancePrismaMapper.toDomain(r));
  }

  async findReinstatementCandidates(): Promise<readonly VendorPerformanceEntity[]> {
    const rows = await this.prisma.vendorPerformance.findMany({
      where: {
        overallScore: { gte: 80 },
        isSuspended: true,
        deletedAt: null,
      },
    });
    return rows.map((r) => VendorPerformancePrismaMapper.toDomain(r));
  }

  async findEvaluationDue(): Promise<readonly VendorPerformanceEntity[]> {
    const rows = await this.prisma.vendorPerformance.findMany({
      where: {
        evaluationPeriodEnd: { lte: new Date() },
        deletedAt: null,
      },
      orderBy: { evaluationPeriodEnd: 'asc' },
    });
    return rows.map((r) => VendorPerformancePrismaMapper.toDomain(r));
  }

  async getStats(): Promise<PerformanceStats> {
    const [avgAgg, gradeGroups, atRisk, suspended, warned] = await Promise.all([
      this.prisma.vendorPerformance.aggregate({
        _avg: { overallScore: true },
        where: { deletedAt: null },
      }),
      this.prisma.vendorPerformance.groupBy({
        by: ['grade'],
        _count: { _all: true },
        where: { deletedAt: null },
      }),
      this.prisma.vendorPerformance.count({
        where: { overallScore: { lt: 60 }, deletedAt: null },
      }),
      this.prisma.vendorPerformance.count({
        where: { isSuspended: true, deletedAt: null },
      }),
      this.prisma.vendorPerformance.count({
        where: { warningIssued: true, deletedAt: null },
      }),
    ]);

    const byGrade: Record<string, number> = {};
    for (const g of gradeGroups) byGrade[g.grade] = g._count._all;

    return {
      avgScore: Number(avgAgg._avg.overallScore ?? 0),
      byGrade,
      atRiskCount: atRisk,
      suspendedCount: suspended,
      warnedCount: warned,
    };
  }

  async countByGrade(grade: PerformanceGradeVO): Promise<number> {
    return this.prisma.vendorPerformance.count({
      where: { grade: grade.value, deletedAt: null },
    });
  }

  async save(entity: VendorPerformanceEntity): Promise<VendorPerformanceEntity> {
    const data = VendorPerformancePrismaMapper.toPersistence(entity);
    const existing = await this.prisma.vendorPerformance.findFirst({ where: { id: entity.id } });
    const row = existing
      ? await this.prisma.vendorPerformance.update({ where: { id: entity.id }, data })
      : await this.prisma.vendorPerformance.create({ data: data as never });
    return VendorPerformancePrismaMapper.toDomain(row);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendorPerformance.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.prisma.vendorPerformance.count({ where: { id, deletedAt: null } });
    return c > 0;
  }

  async deleteByVendorId(vendorId: string): Promise<void> {
    await this.prisma.vendorPerformance.updateMany({
      where: { vendorId },
      data: { deletedAt: new Date() },
    });
  }
}
