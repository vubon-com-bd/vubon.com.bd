import { Injectable } from '@nestjs/common';
import { VendorSuspension as PrismaVendorSuspension } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorSuspensionEntity } from '../../../../domain/entities/vendor-suspension.entity';
import { SuspensionIdVO } from '../../../../domain/value-objects/primitives/suspension-id.vo';
import { SuspensionReasonVO } from '../../../../domain/value-objects/primitives/suspension-reason.vo';
import { SuspensionStatusVO } from '../../../../domain/value-objects/primitives/suspension-status.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { VendorSuspensionRepository } from '../../../../domain/repositories/vendor-suspension.repository.interface';

@Injectable()
export class VendorSuspensionPrismaRepository
  extends BasePrismaRepository<VendorSuspensionEntity, SuspensionIdVO>
  implements VendorSuspensionRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendorSuspension): VendorSuspensionEntity {
    return VendorSuspensionEntity.reconstitute(
      SuspensionIdVO.create(raw.id),
      {
        vendorId: VendorIdVO.create(raw.vendorId),
        reason: SuspensionReasonVO.create(raw.reason),
        status: SuspensionStatusVO.create(raw.status),
        suspendedBy: UserIdVO.create(raw.suspendedBy),
        suspendedAt: raw.suspendedAt,
        reinstatedAt: raw.reinstatedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: SuspensionIdVO): Promise<VendorSuspensionEntity | null> {
    const raw = await this.prisma.vendorSuspension.findUnique({
      where: { id: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorSuspensionEntity[]> {
    const rows = await this.prisma.vendorSuspension.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorSuspensionEntity): Promise<VendorSuspensionEntity> {
    const data = {
      vendorId: entity.vendorId.value,
      reason: entity.reason.value,
      status: entity.status.value,
      suspendedBy: entity.suspendedBy.value,
      suspendedAt: entity.suspendedAt,
      reinstatedAt: entity.reinstatedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vendorSuspension.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: SuspensionIdVO): Promise<void> {
    await this.prisma.vendorSuspension.delete({ where: { id: id.value } });
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorSuspensionEntity[]> {
    const rows = await this.prisma.vendorSuspension.findMany({
      where: { vendorId: vendorId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findActive(vendorId: VendorIdVO): Promise<VendorSuspensionEntity | null> {
    const raw = await this.prisma.vendorSuspension.findFirst({
      where: { vendorId: vendorId.value, status: 'active' },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
