import { Injectable } from '@nestjs/common';
import { LoyaltyTier as PrismaLoyaltyTier } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { LoyaltyTierEntity } from '../../../../domain/entities/loyalty-tier.entity';
import { LoyaltyTierCompositeVO } from '../../../../domain/value-objects/composites/loyalty-tier-composite.vo';
import { LoyaltyTierVO } from '../../../../domain/value-objects/primitives/loyalty-tier.vo';
import { LoyaltyPointsVO } from '../../../../domain/value-objects/primitives/loyalty-points.vo';
import type { LoyaltyTierRepository } from '../../../../domain/repositories/loyalty-tier.repository.interface';

@Injectable()
export class LoyaltyTierPrismaRepository
  extends BasePrismaRepository<LoyaltyTierEntity, string>
  implements LoyaltyTierRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaLoyaltyTier): LoyaltyTierEntity {
    return LoyaltyTierEntity.reconstitute(
      raw.id,
      {
        tier: LoyaltyTierCompositeVO.create({
          tier: LoyaltyTierVO.create(raw.name),
          minPoints: LoyaltyPointsVO.create(raw.minPoints),
          benefits: [],
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<LoyaltyTierEntity | null> {
    const raw = await this.prisma.loyaltyTier.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly LoyaltyTierEntity[]> {
    const rows = await this.prisma.loyaltyTier.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: LoyaltyTierEntity): Promise<LoyaltyTierEntity> {
    const data = {
      name: entity.tier.tier.value,
      minPoints: entity.tier.minPoints.value,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.loyaltyTier.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.loyaltyTier.delete({ where: { id } });
  }

  async findByTier(tier: LoyaltyTierVO): Promise<LoyaltyTierEntity | null> {
    const raw = await this.prisma.loyaltyTier.findUnique({ where: { name: tier.value } });
    return raw ? this.toDomain(raw) : null;
  }
}
