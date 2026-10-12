/**
 * VendorDocumentPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  VendorDocumentRepository,
  VendorDocumentFilter,
} from '../../../../domain/repositories/vendor-document.repository.interface.js';
import { VendorDocumentEntity } from '../../../../domain/entities/vendor-document.entity.js';
import { DocumentIdVO } from '../../../../domain/value-objects/primitives/document-id.vo.js';
import { DocumentTypeVO } from '../../../../domain/value-objects/primitives/document-type.vo.js';
import { DocumentStatusVO } from '../../../../domain/value-objects/primitives/document-status.vo.js';
import { VendorDocumentPrismaMapper } from '../mappers/vendor-document.prisma-mapper.js';

@Injectable()
export class VendorDocumentPrismaRepository implements VendorDocumentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorDocumentEntity | null> {
    return this.findByIdVO(DocumentIdVO.reconstitute(id));
  }

  async findByIdVO(id: DocumentIdVO): Promise<VendorDocumentEntity | null> {
    const row = await this.prisma.vendorDocument.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return row ? VendorDocumentPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorDocumentEntity[]> {
    const rows = await this.prisma.vendorDocument.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorDocumentPrismaMapper.toDomain(r));
  }

  async findByVendorId(vendorId: string): Promise<readonly VendorDocumentEntity[]> {
    const rows = await this.prisma.vendorDocument.findMany({
      where: { vendorId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorDocumentPrismaMapper.toDomain(r));
  }

  async findByVendorIdAndType(
    vendorId: string,
    type: DocumentTypeVO,
  ): Promise<readonly VendorDocumentEntity[]> {
    const rows = await this.prisma.vendorDocument.findMany({
      where: { vendorId, type: type.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorDocumentPrismaMapper.toDomain(r));
  }

  async findByStatus(status: DocumentStatusVO): Promise<readonly VendorDocumentEntity[]> {
    const rows = await this.prisma.vendorDocument.findMany({
      where: { status: status.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorDocumentPrismaMapper.toDomain(r));
  }

  async findLatestForVendorAndType(
    vendorId: string,
    type: DocumentTypeVO,
  ): Promise<VendorDocumentEntity | null> {
    const row = await this.prisma.vendorDocument.findFirst({
      where: { vendorId, type: type.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return row ? VendorDocumentPrismaMapper.toDomain(row) : null;
  }

  async search(filter: VendorDocumentFilter): Promise<readonly VendorDocumentEntity[]> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (filter.vendorId) where.vendorId = filter.vendorId;
    if (filter.type) where.type = filter.type;
    if (filter.status) where.status = filter.status;
    if (filter.expiringInDays !== undefined) {
      const threshold = new Date(Date.now() + filter.expiringInDays * 24 * 60 * 60 * 1000);
      where.expiresAt = { lte: threshold, not: null };
    }
    const rows = await this.prisma.vendorDocument.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorDocumentPrismaMapper.toDomain(r));
  }

  async findExpiring(days: number): Promise<readonly VendorDocumentEntity[]> {
    const now = new Date();
    const threshold = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    const rows = await this.prisma.vendorDocument.findMany({
      where: {
        deletedAt: null,
        expiresAt: { gte: now, lte: threshold },
      },
    });
    return rows.map((r) => VendorDocumentPrismaMapper.toDomain(r));
  }

  async findExpired(): Promise<readonly VendorDocumentEntity[]> {
    const rows = await this.prisma.vendorDocument.findMany({
      where: {
        deletedAt: null,
        expiresAt: { lt: new Date() },
      },
    });
    return rows.map((r) => VendorDocumentPrismaMapper.toDomain(r));
  }

  async findPendingReview(): Promise<readonly VendorDocumentEntity[]> {
    const rows = await this.prisma.vendorDocument.findMany({
      where: { status: { in: ['pending', 'resubmitted'] }, deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => VendorDocumentPrismaMapper.toDomain(r));
  }

  async save(entity: VendorDocumentEntity): Promise<VendorDocumentEntity> {
    const data = VendorDocumentPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.vendorDocument.findFirst({
      where: { id: entity.id },
    });
    const row = existing
      ? await this.prisma.vendorDocument.update({ where: { id: entity.id }, data })
      : await this.prisma.vendorDocument.create({ data: data as never });
    return VendorDocumentPrismaMapper.toDomain(row);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendorDocument.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.vendorDocument.count({
      where: { id, deletedAt: null },
    });
    return count > 0;
  }

  async countByVendor(vendorId: string): Promise<number> {
    return this.prisma.vendorDocument.count({ where: { vendorId, deletedAt: null } });
  }

  async countByStatus(status: DocumentStatusVO): Promise<number> {
    return this.prisma.vendorDocument.count({
      where: { status: status.value, deletedAt: null },
    });
  }

  async existsByVendorIdAndType(vendorId: string, type: DocumentTypeVO): Promise<boolean> {
    const count = await this.prisma.vendorDocument.count({
      where: { vendorId, type: type.value, deletedAt: null },
    });
    return count > 0;
  }

  async deleteByVendorId(vendorId: string): Promise<void> {
    await this.prisma.vendorDocument.updateMany({
      where: { vendorId },
      data: { deletedAt: new Date() },
    });
  }
}
