/**
 * VendorVerificationPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { VendorVerificationRepository } from '../../../../domain/repositories/vendor-verification.repository.interface.js';
import { VendorVerificationEntity } from '../../../../domain/entities/vendor-verification.entity.js';
import { VerificationStatusVO } from '../../../../domain/value-objects/primitives/verification-status.vo.js';
import { VendorVerificationPrismaMapper } from '../mappers/vendor-verification.prisma-mapper.js';

@Injectable()
export class VendorVerificationPrismaRepository implements VendorVerificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorVerificationEntity | null> {
    const row = await this.prisma.vendorVerification.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? VendorVerificationPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorVerificationEntity[]> {
    const rows = await this.prisma.vendorVerification.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorVerificationPrismaMapper.toDomain(r));
  }

  async findByVendorId(vendorId: string): Promise<VendorVerificationEntity | null> {
    const row = await this.prisma.vendorVerification.findFirst({
      where: { vendorId, deletedAt: null },
    });
    return row ? VendorVerificationPrismaMapper.toDomain(row) : null;
  }

  async existsByVendorId(vendorId: string): Promise<boolean> {
    const count = await this.prisma.vendorVerification.count({
      where: { vendorId, deletedAt: null },
    });
    return count > 0;
  }

  async findByStatus(status: VerificationStatusVO): Promise<readonly VendorVerificationEntity[]> {
    const rows = await this.prisma.vendorVerification.findMany({
      where: { overallStatus: status.value, deletedAt: null },
      orderBy: { submittedAt: 'desc' },
    });
    return rows.map((r) => VendorVerificationPrismaMapper.toDomain(r));
  }

  async findPendingReview(): Promise<readonly VendorVerificationEntity[]> {
    const rows = await this.prisma.vendorVerification.findMany({
      where: { overallStatus: { in: ['pending', 'in_review'] }, deletedAt: null },
      orderBy: { submittedAt: 'asc' },
    });
    return rows.map((r) => VendorVerificationPrismaMapper.toDomain(r));
  }

  async findReviewPastSla(hours: number): Promise<readonly VendorVerificationEntity[]> {
    const threshold = new Date(Date.now() - hours * 60 * 60 * 1000);
    const rows = await this.prisma.vendorVerification.findMany({
      where: {
        overallStatus: { in: ['pending', 'in_review'] },
        submittedAt: { lte: threshold },
        deletedAt: null,
      },
    });
    return rows.map((r) => VendorVerificationPrismaMapper.toDomain(r));
  }

  async findExpired(): Promise<readonly VendorVerificationEntity[]> {
    const rows = await this.prisma.vendorVerification.findMany({
      where: {
        deletedAt: null,
        expiresAt: { lt: new Date() },
      },
    });
    return rows.map((r) => VendorVerificationPrismaMapper.toDomain(r));
  }

  async findExpiring(days: number): Promise<readonly VendorVerificationEntity[]> {
    const now = new Date();
    const threshold = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    const rows = await this.prisma.vendorVerification.findMany({
      where: {
        deletedAt: null,
        expiresAt: { gte: now, lte: threshold },
      },
    });
    return rows.map((r) => VendorVerificationPrismaMapper.toDomain(r));
  }

  async countByStatus(status: VerificationStatusVO): Promise<number> {
    return this.prisma.vendorVerification.count({
      where: { overallStatus: status.value, deletedAt: null },
    });
  }

  async upsert(entity: VendorVerificationEntity): Promise<VendorVerificationEntity> {
    const data = VendorVerificationPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.vendorVerification.findFirst({
      where: { vendorId: entity.vendorId },
    });
    const row = existing
      ? await this.prisma.vendorVerification.update({ where: { id: existing.id }, data })
      : await this.prisma.vendorVerification.create({ data: data as never });
    return VendorVerificationPrismaMapper.toDomain(row);
  }

  async save(entity: VendorVerificationEntity): Promise<VendorVerificationEntity> {
    return this.upsert(entity);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendorVerification.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.vendorVerification.count({
      where: { id, deletedAt: null },
    });
    return count > 0;
  }
}
