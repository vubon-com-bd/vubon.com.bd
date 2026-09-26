import { Injectable } from '@nestjs/common';
import { VendorVerification as PrismaVendorVerification } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorVerificationEntity } from '../../../../domain/entities/vendor-verification.entity';
import { VerificationIdVO } from '../../../../domain/value-objects/primitives/verification-id.vo';
import { VerificationStatusVO } from '../../../../domain/value-objects/primitives/verification-status.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorVerificationRepository } from '../../../../domain/repositories/vendor-verification.repository.interface';

@Injectable()
export class VendorVerificationPrismaRepository
  extends BasePrismaRepository<VendorVerificationEntity, VerificationIdVO>
  implements VendorVerificationRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendorVerification): VendorVerificationEntity {
    return VendorVerificationEntity.reconstitute(
      VerificationIdVO.create(raw.id),
      {
        vendorId: VendorIdVO.create(raw.vendorId),
        status: VerificationStatusVO.create(raw.status),
        documents: [],
        submittedAt: raw.submittedAt,
        verifiedAt: raw.verifiedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: VerificationIdVO): Promise<VendorVerificationEntity | null> {
    const raw = await this.prisma.vendorVerification.findUnique({
      where: { id: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorVerificationEntity[]> {
    const rows = await this.prisma.vendorVerification.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorVerificationEntity): Promise<VendorVerificationEntity> {
    const data = {
      vendorId: entity.vendorId.value,
      status: entity.status.value,
      submittedAt: entity.submittedAt,
      verifiedAt: entity.verifiedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vendorVerification.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: VerificationIdVO): Promise<void> {
    await this.prisma.vendorVerification.delete({ where: { id: id.value } });
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<VendorVerificationEntity | null> {
    const raw = await this.prisma.vendorVerification.findFirst({
      where: { vendorId: vendorId.value },
      orderBy: { createdAt: 'desc' },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findPending(): Promise<readonly VendorVerificationEntity[]> {
    const rows = await this.prisma.vendorVerification.findMany({
      where: { status: 'pending' },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
