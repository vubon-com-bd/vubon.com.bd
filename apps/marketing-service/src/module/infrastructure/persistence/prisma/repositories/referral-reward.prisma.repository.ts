import { Injectable } from '@nestjs/common';
import { ReferralReward as PrismaReferralReward } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ReferralRewardEntity } from '../../../../domain/entities/referral-reward.entity';
import { ReferralRewardCompositeVO } from '../../../../domain/value-objects/composites/referral-reward.vo';
import { ReferralIdVO } from '../../../../domain/value-objects/primitives/referral-id.vo';
import { ReferralRewardVO } from '../../../../domain/value-objects/primitives/referral-reward.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { ReferralRewardRepository } from '../../../../domain/repositories/referral-reward.repository.interface';

@Injectable()
export class ReferralRewardPrismaRepository
  extends BasePrismaRepository<ReferralRewardEntity, string>
  implements ReferralRewardRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaReferralReward): ReferralRewardEntity {
    return ReferralRewardEntity.reconstitute(
      raw.id,
      {
        referralId: ReferralIdVO.create(raw.referralId),
        reward: ReferralRewardCompositeVO.create({
          reward: ReferralRewardVO.create(String(raw.value)),
          userId: UserIdVO.create(raw.userId),
          orderId: null,
          status: raw.status,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<ReferralRewardEntity | null> {
    const raw = await this.prisma.referralReward.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ReferralRewardEntity[]> {
    const rows = await this.prisma.referralReward.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ReferralRewardEntity): Promise<ReferralRewardEntity> {
    const data = {
      referralId: entity.referralId.value,
      userId: entity.reward.userId.value,
      rewardType: entity.reward.reward.value,
      value: Number(entity.reward.reward.value),
      status: entity.reward.status,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.referralReward.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.referralReward.delete({ where: { id } });
  }

  async findByReferral(referralId: ReferralIdVO): Promise<readonly ReferralRewardEntity[]> {
    const rows = await this.prisma.referralReward.findMany({
      where: { referralId: referralId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
