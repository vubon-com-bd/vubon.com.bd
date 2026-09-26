import { Injectable } from '@nestjs/common';
import { VendorReturnPolicy as PrismaVendorReturnPolicy } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorReturnPolicyEntity } from '../../../../domain/entities/vendor-return-policy.entity';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { ReturnPolicyTypeVO } from '../../../../domain/value-objects/primitives/return-policy-type.vo';
import type { VendorReturnPolicyRepository } from '../../../../domain/repositories/vendor-return-policy.repository.interface';

@Injectable()
export class VendorReturnPolicyPrismaRepository
  extends BasePrismaRepository<VendorReturnPolicyEntity, VendorIdVO>
  implements VendorReturnPolicyRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendorReturnPolicy): VendorReturnPolicyEntity {
    return VendorReturnPolicyEntity.reconstitute(
      VendorIdVO.create(raw.vendorId),
      {
        vendorId: VendorIdVO.create(raw.vendorId),
        type: ReturnPolicyTypeVO.create(raw.type),
        returnWindowDays: raw.returnWindowDays,
        conditions: raw.conditions,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: VendorIdVO): Promise<VendorReturnPolicyEntity | null> {
    const raw = await this.prisma.vendorReturnPolicy.findUnique({
      where: { vendorId: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorReturnPolicyEntity[]> {
    const rows = await this.prisma.vendorReturnPolicy.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorReturnPolicyEntity): Promise<VendorReturnPolicyEntity> {
    const data = {
      type: entity.type.value,
      returnWindowDays: entity.returnWindowDays,
      conditions: entity.conditions,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vendorReturnPolicy.upsert({
      where: { vendorId: entity.vendorId.value },
      create: { id: entity.id.value, vendorId: entity.vendorId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: VendorIdVO): Promise<void> {
    await this.prisma.vendorReturnPolicy.delete({ where: { vendorId: id.value } });
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<VendorReturnPolicyEntity | null> {
    const raw = await this.prisma.vendorReturnPolicy.findUnique({
      where: { vendorId: vendorId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
