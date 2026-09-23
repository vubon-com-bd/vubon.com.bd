import { Injectable } from '@nestjs/common';
import { CourierRate as PrismaCourierRate } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { CourierRateEntity } from '../../../../domain/entities/courier-rate.entity';
import { CourierIdVO } from '../../../../domain/value-objects/primitives/courier-id.vo';
import { ZoneIdVO } from '../../../../domain/value-objects/primitives/zone-id.vo';
import { WeightVO } from '../../../../domain/value-objects/primitives/weight.vo';
import type { CourierRateRepository } from '../../../../domain/repositories/courier-rate.repository.interface';

@Injectable()
export class CourierRatePrismaRepository
  extends BasePrismaRepository<CourierRateEntity, string>
  implements CourierRateRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaCourierRate): CourierRateEntity {
    return CourierRateEntity.reconstitute(
      raw.id,
      {
        courierId: CourierIdVO.create(raw.courierId),
        zoneId: raw.zoneId ? ZoneIdVO.create(raw.zoneId) : null,
        weightMin: WeightVO.create(raw.weightMin),
        weightMax: WeightVO.create(raw.weightMax),
        baseRate: raw.baseRate,
        perKgRate: raw.perKgRate,
        currency: raw.currency,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: string): Promise<CourierRateEntity | null> {
    const raw = await this.prisma.courierRate.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CourierRateEntity[]> {
    const rows = await this.prisma.courierRate.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: CourierRateEntity): Promise<CourierRateEntity> {
    const data = {
      courierId: entity.courierId.value,
      zoneId: entity.zoneId?.value ?? null,
      weightMin: entity.weightMin.value,
      weightMax: entity.weightMax.value,
      baseRate: entity.baseRate,
      perKgRate: entity.perKgRate,
      currency: entity.currency,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.courierRate.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.courierRate.delete({ where: { id } });
  }

  async findByCourier(courierId: CourierIdVO): Promise<readonly CourierRateEntity[]> {
    const rows = await this.prisma.courierRate.findMany({ where: { courierId: courierId.value } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByZone(zoneId: ZoneIdVO): Promise<readonly CourierRateEntity[]> {
    const rows = await this.prisma.courierRate.findMany({ where: { zoneId: zoneId.value } });
    return rows.map((r) => this.toDomain(r));
  }
}
