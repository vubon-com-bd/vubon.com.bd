import { Injectable } from '@nestjs/common';
import { Insurance as PrismaInsurance } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { InsuranceEntity } from '../../../../domain/entities/insurance.entity';
import { InsuranceIdVO } from '../../../../domain/value-objects/primitives/insurance-id.vo';
import { InsuranceStatusVO } from '../../../../domain/value-objects/primitives/insurance-status.vo';
import { InsuranceCoverageVO } from '../../../../domain/value-objects/primitives/insurance-coverage.vo';
import { InsuranceProviderVO } from '../../../../domain/value-objects/primitives/insurance-provider.vo';
import { ShipmentIdVO } from '../../../../domain/value-objects/primitives/shipment-id.vo';
import type { InsuranceRepository } from '../../../../domain/repositories/insurance.repository.interface';

@Injectable()
export class InsurancePrismaRepository
  extends BasePrismaRepository<InsuranceEntity, InsuranceIdVO>
  implements InsuranceRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaInsurance): InsuranceEntity {
    return InsuranceEntity.reconstitute(
      InsuranceIdVO.create(raw.id),
      {
        shipmentId: ShipmentIdVO.create(raw.shipmentId),
        provider: InsuranceProviderVO.create(raw.provider),
        coverage: InsuranceCoverageVO.create(String(raw.coverage)),
        premium: raw.premium,
        currency: raw.currency,
        status: InsuranceStatusVO.create(raw.status),
        purchasedAt: raw.purchasedAt,
        claimedAt: raw.claimedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: InsuranceIdVO): Promise<InsuranceEntity | null> {
    const raw = await this.prisma.insurance.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly InsuranceEntity[]> {
    const rows = await this.prisma.insurance.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: InsuranceEntity): Promise<InsuranceEntity> {
    const data = {
      shipmentId: entity.shipmentId.value,
      provider: entity.provider.value,
      coverage: Number(entity.coverage.value),
      premium: entity.premium,
      currency: entity.currency,
      status: entity.status.value,
      purchasedAt: entity.purchasedAt,
      claimedAt: entity.claimedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.insurance.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: InsuranceIdVO): Promise<void> {
    await this.prisma.insurance.delete({ where: { id: id.value } });
  }

  async findByShipment(shipmentId: ShipmentIdVO): Promise<InsuranceEntity | null> {
    const raw = await this.prisma.insurance.findFirst({ where: { shipmentId: shipmentId.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findByProvider(provider: string): Promise<readonly InsuranceEntity[]> {
    const rows = await this.prisma.insurance.findMany({ where: { provider } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly InsuranceEntity[]> {
    const rows = await this.prisma.insurance.findMany({ where: { status } });
    return rows.map((r) => this.toDomain(r));
  }
}
