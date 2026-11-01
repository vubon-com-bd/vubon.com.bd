/**
 * VendorDocumentPrismaMapper — row ↔ domain entity
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import { VendorDocumentEntity } from '../../../../domain/entities/vendor-document.entity.js';
import { VendorDocumentVO } from '../../../../domain/value-objects/composites/vendor-document.vo.js';
import { DocumentIdVO } from '../../../../domain/value-objects/primitives/document-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { DocumentTypeVO } from '../../../../domain/value-objects/primitives/document-type.vo.js';
import { DocumentStatusVO } from '../../../../domain/value-objects/primitives/document-status.vo.js';

export interface VendorDocumentPrismaRow {
  id: string;
  vendorId: string;
  type: string;
  status: string;
  documentNumber: string | null;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  issuedAt: Date | null;
  expiresAt: Date | null;
  uploadedAt: Date;
  verifiedAt: Date | null;
  verifiedBy: string | null;
  rejectionReason: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toIso = (d: Date | null | undefined): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

export class VendorDocumentPrismaMapper {
  static toDomain(raw: VendorDocumentPrismaRow): VendorDocumentEntity {
    const vo = VendorDocumentVO.reconstitute({
      id: DocumentIdVO.reconstitute(raw.id),
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      type: DocumentTypeVO.reconstitute(raw.type),
      status: DocumentStatusVO.reconstitute(raw.status),
      documentNumber: raw.documentNumber ?? undefined,
      fileUrl: raw.fileUrl,
      fileName: raw.fileName,
      fileSize: raw.fileSize,
      mimeType: raw.mimeType,
      issuedAt: toIso(raw.issuedAt),
      expiresAt: toIso(raw.expiresAt),
      uploadedAt: new Date(raw.uploadedAt).toISOString(),
      verifiedAt: toIso(raw.verifiedAt),
      verifiedBy: raw.verifiedBy ?? undefined,
      rejectionReason: raw.rejectionReason ?? undefined,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
    });

    return VendorDocumentEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      props: { vo },
    });
  }

  static toPersistence(entity: VendorDocumentEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      vendorId: vo.vendorId.value,
      type: vo.type.value,
      status: vo.status.value,
      documentNumber: vo.documentNumber ?? null,
      fileUrl: vo.fileUrl,
      fileName: vo.fileName,
      fileSize: vo.fileSize,
      mimeType: vo.mimeType,
      issuedAt: vo.issuedAt ? new Date(vo.issuedAt) : null,
      expiresAt: vo.expiresAt ? new Date(vo.expiresAt) : null,
      uploadedAt: new Date(vo.uploadedAt),
      verifiedAt: vo.verifiedAt ? new Date(vo.verifiedAt) : null,
      verifiedBy: vo.verifiedBy ?? null,
      rejectionReason: vo.rejectionReason ?? null,
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
