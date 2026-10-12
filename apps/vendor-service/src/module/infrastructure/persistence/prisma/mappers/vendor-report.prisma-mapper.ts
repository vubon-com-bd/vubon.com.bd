/**
 * VendorReportPrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { VendorReport as PrismaVendorReport } from '@prisma/client';
import { VendorReportEntity } from '../../../../domain/entities/vendor-report.entity.js';
import { VendorReportTypeVO } from '../../../../domain/value-objects/primitives/vendor-report-type.vo.js';
import { VendorReportFormatVO } from '../../../../domain/value-objects/primitives/vendor-report-format.vo.js';
import { VendorReportPeriodVO } from '../../../../domain/value-objects/primitives/vendor-report-period.vo.js';
import { VendorReportStatusVO } from '../../../../domain/value-objects/primitives/vendor-report-status.vo.js';

export class VendorReportPrismaMapper {
  static toDomain(row: PrismaVendorReport): VendorReportEntity {
    return VendorReportEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      version: row.version,
      props: {
        vendorId: row.vendorId,
        type: VendorReportTypeVO.create(row.type),
        format: VendorReportFormatVO.create(row.format),
        period: VendorReportPeriodVO.create(row.period),
        periodStart: row.periodStart.toISOString(),
        periodEnd: row.periodEnd.toISOString(),
        status: VendorReportStatusVO.create(row.status),
        fileUrl: row.fileUrl ?? undefined,
        fileSize: row.fileSize ?? undefined,
        generatedAt: row.generatedAt?.toISOString(),
        expiresAt: row.expiresAt?.toISOString(),
        generatedBy: row.generatedBy ?? undefined,
        failureReason: row.failureReason ?? undefined,
      },
    });
  }

  static toPersistence(entity: VendorReportEntity): Record<string, unknown> {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      type: entity.type.value,
      format: entity.format.value,
      period: entity.period.value,
      periodStart: new Date(entity.periodStart),
      periodEnd: new Date(entity.periodEnd),
      status: entity.status.value,
      fileUrl: entity.fileUrl,
      fileSize: entity.fileSize,
      generatedAt: entity.generatedAt ? new Date(entity.generatedAt) : null,
      expiresAt: entity.expiresAt ? new Date(entity.expiresAt) : null,
      generatedBy: entity.generatedBy,
      failureReason: entity.failureReason,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
