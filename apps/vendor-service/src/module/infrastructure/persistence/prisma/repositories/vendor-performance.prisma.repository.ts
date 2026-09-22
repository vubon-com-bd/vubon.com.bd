import { Injectable } from '@nestjs/common';
import { VendorPerformance as PrismaVendorPerformance } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorPerformanceEntity } from '../../../../domain/entities/vendor-performance.entity';
import { PerformanceIdVO } from '../../../../domain/value-objects/primitives/performance-id.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { RatingValueVO } from '../../../../domain/value-objects/primitives/rating-value.vo';
import { ScoreValueVO } from '../../../../domain/value-objects/primitives/score-value.vo';
import type { VendorPerformanceRepository } from '../../../../domain/repositories/vendor-performance.repository.interface';

@Injectable()
export class VendorPerformancePrismaRepository
  extends BasePrismaRepository<VendorPerformanceEntity, PerformanceIdVO>
  implements VendorPerformanceRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendorPerformance): VendorPerformanceEntity {
    return VendorPerformanceEntity.reconstitute(
      PerformanceIdVO.create(raw.id),
      {
        vendorId: VendorIdVO.create(raw.vendorId),
        overallScore: ScoreValueVO.create(raw.overallScore),
        rating: RatingValueVO.create(raw.rating),
        totalOrders: raw.totalOrders,
        completedOrders: raw.completedOrders,
        cancelledOrders: raw.cancelledOrders,
        avgResponseTimeHours: raw.avgResponseTimeHours,
        onTimeDeliveryRate: raw.onTimeDeliveryRate,
        periodStart: raw.periodStart,
        periodEnd: raw.periodEnd,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: PerformanceIdVO): Promise<VendorPerformanceEntity | null> {
    const raw = await this.prisma.vendorPerformance.findUnique({
      where: { id: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorPerformanceEntity[]> {
    const rows = await this.prisma.vendorPerformance.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorPerformanceEntity): Promise<VendorPerformanceEntity> {
    const data = {
      overallScore: entity.overallScore.numeric,
      rating: entity.rating.value,
      totalOrders: entity.totalOrders,
      completedOrders: entity.completedOrders,
      cancelledOrders: entity.cancelledOrders,
      avgResponseTimeHours: entity.avgResponseTimeHours,
      onTimeDeliveryRate: entity.onTimeDeliveryRate,
      periodStart: entity.periodStart,
      periodEnd: entity.periodEnd,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vendorPerformance.upsert({
      where: { vendorId: entity.vendorId.value },
      create: { id: entity.id.value, vendorId: entity.vendorId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: PerformanceIdVO): Promise<void> {
    await this.prisma.vendorPerformance.delete({ where: { id: id.value } });
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<VendorPerformanceEntity | null> {
    const raw = await this.prisma.vendorPerformance.findUnique({
      where: { vendorId: vendorId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
