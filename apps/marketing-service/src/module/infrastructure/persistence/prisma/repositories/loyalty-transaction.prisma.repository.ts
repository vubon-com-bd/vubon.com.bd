import { Injectable } from '@nestjs/common';
import { LoyaltyTransaction as PrismaLoyaltyTransaction } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { LoyaltyTransactionEntity } from '../../../../domain/entities/loyalty-transaction.entity';
import { LoyaltyTransactionVO } from '../../../../domain/value-objects/composites/loyalty-transaction.vo';
import { LoyaltyIdVO } from '../../../../domain/value-objects/primitives/loyalty-id.vo';
import { LoyaltyPointsVO } from '../../../../domain/value-objects/primitives/loyalty-points.vo';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';
import type { LoyaltyTransactionRepository } from '../../../../domain/repositories/loyalty-transaction.repository.interface';

@Injectable()
export class LoyaltyTransactionPrismaRepository
  extends BasePrismaRepository<LoyaltyTransactionEntity, string>
  implements LoyaltyTransactionRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaLoyaltyTransaction): LoyaltyTransactionEntity {
    return LoyaltyTransactionEntity.reconstitute(
      raw.id,
      {
        loyaltyId: LoyaltyIdVO.create(raw.loyaltyId),
        transaction: LoyaltyTransactionVO.create({
          loyaltyId: LoyaltyIdVO.create(raw.loyaltyId),
          points: LoyaltyPointsVO.create(raw.points),
          type: raw.type,
          orderId: raw.orderId ? OrderIdVO.create(raw.orderId) : null,
        }),
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<LoyaltyTransactionEntity | null> {
    const raw = await this.prisma.loyaltyTransaction.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly LoyaltyTransactionEntity[]> {
    const rows = await this.prisma.loyaltyTransaction.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: LoyaltyTransactionEntity): Promise<LoyaltyTransactionEntity> {
    const data = {
      loyaltyId: entity.loyaltyId.value,
      points: entity.transaction.points.value,
      type: entity.transaction.type,
      orderId: entity.transaction.orderId?.value ?? null,
    };
    const raw = await this.prisma.loyaltyTransaction.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.loyaltyTransaction.delete({ where: { id } });
  }

  async findByLoyalty(loyaltyId: LoyaltyIdVO): Promise<readonly LoyaltyTransactionEntity[]> {
    const rows = await this.prisma.loyaltyTransaction.findMany({
      where: { loyaltyId: loyaltyId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
