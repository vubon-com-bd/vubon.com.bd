import { Injectable } from '@nestjs/common';
import { Checkout as PrismaCheckout } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { CheckoutSessionEntity } from '../../../../domain/entities/checkout-session.entity';
import { CheckoutIdVO } from '../../../../domain/value-objects/primitives/checkout-id.vo';
import { CheckoutStatusVO } from '../../../../domain/value-objects/primitives/checkout-status.vo';
import { CustomerIdVO } from '../../../../domain/value-objects/primitives/customer-id.vo';
import type { CheckoutSessionRepository } from '../../../../domain/repositories/checkout-session.repository.interface';

@Injectable()
export class CheckoutSessionPrismaRepository
  extends BasePrismaRepository<CheckoutSessionEntity, CheckoutIdVO>
  implements CheckoutSessionRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaCheckout): CheckoutSessionEntity {
    return CheckoutSessionEntity.reconstitute(
      CheckoutIdVO.create(raw.id),
      {
        customerId: CustomerIdVO.create(raw.customerId),
        status: CheckoutStatusVO.create(raw.status),
        expiresAt: raw.expiresAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
    );
  }

  async findById(id: CheckoutIdVO): Promise<CheckoutSessionEntity | null> {
    const raw = await this.prisma.checkout.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CheckoutSessionEntity[]> {
    const rows = await this.prisma.checkout.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: CheckoutSessionEntity): Promise<CheckoutSessionEntity> {
    const data = {
      customerId: entity.customerId.value,
      status: entity.status.value,
      step: 'address',
      expiresAt: entity.expiresAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.checkout.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: CheckoutIdVO): Promise<void> {
    await this.prisma.checkout.delete({ where: { id: id.value } });
  }

  async findActiveByCustomer(customerId: CustomerIdVO): Promise<CheckoutSessionEntity | null> {
    const raw = await this.prisma.checkout.findFirst({
      where: { customerId: customerId.value, status: { notIn: ['completed', 'abandoned', 'expired'] } },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
