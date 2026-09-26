import { Injectable } from '@nestjs/common';
import { LoyaltyPoints as PrismaLoyaltyPoints } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { LoyaltyPointsEntity } from '../../../../domain/entities/loyalty-points.entity';
import { LoyaltyPointsCompositeVO } from '../../../../domain/value-objects/composites/loyalty-points-composite.vo';
import { LoyaltyIdVO } from '../../../../domain/value-objects/primitives/loyalty-id.vo';
import { LoyaltyPointsVO } from '../../../../domain/value-objects/primitives/loyalty-points.vo';
import type { LoyaltyPointsRepository } from '../../../../domain/repositories/loyalty-points.repository.interface';

@Injectable()
export class LoyaltyPointsPrismaRepository
  extends BasePrismaRepository<LoyaltyPointsEntity, string>
  implements LoyaltyPointsRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaLoyaltyPoints): LoyaltyPointsEntity {
    return LoyaltyPointsEntity.reconstitute(
      raw.id,
      {
        loyaltyId: LoyaltyIdVO.create(raw.loyaltyId),
        points: LoyaltyPointsCompositeVO.create({
          points: LoyaltyPointsVO.create(raw.points),
          type: raw.type,
          reason: raw.reason,
        }),
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<LoyaltyPointsEntity | null> {
    const raw = await this.prisma.loyaltyPoints.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly LoyaltyPointsEntity[]> {
    const rows = await this.prisma.loyaltyPoints.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: LoyaltyPointsEntity): Promise<LoyaltyPointsEntity> {
    const data = {
      loyaltyId: entity.loyaltyId.value,
      points: entity.points.points.value,
      type: entity.points.type,
      reason: entity.points.reason,
    };
    const raw = await this.prisma.loyaltyPoints.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.loyaltyPoints.delete({ where: { id } });
  }

  async findByLoyalty(loyaltyId: LoyaltyIdVO): Promise<readonly LoyaltyPointsEntity[]> {
    const rows = await this.prisma.loyaltyPoints.findMany({
      where: { loyaltyId: loyaltyId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
