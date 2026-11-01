/**
 * VendorPerformancePrismaMapper — row ↔ domain entity
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 *
 * Note: Prisma schema uses `evaluationPeriodStart` / `evaluationPeriodEnd`.
 * Domain VO uses `periodStart` / `periodEnd`. Mapper aliases accordingly.
 */
import { VendorPerformanceEntity } from '../../../../domain/entities/vendor-performance.entity.js';
import { VendorPerformanceVO, type PerformanceGradeValue } from '../../../../domain/value-objects/composites/vendor-performance.vo.js';
import { PerformanceIdVO } from '../../../../domain/value-objects/primitives/performance-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { ScoreValueVO } from '../../../../domain/value-objects/primitives/score-value.vo.js';

export interface VendorPerformancePrismaRow {
  id: string;
  vendorId: string;
  overallScore: unknown;
  grade: string;
  orderFulfillmentRate: unknown;
  onTimeShippingRate: unknown;
  orderCancellationRate: unknown;
  returnRate: unknown;
  customerSatisfaction: unknown;
  averageResponseTimeHours: unknown;
  averageResolutionTimeHours: unknown;
  totalOrders: number;
  evaluationPeriodStart: Date;
  evaluationPeriodEnd: Date;
  evaluatedAt: Date;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toNum = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v) {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v ?? 0);
};

export class VendorPerformancePrismaMapper {
  static toDomain(raw: VendorPerformancePrismaRow): VendorPerformanceEntity {
    const vo = VendorPerformanceVO.reconstitute({
      id: PerformanceIdVO.reconstitute(raw.id),
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      overallScore: ScoreValueVO.reconstitute(toNum(raw.overallScore)),
      grade: raw.grade as PerformanceGradeValue,
      orderFulfillmentRate: toNum(raw.orderFulfillmentRate),
      onTimeShippingRate: toNum(raw.onTimeShippingRate),
      orderCancellationRate: toNum(raw.orderCancellationRate),
      returnRate: toNum(raw.returnRate),
      customerSatisfaction: toNum(raw.customerSatisfaction),
      averageResponseTimeHours: toNum(raw.averageResponseTimeHours),
      averageResolutionTimeHours: toNum(raw.averageResolutionTimeHours),
      totalOrders: raw.totalOrders,
      periodStart: new Date(raw.evaluationPeriodStart).toISOString(),
      periodEnd: new Date(raw.evaluationPeriodEnd).toISOString(),
      evaluatedAt: new Date(raw.evaluatedAt).toISOString(),
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
    });

    return VendorPerformanceEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      props: { vo },
    });
  }

  static toPersistence(entity: VendorPerformanceEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      vendorId: vo.vendorId.value,
      overallScore: vo.overallScore.score,
      grade: vo.grade,
      orderFulfillmentRate: vo.orderFulfillmentRate,
      onTimeShippingRate: vo.onTimeShippingRate,
      orderCancellationRate: vo.orderCancellationRate,
      returnRate: vo.returnRate,
      customerSatisfaction: vo.customerSatisfaction,
      averageResponseTimeHours: vo.averageResponseTimeHours,
      averageResolutionTimeHours: vo.averageResolutionTimeHours,
      totalOrders: vo.totalOrders,
      evaluationPeriodStart: new Date(vo.periodStart),
      evaluationPeriodEnd: new Date(vo.periodEnd),
      evaluatedAt: new Date(vo.evaluatedAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
