import { Injectable } from '@nestjs/common';
import { VendorApproval as PrismaVendorApproval } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorApprovalEntity } from '../../../../domain/entities/vendor-approval.entity';
import { ApprovalIdVO } from '../../../../domain/value-objects/primitives/approval-id.vo';
import { ApprovalStatusVO } from '../../../../domain/value-objects/primitives/approval-status.vo';
import { ApprovalReasonVO } from '../../../../domain/value-objects/primitives/approval-reason.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { VendorApprovalRepository } from '../../../../domain/repositories/vendor-approval.repository.interface';

@Injectable()
export class VendorApprovalPrismaRepository
  extends BasePrismaRepository<VendorApprovalEntity, ApprovalIdVO>
  implements VendorApprovalRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendorApproval): VendorApprovalEntity {
    return VendorApprovalEntity.reconstitute(
      ApprovalIdVO.create(raw.id),
      {
        vendorId: VendorIdVO.create(raw.vendorId),
        status: ApprovalStatusVO.create(raw.status),
        reason: raw.reason ? ApprovalReasonVO.create(raw.reason) : null,
        reviewedBy: raw.reviewedBy ? UserIdVO.create(raw.reviewedBy) : null,
        reviewedAt: raw.reviewedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: ApprovalIdVO): Promise<VendorApprovalEntity | null> {
    const raw = await this.prisma.vendorApproval.findUnique({
      where: { id: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorApprovalEntity[]> {
    const rows = await this.prisma.vendorApproval.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorApprovalEntity): Promise<VendorApprovalEntity> {
    const data = {
      vendorId: entity.vendorId.value,
      status: entity.status.value,
      reason: entity.reason?.value ?? null,
      reviewedBy: entity.reviewedBy?.value ?? null,
      reviewedAt: entity.reviewedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vendorApproval.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ApprovalIdVO): Promise<void> {
    await this.prisma.vendorApproval.delete({ where: { id: id.value } });
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<VendorApprovalEntity | null> {
    const raw = await this.prisma.vendorApproval.findFirst({
      where: { vendorId: vendorId.value },
      orderBy: { createdAt: 'desc' },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findPending(): Promise<readonly VendorApprovalEntity[]> {
    const rows = await this.prisma.vendorApproval.findMany({
      where: { status: 'pending' },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
