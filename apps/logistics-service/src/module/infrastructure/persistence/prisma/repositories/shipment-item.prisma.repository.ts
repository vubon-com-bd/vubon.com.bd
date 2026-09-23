import { Injectable } from '@nestjs/common';
import { ShipmentItem as PrismaShipmentItem } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ShipmentItemEntity } from '../../../../domain/entities/shipment-item.entity';
import { ShipmentIdVO } from '../../../../domain/value-objects/primitives/shipment-id.vo';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo';
import type { ShipmentItemRepository } from '../../../../domain/repositories/shipment-item.repository.interface';

@Injectable()
export class ShipmentItemPrismaRepository
  extends BasePrismaRepository<ShipmentItemEntity, string>
  implements ShipmentItemRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaShipmentItem): ShipmentItemEntity {
    return ShipmentItemEntity.reconstitute(
      raw.id,
      {
        shipmentId: ShipmentIdVO.create(raw.shipmentId),
        productId: ProductIdVO.create(raw.productId),
        quantity: raw.quantity,
        weight: null,
        dimension: null,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: string): Promise<ShipmentItemEntity | null> {
    const raw = await this.prisma.shipmentItem.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ShipmentItemEntity[]> {
    const rows = await this.prisma.shipmentItem.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ShipmentItemEntity): Promise<ShipmentItemEntity> {
    const data = {
      shipmentId: entity.shipmentId.value,
      productId: entity.productId.value,
      quantity: entity.quantity,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.shipmentItem.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.shipmentItem.delete({ where: { id } });
  }

  async findByShipment(shipmentId: ShipmentIdVO): Promise<readonly ShipmentItemEntity[]> {
    const rows = await this.prisma.shipmentItem.findMany({ where: { shipmentId: shipmentId.value } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByProduct(productId: ProductIdVO): Promise<readonly ShipmentItemEntity[]> {
    const rows = await this.prisma.shipmentItem.findMany({ where: { productId: productId.value } });
    return rows.map((r) => this.toDomain(r));
  }
}
