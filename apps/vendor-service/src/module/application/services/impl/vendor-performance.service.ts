/**
 * VendorPerformanceService
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_PERFORMANCE_REPOSITORY,
  type VendorPerformanceRepository,
} from '../../../domain/repositories/vendor-performance.repository.interface.js';
import { VendorPerformanceEntity } from '../../../domain/entities/vendor-performance.entity.js';
import { VendorIdGeneratorService } from '../../../domain/services/vendor-id-generator.service.js';
import {
  VENDOR_PERFORMANCE_SERVICE,
  type IVendorPerformanceService,
  type EvaluatePerformanceInput,
} from '../interfaces/vendor-performance.service.interface.js';
import type { VendorPerformanceResponseDto } from '../../dtos/responses/vendor-performance-response.dto.js';

@Injectable()
export class VendorPerformanceService implements IVendorPerformanceService {
  constructor(
    @Inject(VENDOR_PERFORMANCE_REPOSITORY)
    private readonly repo: VendorPerformanceRepository,
  ) {}

  async evaluate(input: EvaluatePerformanceInput, _actorId?: string): Promise<VendorPerformanceResponseDto> {
    const now = new Date().toISOString();
    const entity = VendorPerformanceEntity.create({
      id: VendorIdGeneratorService.generateUUID(),
      vendorId: input.vendorId,
      evaluationPeriodStart: input.evaluationPeriodStart,
      evaluationPeriodEnd: input.evaluationPeriodEnd,
      now,
    });
    entity.recalculate(now);
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async issueWarning(vendorId: string, _actorId?: string): Promise<VendorPerformanceResponseDto> {
    const entity = await this.requireLatest(vendorId);
    entity.issueWarning(new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async clearWarning(vendorId: string, _actorId?: string): Promise<VendorPerformanceResponseDto> {
    const entity = await this.requireLatest(vendorId);
    entity.clearWarning(new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async suspend(vendorId: string, _actorId?: string): Promise<VendorPerformanceResponseDto> {
    const entity = await this.requireLatest(vendorId);
    entity.suspend(new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async reinstate(vendorId: string, _actorId?: string): Promise<VendorPerformanceResponseDto> {
    const entity = await this.requireLatest(vendorId);
    entity.reinstate(new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async recalculate(vendorId: string, _actorId?: string): Promise<VendorPerformanceResponseDto> {
    const entity = await this.requireLatest(vendorId);
    entity.recalculate(new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async getLatestByVendorId(vendorId: string): Promise<VendorPerformanceResponseDto> {
    const entity = await this.requireLatest(vendorId);
    return this.toResponse(entity);
  }

  async listByVendor(vendorId: string): Promise<readonly VendorPerformanceResponseDto[]> {
    const entities = await this.repo.findByVendorId(vendorId);
    return entities.map((e) => this.toResponse(e));
  }

  private async requireLatest(vendorId: string): Promise<VendorPerformanceEntity> {
    const entity = await this.repo.findLatestByVendorId(vendorId);
    if (!entity) {
      throw new Error(`No performance record for vendor "${vendorId}"`);
    }
    return entity;
  }

  private toResponse(entity: VendorPerformanceEntity): VendorPerformanceResponseDto {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      grade: entity.grade.value as VendorPerformanceResponseDto['grade'],
      overallScore: entity.overallScore,
      metrics: entity.metrics.map((m) => ({
        metric: m.metric.value as VendorPerformanceResponseDto['metrics'][number]['metric'],
        value: m.value,
        target: m.target,
        grade: m.grade.value as VendorPerformanceResponseDto['metrics'][number]['grade'],
      })),
      evaluationPeriodStart: entity.evaluationPeriodStart,
      evaluationPeriodEnd: entity.evaluationPeriodEnd,
      orderCount: entity.orderCount,
      isSuspended: entity.isSuspended,
      warningIssued: entity.warningIssued,
      isAtRisk: entity.isAtRisk(),
      hasEnoughData: entity.hasEnoughData(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
