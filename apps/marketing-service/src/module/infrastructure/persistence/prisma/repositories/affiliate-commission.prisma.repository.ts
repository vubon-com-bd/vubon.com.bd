import { Injectable } from '@nestjs/common';
import { AffiliateCommission as PrismaAffiliateCommission } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { AffiliateCommissionEntity } from '../../../../domain/entities/affiliate-commission.entity';
import { AffiliateCommissionCompositeVO } from '../../../../domain/value-objects/composites/affiliate-commission-composite.vo';
import { AffiliateIdVO } from '../../../../domain/value-objects/primitives/affiliate-id.vo';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';
import { AffiliateCommissionVO } from '../../../../domain/value-objects/primitives/affiliate-commission.vo';
import { MoneyVO } from '@vubon/shared-kernel/domain/primitives/money.vo';
import type { AffiliateCommissionRepository } from '../../../../domain/repositories/affiliate-commission.repository.interface';

@Injectable()
export class AffiliateCommissionPrismaRepository
  extends BasePrismaRepository<AffiliateCommissionEntity, string>
  implements AffiliateCommissionRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaAffiliateCommission): AffiliateCommissionEntity {
    return AffiliateCommissionEntity.reconstitute(
      raw.id,
      {
        affiliateId: AffiliateIdVO.create(raw.affiliateId),
        commission: AffiliateCommissionCompositeVO.create({
          affiliateId: AffiliateIdVO.create(raw.affiliateId),
          orderId: OrderIdVO.create(raw.orderId),
          amount: MoneyVO.of(raw.amount, raw.currency as never),
          commission: AffiliateCommissionVO.create(String(raw.amount)),
          status: raw.status,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<AffiliateCommissionEntity | null> {
    const raw = await this.prisma.affiliateCommission.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AffiliateCommissionEntity[]> {
    const rows = await this.prisma.affiliateCommission.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: AffiliateCommissionEntity): Promise<AffiliateCommissionEntity> {
    const data = {
      affiliateId: entity.affiliateId.value,
      orderId: entity.commission.orderId.value,
      amount: entity.commission.amount.amount,
      currency: entity.commission.amount.currency,
      status: entity.commission.status,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.affiliateCommission.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.affiliateCommission.delete({ where: { id } });
  }

  async findByAffiliate(affiliateId: AffiliateIdVO): Promise<readonly AffiliateCommissionEntity[]> {
    const rows = await this.prisma.affiliateCommission.findMany({
      where: { affiliateId: affiliateId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByOrder(orderId: OrderIdVO): Promise<readonly AffiliateCommissionEntity[]> {
    const rows = await this.prisma.affiliateCommission.findMany({
      where: { orderId: orderId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
