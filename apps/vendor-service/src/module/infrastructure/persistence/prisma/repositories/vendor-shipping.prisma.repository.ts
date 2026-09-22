import { Injectable } from '@nestjs/common';
import { VendorShipping as PrismaVendorShipping } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorShippingEntity } from '../../../../domain/entities/vendor-shipping.entity';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { ShippingMethodVO } from '../../../../domain/value-objects/primitives/shipping-method.vo';
import { PayoutAmountVO } from '../../../../domain/value-objects/primitives/payout-amount.vo';
import type { VendorShippingRepository } from '../../../../domain/repositories/vendor-shipping.repository.interface';

@Injectable()
export class VendorShippingPrismaRepository
  extends BasePrismaRepository<VendorShippingEntity, VendorIdVO>
  implements VendorShippingRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendorShipping): VendorShippingEntity {
    const methodsArray = Array.isArray(raw.methods) ? (raw.methods as string[]) : [];
    return VendorShippingEntity.reconstitute(
      VendorIdVO.create(raw.vendorId),
      {
        vendorId: VendorIdVO.create(raw.vendorId),
        methods: methodsArray.map((m) => ShippingMethodVO.create(m)),
        freeShippingThreshold:
          raw.freeShippingThreshold !== null && raw.freeShippingThreshold !== undefined
            ? PayoutAmountVO.create(raw.freeShippingThreshold, 'BDT')
            : null,
        defaultShippingCost: PayoutAmountVO.create(raw.defaultShippingCost, 'BDT'),
        shipsInternationally: raw.shipsInternationally,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: VendorIdVO): Promise<VendorShippingEntity | null> {
    const raw = await this.prisma.vendorShipping.findUnique({
      where: { vendorId: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorShippingEntity[]> {
    const rows = await this.prisma.vendorShipping.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorShippingEntity): Promise<VendorShippingEntity> {
    const data = {
      methods: entity.methods.map((m) => m.value) as unknown as object,
      freeShippingThreshold: entity.freeShippingThreshold?.amount ?? null,
      defaultShippingCost: entity.defaultShippingCost.amount,
      shipsInternationally: entity.shipsInternationally,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vendorShipping.upsert({
      where: { vendorId: entity.vendorId.value },
      create: { id: entity.id.value, vendorId: entity.vendorId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: VendorIdVO): Promise<void> {
    await this.prisma.vendorShipping.delete({ where: { vendorId: id.value } });
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<VendorShippingEntity | null> {
    const raw = await this.prisma.vendorShipping.findUnique({
      where: { vendorId: vendorId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
