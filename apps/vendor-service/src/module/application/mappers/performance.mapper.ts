/**
 * PerformanceMapper
 * @module vendor-service/application/mappers
 */
import type { VendorPerformanceEntity } from '../../domain/entities/vendor-performance.entity.js';
import type {
  PerformanceResponseDTO,
  PerformanceSummaryResponseDTO,
} from '../dtos/responses/performance-response.dto.js';

export class PerformanceMapper {
  static toResponse(entity: VendorPerformanceEntity): PerformanceResponseDTO {
    return {
      id: entity.id,
      vendorId: entity.vendorId.value,
      overallScore: entity.overallScore.score,
      grade: entity.grade,
      orderFulfillmentRate: entity.orderFulfillmentRate,
      onTimeShippingRate: entity.onTimeShippingRate,
      orderCancellationRate: entity.orderCancellationRate,
      returnRate: entity.returnRate,
      customerSatisfaction: entity.customerSatisfaction,
      averageResponseTimeHours: entity.averageResponseTimeHours,
      averageResolutionTimeHours: entity.averageResolutionTimeHours,
      totalOrders: entity.totalOrders,
      periodStart: entity.periodStart,
      periodEnd: entity.periodEnd,
      evaluatedAt: entity.evaluatedAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toSummary(entity: VendorPerformanceEntity): PerformanceSummaryResponseDTO {
    return {
      id: entity.id,
      overallScore: entity.overallScore.score,
      grade: entity.grade,
      periodStart: entity.periodStart,
      periodEnd: entity.periodEnd,
      evaluatedAt: entity.evaluatedAt,
    };
  }
}
