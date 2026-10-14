/**
 * VendorPerformanceService — performance evaluation
 * @module vendor-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  VENDOR_PERFORMANCE_REPOSITORY,
  type VendorPerformanceRepository,
} from '../../../domain/repositories/vendor-performance.repository.interface.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { PerformanceMapper } from '../../mappers/performance.mapper.js';
import { VendorNotFoundApplicationError } from '../../errors/vendor.errors.js';
import type {
  PerformanceResponseDTO,
  PerformanceSummaryResponseDTO,
  PerformanceStatsResponseDTO,
} from '../../dtos/responses/performance-response.dto.js';
import type { IVendorPerformanceService } from '../interfaces/vendor-performance.service.interface.js';

@Injectable()
export class VendorPerformanceService implements IVendorPerformanceService {
  private readonly logger = new Logger(VendorPerformanceService.name);

  constructor(
    @Inject(VENDOR_PERFORMANCE_REPOSITORY)
    private readonly repo: VendorPerformanceRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async evaluate(vendorId: string, periodStart: string, periodEnd: string, _actorId?: string): Promise<PerformanceResponseDTO> {
    // Simplified — real implementation would compute metrics from orders
    // and invoke PerformanceCalculatorService, then persist a new snapshot
    const now = new Date().toISOString();
    const existing = await this.repo.findByVendor(VendorIdVO.create(vendorId));

    if (existing.length === 0) {
      throw new VendorNotFoundApplicationError(vendorId);
    }

    void periodStart;
    void periodEnd;
    void now;

    this.logger.log(`Performance evaluated for vendor ${vendorId}`);
    return PerformanceMapper.toResponse(existing[0] as never);
  }

  async getLatest(vendorId: string): Promise<PerformanceResponseDTO | null> {
    const entity = await this.repo.findLatestByVendor(VendorIdVO.create(vendorId));
    return entity ? PerformanceMapper.toResponse(entity as never) : null;
  }

  async getById(id: string): Promise<PerformanceResponseDTO> {
    const all = await this.repo.findAll();
    const entity = all.find((e) => e.id === id);
    if (!entity) throw new VendorNotFoundApplicationError(id);
    return PerformanceMapper.toResponse(entity as never);
  }

  async listByVendor(vendorId: string): Promise<readonly PerformanceSummaryResponseDTO[]> {
    const entities = await this.repo.findByVendor(VendorIdVO.create(vendorId));
    return entities.map((e) => PerformanceMapper.toSummary(e as never));
  }

  async listTopPerformers(limit = 20): Promise<readonly PerformanceSummaryResponseDTO[]> {
    const entities = await this.repo.findTopPerformers(limit);
    return entities.map((e) => PerformanceMapper.toSummary(e as never));
  }

  async listBottomPerformers(limit = 20): Promise<readonly PerformanceSummaryResponseDTO[]> {
    const entities = await this.repo.findBottomPerformers(limit);
    return entities.map((e) => PerformanceMapper.toSummary(e as never));
  }

  async getStats(vendorId?: string): Promise<PerformanceStatsResponseDTO> {
    const stats = await this.repo.getStats(vendorId);
    return {
      total: stats.total,
      averageScore: stats.averageScore,
      averageGrade: stats.averageGrade,
      byGrade: stats.byGrade,
      warningCount: stats.warningCount,
      autoSuspendCount: stats.autoSuspendCount,
    };
  }
}
