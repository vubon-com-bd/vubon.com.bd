import { Injectable } from '@nestjs/common';
import { ShippingAddress as PrismaShippingAddress } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ShippingAddressEntity } from '../../../../domain/entities/shipping-address.entity';
import { ShippingAddressIdVO } from '../../../../domain/value-objects/primitives/shipping-address-id.vo';
import { ShippingAddressLineVO } from '../../../../domain/value-objects/primitives/shipping-address-line.vo';
import { CustomerIdVO } from '../../../../domain/value-objects/primitives/customer-id.vo';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';
import type { ShippingAddressRepository } from '../../../../domain/repositories/shipping-address.repository.interface';

@Injectable()
export class ShippingAddressPrismaRepository
  extends BasePrismaRepository<ShippingAddressEntity, ShippingAddressIdVO>
  implements ShippingAddressRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaShippingAddress): ShippingAddressEntity {
    return ShippingAddressEntity.reconstitute(
      ShippingAddressIdVO.create(raw.id),
      {
        customerId: CustomerIdVO.create(raw.customerId),
        line1: ShippingAddressLineVO.create(raw.line1),
        line2: raw.line2 ? ShippingAddressLineVO.create(raw.line2) : null,
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

  async findById(id: ShippingAddressIdVO): Promise<ShippingAddressEntity | null> {
    const raw = await this.prisma.shippingAddress.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ShippingAddressEntity[]> {
    const rows = await this.prisma.shippingAddress.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ShippingAddressEntity): Promise<ShippingAddressEntity> {
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
    const raw = await this.prisma.shippingAddress.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ShippingAddressIdVO): Promise<void> {
    await this.prisma.shippingAddress.delete({ where: { id: id.value } });
  }

  async findByOrder(orderId: OrderIdVO): Promise<ShippingAddressEntity | null> {
    const raw = await this.prisma.shippingAddress.findFirst({
      where: { orderId: orderId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
