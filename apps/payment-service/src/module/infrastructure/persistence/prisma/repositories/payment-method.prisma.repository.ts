import { Injectable } from '@nestjs/common';
import { PaymentMethod as PrismaPaymentMethod } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { PaymentMethodEntity } from '../../../../domain/entities/payment-method.entity';
import { PaymentMethodIdVO } from '../../../../domain/value-objects/primitives/payment-method-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { PaymentMethodTypeVO } from '../../../../domain/value-objects/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '../../../../domain/value-objects/primitives/payment-method-provider.vo';
import type { PaymentMethodRepository } from '../../../../domain/repositories/payment-method.repository.interface';

@Injectable()
export class PaymentMethodPrismaRepository
  extends BasePrismaRepository<PaymentMethodEntity, PaymentMethodIdVO>
  implements PaymentMethodRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaPaymentMethod): PaymentMethodEntity {
    return PaymentMethodEntity.reconstitute(
      PaymentMethodIdVO.create(raw.id),
      {
        userId: UserIdVO.create(raw.userId),
        type: PaymentMethodTypeVO.create(raw.type),
        provider: raw.provider ? PaymentMethodProviderVO.create(raw.provider) : null,
        cardToken: raw.cardToken,
        cardLast4: raw.cardLast4,
        cardBrand: raw.cardBrand,
        cardExpiry: raw.cardExpiry,
        isDefault: raw.isDefault,
        isActive: raw.isActive,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: PaymentMethodIdVO): Promise<PaymentMethodEntity | null> {
    const raw = await this.prisma.paymentMethod.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly PaymentMethodEntity[]> {
    const rows = await this.prisma.paymentMethod.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: PaymentMethodEntity): Promise<PaymentMethodEntity> {
    const data = {
      userId: entity.userId.value,
      type: entity.type.value,
      provider: entity.provider?.value ?? null,
      cardToken: entity.cardToken,
      cardLast4: entity.cardLast4,
      cardBrand: entity.cardBrand,
      cardExpiry: entity.cardExpiry,
      isDefault: entity.isDefault,
      isActive: entity.isActive,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.paymentMethod.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: PaymentMethodIdVO): Promise<void> {
    await this.prisma.paymentMethod.delete({ where: { id: id.value } });
  }

  async findByUserId(userId: UserIdVO): Promise<readonly PaymentMethodEntity[]> {
    const rows = await this.prisma.paymentMethod.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findDefault(userId: UserIdVO): Promise<PaymentMethodEntity | null> {
    const raw = await this.prisma.paymentMethod.findFirst({
      where: { userId: userId.value, isDefault: true },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
