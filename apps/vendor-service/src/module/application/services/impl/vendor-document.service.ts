/**
 * VendorDocumentService
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_DOCUMENT_REPOSITORY,
  type VendorDocumentRepository,
} from '../../../domain/repositories/vendor-document.repository.interface.js';
import { VendorDocumentEntity } from '../../../domain/entities/vendor-document.entity.js';
import { DocumentIdVO } from '../../../domain/value-objects/primitives/document-id.vo.js';
import { DocumentTypeVO } from '../../../domain/value-objects/primitives/document-type.vo.js';
import { DocumentUrlVO } from '../../../domain/value-objects/primitives/document-url.vo.js';
import { DocumentMimeTypeVO } from '../../../domain/value-objects/primitives/document-mime-type.vo.js';
import { DocumentFileSizeVO } from '../../../domain/value-objects/primitives/document-file-size.vo.js';
import { VendorDocumentMapper } from '../../mappers/vendor-document.mapper.js';
import {
  VENDOR_DOCUMENT_SERVICE,
  type IVendorDocumentService,
} from '../interfaces/vendor-document.service.interface.js';
import type { UploadVendorDocumentRequestDto } from '../../dtos/requests/upload-document.dto.js';
import type {
  VendorDocumentResponseDto,
  VendorDocumentPublicDto,
} from '../../dtos/responses/vendor-document-response.dto.js';
import { DocumentNotFoundError } from '../../errors/verification.errors.js';
import { VendorIdGeneratorService } from '../../../domain/services/vendor-id-generator.service.js';

@Injectable()
export class VendorDocumentService implements IVendorDocumentService {
  constructor(
    @Inject(VENDOR_DOCUMENT_REPOSITORY)
    private readonly repo: VendorDocumentRepository,
  ) {}

  async upload(dto: UploadVendorDocumentRequestDto, _actorId?: string): Promise<VendorDocumentResponseDto> {
    const now = new Date().toISOString();
    const docId = VendorIdGeneratorService.generateUUID();

    const doc = VendorDocumentEntity.create({
      id: docId,
      now,
      props: {
        vendorId: dto.vendorId,
        type: DocumentTypeVO.create(dto.type),
        fileUrl: DocumentUrlVO.create(dto.fileUrl),
        fileName: dto.fileName,
        mimeType: DocumentMimeTypeVO.create(dto.mimeType),
        fileSize: DocumentFileSizeVO.create(dto.fileSize),
        documentNumber: dto.documentNumber,
        issuedAt: dto.issuedAt,
        expiresAt: dto.expiresAt,
        notes: dto.notes,
      },
    });

    const saved = await this.repo.save(doc);
    return VendorDocumentMapper.toResponse(saved);
  }

  async verify(documentId: string, verifiedBy: string, _actorId?: string): Promise<VendorDocumentResponseDto> {
    const doc = await this.requireDocument(documentId);
    doc.verify(verifiedBy, new Date().toISOString());
    const saved = await this.repo.save(doc);
    return VendorDocumentMapper.toResponse(saved);
  }

  async reject(documentId: string, reason: string, _actorId?: string): Promise<VendorDocumentResponseDto> {
    const doc = await this.requireDocument(documentId);
    doc.reject(reason, new Date().toISOString());
    const saved = await this.repo.save(doc);
    return VendorDocumentMapper.toResponse(saved);
  }

  async resubmit(documentId: string, fileUrl: string, _actorId?: string): Promise<VendorDocumentResponseDto> {
    const doc = await this.requireDocument(documentId);
    doc.resubmit(DocumentUrlVO.create(fileUrl), new Date().toISOString());
    const saved = await this.repo.save(doc);
    return VendorDocumentMapper.toResponse(saved);
  }

  async getById(documentId: string): Promise<VendorDocumentResponseDto> {
    const doc = await this.requireDocument(documentId);
    return VendorDocumentMapper.toResponse(doc);
  }

  async listByVendor(vendorId: string): Promise<readonly VendorDocumentResponseDto[]> {
    const docs = await this.repo.findByVendorId(vendorId);
    return VendorDocumentMapper.toResponseList(docs);
  }

  async listPublicByVendor(vendorId: string): Promise<readonly VendorDocumentPublicDto[]> {
    const docs = await this.repo.findByVendorId(vendorId);
    return VendorDocumentMapper.toPublicList(docs);
  }

  private async requireDocument(id: string): Promise<VendorDocumentEntity> {
    const doc = await this.repo.findByIdVO(DocumentIdVO.create(id));
    if (!doc) throw new DocumentNotFoundError(id);
    return doc;
  }
}
