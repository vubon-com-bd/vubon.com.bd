/**
 * VendorDocumentMapper
 * @module vendor-service/application/mappers
 */
import type { VendorDocumentEntity } from '../../domain/entities/vendor-document.entity.js';
import type {
  VendorDocumentResponseDto,
  VendorDocumentPublicDto,
} from '../dtos/responses/vendor-document-response.dto.js';

export class VendorDocumentMapper {
  static toResponse(entity: VendorDocumentEntity): VendorDocumentResponseDto {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      type: entity.type.value as VendorDocumentResponseDto['type'],
      status: entity.status.value as VendorDocumentResponseDto['status'],
      fileUrl: entity.fileUrl.value,
      fileName: entity.fileName,
      mimeType: entity.mimeType.value,
      fileSize: entity.fileSize.bytes,
      documentNumber: entity.documentNumber,
      issuedAt: entity.issuedAt,
      expiresAt: entity.expiresAt,
      verifiedAt: entity.verifiedAt,
      verifiedBy: entity.verifiedBy,
      rejectionReason: entity.rejectionReason,
      notes: entity.notes,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublic(entity: VendorDocumentEntity): VendorDocumentPublicDto {
    return {
      id: entity.id,
      type: entity.type.value as VendorDocumentPublicDto['type'],
      status: entity.status.value as VendorDocumentPublicDto['status'],
      fileName: entity.fileName,
      uploadedAt: entity.createdAt,
      expiresAt: entity.expiresAt,
    };
  }

  static toResponseList(
    entities: readonly VendorDocumentEntity[],
  ): readonly VendorDocumentResponseDto[] {
    return entities.map((e) => VendorDocumentMapper.toResponse(e));
  }

  static toPublicList(
    entities: readonly VendorDocumentEntity[],
  ): readonly VendorDocumentPublicDto[] {
    return entities.map((e) => VendorDocumentMapper.toPublic(e));
  }
}
