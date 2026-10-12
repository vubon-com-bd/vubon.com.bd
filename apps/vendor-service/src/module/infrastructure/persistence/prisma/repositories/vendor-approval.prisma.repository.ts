/**
 * VendorApprovalPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  VendorApprovalRepository,
  ApprovalStats,
} from '../../../../domain/repositories/vendor-approval.repository.interface.js';
import { VendorApprovalEntity } from '../../../../domain/entities/vendor-approval.entity.js';
import { ApprovalStatusVO } from '../../../../domain/value-objects/primitives/approval-status.vo.js';
import { VendorApprovalPrismaMapper } from '../mappers/vendor-approval.prisma-mapper.js';

@Injectable()
export class VendorApprovalPrismaRepository implements VendorApprovalRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorApprovalEntity | null> {
    const row = await this.prisma.vendorApproval.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? VendorApprovalPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorApprovalEntity[]> {
    const rows = await this.prisma.vendorApproval.findMany({
      where: { deletedAt: null },
      orderBy: { submittedAt: 'desc' },
    });
    return rows.map((r) => VendorApprovalPrismaMapper.toDomain(r));
  }

  async findByVendorId(vendorId: string): Promise<VendorApprovalEntity | null> {
    const row = await this.prisma.vendorApproval.findFirst({
      where: { vendorId, deletedAt: null },
    });
    return row ? VendorApprovalPrismaMapper.toDomain(row) : null;
  }

  async existsByVendorId(vendorId: string): Promise<boolean> {
    const c = await this.prisma.vendorApproval.count({
      where: { vendorId, deletedAt: null },
    });
    return c > 0;
  }

  async findByStatus(status: ApprovalStatusVO): Promise<readonly VendorApprovalEntity[]> {
    const rows = await this.prisma.vendorApproval.findMany({
      where: { status: status.value, deletedAt: null },
      orderBy: { submittedAt: 'desc' },
    });
    return rows.map((r) => VendorApprovalPrismaMapper.toDomain(r));
  }

  async findPendingPastSla(): Promise<readonly VendorApprovalEntity[]> {
    const rows = await this.prisma.vendorApproval.findMany({
      where: {
        status: { in: ['pending', 'info_requested'] },
        slaDeadline: { lt: new Date() },
        deletedAt: null,
      },
    });
    return rows.map((r) => VendorApprovalPrismaMapper.toDomain(r));
  }

  async findAppealable(): Promise<readonly VendorApprovalEntity[]> {
    const rows = await this.prisma.vendorApproval.findMany({
      where: {
        status: 'rejected',
        appealDeadline: { gte: new Date() },
        appealSubmittedAt: null,
        deletedAt: null,
      },
    });
    return rows.map((r) => VendorApprovalPrismaMapper.toDomain(r));
  }

  async countByStatus(status: ApprovalStatusVO): Promise<number> {
    return this.prisma.vendorApproval.count({
      where: { status: status.value, deletedAt: null },
    });
  }

  async getStats(): Promise<ApprovalStats> {
    const [totalPending, totalApproved, totalRejected, slaBreach] = await Promise.all([
      this.prisma.vendorApproval.count({
        where: { status: { in: ['pending', 'info_requested'] }, deletedAt: null },
      }),
      this.prisma.vendorApproval.count({
        where: { status: 'approved', deletedAt: null },
      }),
      this.prisma.vendorApproval.count({
        where: { status: 'rejected', deletedAt: null },
      }),
      this.prisma.vendorApproval.count({
        where: {
          status: { in: ['pending', 'info_requested'] },
          slaDeadline: { lt: new Date() },
          deletedAt: null,
        },
      }),
    ]);

    const reviewed = await this.prisma.vendorApproval.findMany({
      where: { reviewedAt: { not: null }, deletedAt: null },
      select: { submittedAt: true, reviewedAt: true },
    });
    let totalHours = 0;
    for (const r of reviewed) {
      if (r.reviewedAt) {
        totalHours += (r.reviewedAt.getTime() - r.submittedAt.getTime()) / (1000 * 60 * 60);
      }
    }
    const avgReviewHours = reviewed.length > 0 ? totalHours / reviewed.length : 0;

    return {
      totalPending,
      totalApproved,
      totalRejected,
      avgReviewHours: Math.round(avgReviewHours * 100) / 100,
      slaBreachCount: slaBreach,
    };
  }

  async upsert(entity: VendorApprovalEntity): Promise<VendorApprovalEntity> {
    const data = VendorApprovalPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.vendorApproval.findFirst({
      where: { vendorId: entity.vendorId },
    });
    const row = existing
      ? await this.prisma.vendorApproval.update({ where: { id: existing.id }, data })
      : await this.prisma.vendorApproval.create({ data: data as never });
    return VendorApprovalPrismaMapper.toDomain(row);
  }

  async save(entity: VendorApprovalEntity): Promise<VendorApprovalEntity> {
    return this.upsert(entity);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendorApproval.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.prisma.vendorApproval.count({ where: { id, deletedAt: null } });
    return c > 0;
  }
}
