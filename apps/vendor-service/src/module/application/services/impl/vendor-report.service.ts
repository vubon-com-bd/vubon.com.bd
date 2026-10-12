/**
 * VendorReportService
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_REPORT_REPOSITORY,
  type VendorReportRepository,
} from '../../../domain/repositories/vendor-report.repository.interface.js';
import { VendorReportEntity } from '../../../domain/entities/vendor-report.entity.js';
import { VendorReportTypeVO } from '../../../domain/value-objects/primitives/vendor-report-type.vo.js';
import { VendorReportFormatVO } from '../../../domain/value-objects/primitives/vendor-report-format.vo.js';
import { VendorReportPeriodVO } from '../../../domain/value-objects/primitives/vendor-report-period.vo.js';
import { VendorIdGeneratorService } from '../../../domain/services/vendor-id-generator.service.js';
import {
  VENDOR_REPORT_SERVICE,
  type IVendorReportService,
  type RequestReportInput,
} from '../interfaces/vendor-report.service.interface.js';
import type { VendorReportResponseDto } from '../../dtos/responses/vendor-report-response.dto.js';

@Injectable()
export class VendorReportService implements IVendorReportService {
  constructor(
    @Inject(VENDOR_REPORT_REPOSITORY)
    private readonly repo: VendorReportRepository,
  ) {}

  async request(input: RequestReportInput, requestedBy: string, _actorId?: string): Promise<VendorReportResponseDto> {
    const now = new Date().toISOString();
    const entity = VendorReportEntity.create({
      id: VendorIdGeneratorService.generateReportId(),
      now,
      props: {
        vendorId: input.vendorId,
        type: VendorReportTypeVO.create(input.type),
        format: VendorReportFormatVO.create(input.format),
        period: VendorReportPeriodVO.create(input.period),
        periodStart: input.periodStart,
        periodEnd: input.periodEnd,
        generatedBy: requestedBy,
      },
    });
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async startGenerating(reportId: string, _actorId?: string): Promise<VendorReportResponseDto> {
    const entity = await this.requireReport(reportId);
    entity.startGenerating(new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async markReady(reportId: string, fileUrl: string, fileSize: number, _actorId?: string): Promise<VendorReportResponseDto> {
    const entity = await this.requireReport(reportId);
    entity.markReady(fileUrl, fileSize, new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async markFailed(reportId: string, reason: string, _actorId?: string): Promise<VendorReportResponseDto> {
    const entity = await this.requireReport(reportId);
    entity.markFailed(reason, new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async getById(reportId: string): Promise<VendorReportResponseDto> {
    const entity = await this.requireReport(reportId);
    return this.toResponse(entity);
  }

  async listByVendor(vendorId: string): Promise<readonly VendorReportResponseDto[]> {
    const entities = await this.repo.findByVendorId(vendorId);
    return entities.map((e) => this.toResponse(e));
  }

  async listDownloadableByVendor(vendorId: string): Promise<readonly VendorReportResponseDto[]> {
    const entities = await this.repo.findDownloadableByVendorId(vendorId);
    return entities.map((e) => this.toResponse(e));
  }

  private async requireReport(id: string): Promise<VendorReportEntity> {
    const entity = await this.repo.findById(id);
    if (!entity) {
      throw new Error(`Report "${id}" not found`);
    }
    return entity;
  }

  private toResponse(entity: VendorReportEntity): VendorReportResponseDto {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      type: entity.type.value as VendorReportResponseDto['type'],
      format: entity.format.value as VendorReportResponseDto['format'],
      period: entity.period.value as VendorReportResponseDto['period'],
      periodStart: entity.periodStart,
      periodEnd: entity.periodEnd,
      status: entity.status.value as VendorReportResponseDto['status'],
      fileUrl: entity.fileUrl,
      fileSize: entity.fileSize,
      generatedAt: entity.generatedAt,
      expiresAt: entity.expiresAt,
      canDownload: entity.canDownload(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
