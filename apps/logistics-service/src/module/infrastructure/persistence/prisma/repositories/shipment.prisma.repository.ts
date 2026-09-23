import { Injectable } from '@nestjs/common';
import { Shipment as PrismaShipment } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ShipmentEntity } from '../../../../domain/entities/shipment.entity';
import { ShipmentIdVO } from '../../../../domain/value-objects/primitives/shipment-id.vo';
import { ShipmentNumberVO } from '../../../../domain/value-objects/primitives/shipment-number.vo';
import { ShipmentStatusVO } from '../../../../domain/value-objects/primitives/shipment-status.vo';
import { ShipmentTypeVO } from '../../../../domain/value-objects/primitives/shipment-type.vo';
import { ShipmentPriorityVO } from '../../../../domain/value-objects/primitives/shipment-priority.vo';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import type { ShipmentRepository } from '../../../../domain/repositories/shipment.repository.interface';

@Injectable()
export class ShipmentPrismaRepository
  extends BasePrismaRepository<ShipmentEntity, ShipmentIdVO>
  implements ShipmentRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaShipment): ShipmentEntity {
    return ShipmentEntity.reconstitute(
      ShipmentIdVO.create(raw.id),
      {
        number: ShipmentNumberVO.create(raw.shipmentNumber),
        orderId: OrderIdVO.create(raw.orderId),
        userId: UserIdVO.create(raw.userId),
        vendorId: raw.vendorId ? VendorIdVO.create(raw.vendorId) : null,
        status: ShipmentStatusVO.create(raw.status),
        type: ShipmentTypeVO.create(raw.type),
        priority: ShipmentPriorityVO.create(raw.priority),
        weight: null,
        dimension: null,
        notes: raw.notes,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: ShipmentIdVO): Promise<ShipmentEntity | null> {
    const raw = await this.prisma.shipment.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ShipmentEntity[]> {
    const rows = await this.prisma.shipment.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ShipmentEntity): Promise<ShipmentEntity> {
    const data = {
      shipmentNumber: entity.number.value,
      orderId: entity.orderId.value,
      userId: entity.userId.value,
      vendorId: entity.vendorId?.value ?? null,
      status: entity.status.value,
      type: entity.type.value,
      priority: entity.priority.value,
      notes: entity.notes,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.shipment.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ShipmentIdVO): Promise<void> {
    await this.prisma.shipment.delete({ where: { id: id.value } });
  }

  async findByNumber(number: ShipmentNumberVO): Promise<ShipmentEntity | null> {
    const raw = await this.prisma.shipment.findUnique({ where: { shipmentNumber: number.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findByOrder(orderId: OrderIdVO): Promise<readonly ShipmentEntity[]> {
    const rows = await this.prisma.shipment.findMany({ where: { orderId: orderId.value } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly ShipmentEntity[]> {
    const rows = await this.prisma.shipment.findMany({ where: { status } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByVendor(vendorId: VendorIdVO): Promise<readonly ShipmentEntity[]> {
    const rows = await this.prisma.shipment.findMany({ where: { vendorId: vendorId.value } });
    return rows.map((r) => this.toDomain(r));
  }
}
