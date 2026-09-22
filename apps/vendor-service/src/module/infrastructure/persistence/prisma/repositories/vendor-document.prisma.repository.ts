import { Injectable } from '@nestjs/common';
import { VendorDocument as PrismaVendorDocument } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorDocumentEntity } from '../../../../domain/entities/vendor-document.entity';
import { DocumentIdVO } from '../../../../domain/value-objects/primitives/document-id.vo';
import { DocumentTypeVO } from '../../../../domain/value-objects/primitives/document-type.vo';
import { DocumentStatusVO } from '../../../../domain/value-objects/primitives/document-status.vo';
import { DocumentUrlVO } from '../../../../domain/value-objects/primitives/document-url.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorDocumentRepository } from '../../../../domain/repositories/vendor-document.repository.interface';

@Injectable()
export class VendorDocumentPrismaRepository
  extends BasePrismaRepository<VendorDocumentEntity, DocumentIdVO>
  implements VendorDocumentRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendorDocument): VendorDocumentEntity {
    return VendorDocumentEntity.reconstitute(
      DocumentIdVO.create(raw.id),
      {
        vendorId: VendorIdVO.create(raw.vendorId),
        type: DocumentTypeVO.create(raw.type),
        status: DocumentStatusVO.create(raw.status),
        url: DocumentUrlVO.create(raw.url),
        number: raw.number,
        issuedAt: raw.issuedAt,
        expiresAt: raw.expiresAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: DocumentIdVO): Promise<VendorDocumentEntity | null> {
    const raw = await this.prisma.vendorDocument.findUnique({
      where: { id: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorDocumentEntity[]> {
    const rows = await this.prisma.vendorDocument.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorDocumentEntity): Promise<VendorDocumentEntity> {
    const data = {
      vendorId: entity.vendorId.value,
      type: entity.type.value,
      status: entity.status.value,
      url: entity.url.value,
      number: entity.number,
      issuedAt: entity.issuedAt,
      expiresAt: entity.expiresAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vendorDocument.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: DocumentIdVO): Promise<void> {
    await this.prisma.vendorDocument.delete({ where: { id: id.value } });
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorDocumentEntity[]> {
    const rows = await this.prisma.vendorDocument.findMany({
      where: { vendorId: vendorId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findExpired(before: Date): Promise<readonly VendorDocumentEntity[]> {
    const rows = await this.prisma.vendorDocument.findMany({
      where: { expiresAt: { lt: before } },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
