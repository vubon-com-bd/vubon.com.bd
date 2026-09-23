import { Injectable } from '@nestjs/common';
import { LoyaltyReward as PrismaLoyaltyReward } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { LoyaltyRewardEntity } from '../../../../domain/entities/loyalty-reward.entity';
import { LoyaltyRewardCompositeVO } from '../../../../domain/value-objects/composites/loyalty-reward.vo';
import { LoyaltyRewardIdVO } from '../../../../domain/value-objects/primitives/loyalty-reward-id.vo';
import { LoyaltyRewardTypeVO } from '../../../../domain/value-objects/primitives/loyalty-reward-type.vo';
import { LoyaltyRewardValueVO } from '../../../../domain/value-objects/primitives/loyalty-reward-value.vo';
import { LoyaltyPointsVO } from '../../../../domain/value-objects/primitives/loyalty-points.vo';
import type { LoyaltyRewardRepository } from '../../../../domain/repositories/loyalty-reward.repository.interface';

@Injectable()
export class LoyaltyRewardPrismaRepository
  extends BasePrismaRepository<LoyaltyRewardEntity, string>
  implements LoyaltyRewardRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaLoyaltyReward): LoyaltyRewardEntity {
    return LoyaltyRewardEntity.reconstitute(
      raw.id,
      {
        reward: LoyaltyRewardCompositeVO.create({
          id: LoyaltyRewardIdVO.create(raw.id),
          type: LoyaltyRewardTypeVO.create(raw.type),
          rewardValue: LoyaltyRewardValueVO.create(String(raw.value)),
          pointsCost: LoyaltyPointsVO.create(raw.pointsCost),
          status: raw.status,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<LoyaltyRewardEntity | null> {
    const raw = await this.prisma.loyaltyReward.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly LoyaltyRewardEntity[]> {
    const rows = await this.prisma.loyaltyReward.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: LoyaltyRewardEntity): Promise<LoyaltyRewardEntity> {
    const data = {
      name: entity.reward.id.value,
      type: entity.reward.type.value,
      value: Number(entity.reward.rewardValue.value),
      pointsCost: entity.reward.pointsCost.value,
      status: entity.reward.status,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.loyaltyReward.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.loyaltyReward.delete({ where: { id } });
  }

  async findActive(): Promise<readonly LoyaltyRewardEntity[]> {
    const rows = await this.prisma.loyaltyReward.findMany({ where: { status: 'active' } });
    return rows.map((r) => this.toDomain(r));
  }
}
