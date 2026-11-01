/**
 * PerformanceTrackerService — internal helper to persist performance snapshots
 * @module vendor-service/infrastructure/services/internal
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  VENDOR_PERFORMANCE_REPOSITORY,
  type VendorPerformanceRepository,
} from '../../../domain/repositories/vendor-performance.repository.interface.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { PerformanceCalculatorService } from '../../../domain/services/performance-calculator.service.js';

export interface TrackPerformanceInput {
  readonly vendorId: string;
  readonly metrics: {
    readonly orderFulfillmentRate: number;
    readonly onTimeShippingRate: number;
    readonly orderCancellationRate: number;
    readonly returnRate: number;
    readonly customerSatisfaction: number;
    readonly averageResponseTimeHours: number;
    readonly averageResolutionTimeHours: number;
    readonly totalOrders: number;
  };
}

@Injectable()
export class PerformanceTrackerService {
  private readonly logger = new Logger(PerformanceTrackerService.name);

  constructor(
    @Inject(VENDOR_PERFORMANCE_REPOSITORY)
    private readonly repo: VendorPerformanceRepository,
  ) {}

  async track(input: TrackPerformanceInput): Promise<{
    readonly overallScore: number;
    readonly grade: string;
  }> {
    const score = PerformanceCalculatorService.computeScore(input.metrics);
    const latest = await this.repo.findLatestByVendor(VendorIdVO.create(input.vendorId));
    this.logger.log(
      `Performance evaluated for ${input.vendorId}: ${score.overallScore} (${score.grade})${
        latest ? ` prev=${latest.overallScore.score}` : ''
      }`,
    );
    return { overallScore: score.overallScore, grade: score.grade };
  }
}
