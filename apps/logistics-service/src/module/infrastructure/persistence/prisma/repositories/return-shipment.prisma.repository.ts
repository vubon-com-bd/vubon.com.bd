import { Injectable } from '@nestjs/common';
import { ReturnShipment as PrismaReturnShipment } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ReturnShipmentEntity } from '../../../../domain/entities/return-shipment.entity';
import { ReturnShipmentStatusVO } from '../../../../domain/value-objects/primitives/return-shipment-status.vo';
import { ReturnReasonVO } from '../../../../domain/value-objects/primitives/return-reason.vo';
import { ReturnReasonTypeVO } from '../../../../domain/value-objects/primitives/return-reason-type.vo';
import { ShipmentIdVO } from '../../../../domain/value-objects/primitives/shipment-id.vo';
import type { ReturnShipmentRepository } from '../../../../domain/repositories/return-shipment.repository.interface';

@Injectable()
export class ReturnShipmentPrismaRepository
  extends BasePrismaRepository<ReturnShipmentEntity, string>
  implements ReturnShipmentRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaReturnShipment): ReturnShipmentEntity {
    return ReturnShipmentEntity.reconstitute(
      raw.id,
      {
        shipmentId: ShipmentIdVO.create(raw.shipmentId),
        reason: ReturnReasonVO.create(raw.reason),
        reasonType: ReturnReasonTypeVO.create(raw.reasonType),
        status: ReturnShipmentStatusVO.create(raw.status),
        requestedAt: raw.requestedAt,
        approvedAt: raw.approvedAt,
        receivedAt: raw.receivedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: string): Promise<ReturnShipmentEntity | null> {
    const raw = await this.prisma.returnShipment.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ReturnShipmentEntity[]> {
    const rows = await this.prisma.returnShipment.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ReturnShipmentEntity): Promise<ReturnShipmentEntity> {
    const data = {
      shipmentId: entity.shipmentId.value,
      reason: entity.reason.value,
      reasonType: entity.reasonType.value,
      status: entity.status.value,
      requestedAt: entity.requestedAt,
      approvedAt: entity.approvedAt,
      receivedAt: entity.receivedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.returnShipment.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.returnShipment.delete({ where: { id } });
  }

  async findByShipment(shipmentId: ShipmentIdVO): Promise<readonly ReturnShipmentEntity[]> {
    const rows = await this.prisma.returnShipment.findMany({ where: { shipmentId: shipmentId.value } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly ReturnShipmentEntity[]> {
    const rows = await this.prisma.returnShipment.findMany({ where: { status } });
    return rows.map((r) => this.toDomain(r));
  }

  async findPending(): Promise<readonly ReturnShipmentEntity[]> {
    const rows = await this.prisma.returnShipment.findMany({ where: { status: 'requested' } });
    return rows.map((r) => this.toDomain(r));
  }
}
