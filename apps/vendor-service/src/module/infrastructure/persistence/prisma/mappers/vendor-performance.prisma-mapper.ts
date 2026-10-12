/**
 * VendorPerformancePrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { VendorPerformance as PrismaVendorPerformance } from '@prisma/client';
import { VendorPerformanceEntity } from '../../../../domain/entities/vendor-performance.entity.js';
import type { PerformanceMetricEntry } from '../../../../domain/entities/vendor-performance.entity.js';
import { PerformanceGradeVO } from '../../../../domain/value-objects/primitives/performance-grade.vo.js';
import { PerformanceMetricTypeVO } from '../../../../domain/value-objects/primitives/performance-metric-type.vo.js';

interface RawMetric {
  metric: string;
  value: number;
  target: number;
  grade: string;
}

export class VendorPerformancePrismaMapper {
  static toDomain(row: PrismaVendorPerformance): VendorPerformanceEntity {
    const rawMetrics = (row.metrics as unknown as RawMetric[]) ?? [];
    const metrics: PerformanceMetricEntry[] = rawMetrics.map((m) => ({
      metric: PerformanceMetricTypeVO.create(m.metric),
      value: m.value,
      target: m.target,
      grade: PerformanceGradeVO.create(m.grade),
    }));

    return VendorPerformanceEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      version: row.version,
      props: {
        vendorId: row.vendorId,
        grade: PerformanceGradeVO.create(row.grade),
        overallScore: Number(row.overallScore),
        metrics,
        evaluationPeriodStart: row.evaluationPeriodStart.toISOString(),
        evaluationPeriodEnd: row.evaluationPeriodEnd.toISOString(),
        orderCount: row.orderCount,
        isSuspended: row.isSuspended,
        warningIssued: row.warningIssued,
      },
    });
  }

  static toPersistence(entity: VendorPerformanceEntity): Record<string, unknown> {
    const metrics: RawMetric[] = entity.metrics.map((m) => ({
      metric: m.metric.value,
      value: m.value,
      target: m.target,
      grade: m.grade.value,
    }));
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      grade: entity.grade.value,
      overallScore: entity.overallScore,
      metrics,
      evaluationPeriodStart: new Date(entity.evaluationPeriodStart),
      evaluationPeriodEnd: new Date(entity.evaluationPeriodEnd),
      orderCount: entity.orderCount,
      isSuspended: entity.isSuspended,
      warningIssued: entity.warningIssued,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
