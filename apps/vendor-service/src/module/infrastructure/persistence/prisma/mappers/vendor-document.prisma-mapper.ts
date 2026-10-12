/**
 * VendorDocumentPrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { VendorDocument as PrismaVendorDocument } from '@prisma/client';
import { VendorDocumentEntity } from '../../../../domain/entities/vendor-document.entity.js';
import { DocumentTypeVO } from '../../../../domain/value-objects/primitives/document-type.vo.js';
import { DocumentStatusVO } from '../../../../domain/value-objects/primitives/document-status.vo.js';
import { DocumentUrlVO } from '../../../../domain/value-objects/primitives/document-url.vo.js';
import { DocumentMimeTypeVO } from '../../../../domain/value-objects/primitives/document-mime-type.vo.js';
import { DocumentFileSizeVO } from '../../../../domain/value-objects/primitives/document-file-size.vo.js';

export class VendorDocumentPrismaMapper {
  static toDomain(row: PrismaVendorDocument): VendorDocumentEntity {
    return VendorDocumentEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      props: {
        vendorId: row.vendorId,
        type: DocumentTypeVO.create(row.type),
        status: DocumentStatusVO.create(row.status),
        fileUrl: DocumentUrlVO.create(row.fileUrl),
        fileName: row.fileName,
        mimeType: DocumentMimeTypeVO.create(row.mimeType),
        fileSize: DocumentFileSizeVO.create(row.fileSize),
        documentNumber: row.documentNumber ?? undefined,
        issuedAt: row.issuedAt?.toISOString(),
        expiresAt: row.expiresAt?.toISOString(),
        verifiedAt: row.verifiedAt?.toISOString(),
        verifiedBy: row.verifiedBy ?? undefined,
        rejectionReason: row.rejectionReason ?? undefined,
        notes: row.notes ?? undefined,
      },
    });
  }

  static toPersistence(entity: VendorDocumentEntity): Record<string, unknown> {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      type: entity.type.value,
      status: entity.status.value,
      fileUrl: entity.fileUrl.value,
      fileName: entity.fileName,
      mimeType: entity.mimeType.value,
      fileSize: entity.fileSize.bytes,
      documentNumber: entity.documentNumber,
      issuedAt: entity.issuedAt ? new Date(entity.issuedAt) : null,
      expiresAt: entity.expiresAt ? new Date(entity.expiresAt) : null,
      verifiedAt: entity.verifiedAt ? new Date(entity.verifiedAt) : null,
      verifiedBy: entity.verifiedBy,
      rejectionReason: entity.rejectionReason,
      notes: entity.notes,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
