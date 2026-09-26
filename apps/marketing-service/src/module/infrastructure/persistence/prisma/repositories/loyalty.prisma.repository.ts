import { Injectable } from '@nestjs/common';
import { Loyalty as PrismaLoyalty } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { LoyaltyEntity } from '../../../../domain/entities/loyalty.entity';
import { LoyaltyIdVO } from '../../../../domain/value-objects/primitives/loyalty-id.vo';
import { LoyaltyStatusVO } from '../../../../domain/value-objects/primitives/loyalty-status.vo';
import { LoyaltyPointsVO } from '../../../../domain/value-objects/primitives/loyalty-points.vo';
import { LoyaltyTierVO } from '../../../../domain/value-objects/primitives/loyalty-tier.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { LoyaltyRepository } from '../../../../domain/repositories/loyalty.repository.interface';

@Injectable()
export class LoyaltyPrismaRepository
  extends BasePrismaRepository<LoyaltyEntity, LoyaltyIdVO>
  implements LoyaltyRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaLoyalty): LoyaltyEntity {
    return LoyaltyEntity.reconstitute(
      LoyaltyIdVO.create(raw.id),
      {
        userId: UserIdVO.create(raw.userId),
        points: LoyaltyPointsVO.create(raw.points),
        tier: LoyaltyTierVO.create(raw.tier),
        status: LoyaltyStatusVO.create(raw.status),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: LoyaltyIdVO): Promise<LoyaltyEntity | null> {
    const raw = await this.prisma.loyalty.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly LoyaltyEntity[]> {
    const rows = await this.prisma.loyalty.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: LoyaltyEntity): Promise<LoyaltyEntity> {
    const data = {
      userId: entity.userId.value,
      points: entity.points.value,
      tier: entity.tier.value,
      status: entity.status.value,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.loyalty.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: LoyaltyIdVO): Promise<void> {
    await this.prisma.loyalty.delete({ where: { id: id.value } });
  }

  async findByUser(userId: UserIdVO): Promise<LoyaltyEntity | null> {
    const raw = await this.prisma.loyalty.findUnique({ where: { userId: userId.value } });
    return raw ? this.toDomain(raw) : null;
  }
}
