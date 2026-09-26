import { Injectable } from '@nestjs/common';
import { Checkout as PrismaCheckout } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { CheckoutEntity } from '../../../../domain/entities/checkout.entity';
import { CheckoutIdVO } from '../../../../domain/value-objects/primitives/checkout-id.vo';
import { CheckoutStatusVO } from '../../../../domain/value-objects/primitives/checkout-status.vo';
import { CheckoutStepVO } from '../../../../domain/value-objects/primitives/checkout-step.vo';
import { CustomerIdVO } from '../../../../domain/value-objects/primitives/customer-id.vo';
import type { CheckoutRepository } from '../../../../domain/repositories/checkout.repository.interface';

@Injectable()
export class CheckoutPrismaRepository
  extends BasePrismaRepository<CheckoutEntity, CheckoutIdVO>
  implements CheckoutRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaCheckout): CheckoutEntity {
    return CheckoutEntity.reconstitute(
      CheckoutIdVO.create(raw.id),
      {
        customerId: CustomerIdVO.create(raw.customerId),
        status: CheckoutStatusVO.create(raw.status),
        step: CheckoutStepVO.create(raw.step),
        addressId: raw.addressId,
        shippingId: raw.shippingId,
        paymentId: raw.paymentId,
        expiresAt: raw.expiresAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
    );
  }

  async findById(id: CheckoutIdVO): Promise<CheckoutEntity | null> {
    const raw = await this.prisma.checkout.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CheckoutEntity[]> {
    const rows = await this.prisma.checkout.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: CheckoutEntity): Promise<CheckoutEntity> {
    const data = {
      customerId: entity.customerId.value,
      status: entity.status.value,
      step: entity.step.value,
      addressId: entity.addressId,
      shippingId: entity.shippingId,
      paymentId: entity.paymentId,
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

  async findActiveByCustomer(customerId: CustomerIdVO): Promise<CheckoutEntity | null> {
    const raw = await this.prisma.checkout.findFirst({
      where: { customerId: customerId.value, status: { notIn: ['completed', 'abandoned', 'expired'] } },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByCustomer(customerId: CustomerIdVO): Promise<readonly CheckoutEntity[]> {
    const rows = await this.prisma.checkout.findMany({
      where: { customerId: customerId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
