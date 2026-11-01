/**
 * DocumentMapper
 * @module vendor-service/application/mappers
 */
import type { VendorDocumentEntity } from '../../domain/entities/vendor-document.entity.js';
import type {
  DocumentResponseDTO,
  DocumentListResponseDTO,
} from '../dtos/responses/verification-response.dto.js';

export class DocumentMapper {
  static toResponse(entity: VendorDocumentEntity): DocumentResponseDTO {
    return {
      id: entity.id,
      vendorId: entity.vendorId.value,
      type: entity.type.value,
      status: entity.status.value,
      documentNumber: entity.vo.documentNumber,
      fileUrl: entity.fileUrl,
      fileName: entity.fileName,
      fileSize: entity.fileSize,
      mimeType: entity.mimeType,
      issuedAt: entity.issuedAt,
      expiresAt: entity.expiresAt,
      uploadedAt: entity.uploadedAt,
      verifiedAt: entity.verifiedAt,
      verifiedBy: entity.verifiedBy,
      rejectionReason: entity.rejectionReason,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toListResponse(
    entities: readonly VendorDocumentEntity[],
    total: number,
    page: number,
    limit: number,
  ): DocumentListResponseDTO {
    return {
      items: entities.map((e) => this.toResponse(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / Math.max(1, limit)),
    };
  }
}
