import { Injectable } from '@nestjs/common';
import { BillingAddress as PrismaBillingAddress } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { BillingAddressEntity } from '../../../../domain/entities/billing-address.entity';
import { BillingAddressIdVO } from '../../../../domain/value-objects/primitives/billing-address-id.vo';
import { BillingAddressLineVO } from '../../../../domain/value-objects/primitives/billing-address-line.vo';
import { CustomerIdVO } from '../../../../domain/value-objects/primitives/customer-id.vo';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';
import type { BillingAddressRepository } from '../../../../domain/repositories/billing-address.repository.interface';

@Injectable()
export class BillingAddressPrismaRepository
  extends BasePrismaRepository<BillingAddressEntity, BillingAddressIdVO>
  implements BillingAddressRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaBillingAddress): BillingAddressEntity {
    return BillingAddressEntity.reconstitute(
      BillingAddressIdVO.create(raw.id),
      {
        customerId: CustomerIdVO.create(raw.customerId),
        line1: BillingAddressLineVO.create(raw.line1),
        line2: raw.line2 ? BillingAddressLineVO.create(raw.line2) : null,
        city: raw.city,
        district: raw.district,
        division: raw.division,
        postalCode: raw.postalCode,
        country: raw.country,
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
    );
  }

  async findById(id: BillingAddressIdVO): Promise<BillingAddressEntity | null> {
    const raw = await this.prisma.billingAddress.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly BillingAddressEntity[]> {
    const rows = await this.prisma.billingAddress.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: BillingAddressEntity): Promise<BillingAddressEntity> {
    const data = {
      orderId: '',
      customerId: entity.customerId.value,
      line1: entity.line1.value,
      line2: entity.line2?.value ?? null,
      city: entity.city,
      district: entity.district,
      division: entity.division,
      postalCode: entity.postalCode,
      country: entity.country,
    };
    const raw = await this.prisma.billingAddress.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: BillingAddressIdVO): Promise<void> {
    await this.prisma.billingAddress.delete({ where: { id: id.value } });
  }

  async findByOrder(orderId: OrderIdVO): Promise<BillingAddressEntity | null> {
    const raw = await this.prisma.billingAddress.findFirst({
      where: { orderId: orderId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
