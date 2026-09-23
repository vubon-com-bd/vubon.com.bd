import { Injectable } from '@nestjs/common';
import { AffiliatePayout as PrismaAffiliatePayout } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { AffiliatePayoutEntity } from '../../../../domain/entities/affiliate-payout.entity';
import { AffiliatePayoutIdVO } from '../../../../domain/value-objects/primitives/affiliate-payout-id.vo';
import { AffiliatePayoutAmountVO } from '../../../../domain/value-objects/primitives/affiliate-payout-amount.vo';
import { AffiliatePayoutStatusVO } from '../../../../domain/value-objects/primitives/affiliate-payout-status.vo';
import { AffiliateIdVO } from '../../../../domain/value-objects/primitives/affiliate-id.vo';
import type { AffiliatePayoutRepository } from '../../../../domain/repositories/affiliate-payout.repository.interface';

@Injectable()
export class AffiliatePayoutPrismaRepository
  extends BasePrismaRepository<AffiliatePayoutEntity, AffiliatePayoutIdVO>
  implements AffiliatePayoutRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaAffiliatePayout): AffiliatePayoutEntity {
    return AffiliatePayoutEntity.reconstitute(
      AffiliatePayoutIdVO.create(raw.id),
      {
        affiliateId: AffiliateIdVO.create(raw.affiliateId),
        amount: AffiliatePayoutAmountVO.create(raw.amount, raw.currency as never),
        status: AffiliatePayoutStatusVO.create(raw.status),
        processedAt: raw.processedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: AffiliatePayoutIdVO): Promise<AffiliatePayoutEntity | null> {
    const raw = await this.prisma.affiliatePayout.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AffiliatePayoutEntity[]> {
    const rows = await this.prisma.affiliatePayout.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: AffiliatePayoutEntity): Promise<AffiliatePayoutEntity> {
    const data = {
      affiliateId: entity.affiliateId.value,
      amount: entity.amount.amount,
      currency: entity.amount.currency,
      status: entity.status.value,
      processedAt: entity.processedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.affiliatePayout.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: AffiliatePayoutIdVO): Promise<void> {
    await this.prisma.affiliatePayout.delete({ where: { id: id.value } });
  }

  async findByAffiliate(affiliateId: AffiliateIdVO): Promise<readonly AffiliatePayoutEntity[]> {
    const rows = await this.prisma.affiliatePayout.findMany({
      where: { affiliateId: affiliateId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
