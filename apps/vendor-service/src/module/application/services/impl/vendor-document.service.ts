/**
 * VendorDocumentService — document upload + review
 * @module vendor-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  VENDOR_DOCUMENT_REPOSITORY,
  type VendorDocumentRepository,
} from '../../../domain/repositories/vendor-document.repository.interface.js';
import { VendorDocumentEntity } from '../../../domain/entities/vendor-document.entity.js';
import { VendorDocumentVO } from '../../../domain/value-objects/composites/vendor-document.vo.js';
import { DocumentIdVO } from '../../../domain/value-objects/primitives/document-id.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { DocumentTypeVO } from '../../../domain/value-objects/primitives/document-type.vo.js';
import { DocumentStatusVO } from '../../../domain/value-objects/primitives/document-status.vo.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { DocumentMapper } from '../../mappers/document.mapper.js';
import { VendorNotFoundApplicationError, VendorValidationError } from '../../errors/vendor.errors.js';
import type { UploadDocumentRequestDTO } from '../../dtos/requests/verification/upload-document.dto.js';
import type {
  DocumentResponseDTO,
  DocumentListResponseDTO,
} from '../../dtos/responses/verification-response.dto.js';
import type { IVendorDocumentService } from '../interfaces/vendor-document.service.interface.js';

@Injectable()
export class VendorDocumentService implements IVendorDocumentService {
  private readonly logger = new Logger(VendorDocumentService.name);

  constructor(
    @Inject(VENDOR_DOCUMENT_REPOSITORY)
    private readonly repo: VendorDocumentRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async upload(dto: UploadDocumentRequestDTO, _actorId?: string): Promise<DocumentResponseDTO> {
    const now = new Date().toISOString();
    const id = randomUUID();

    const vo = VendorDocumentVO.create({
      id: DocumentIdVO.create(id),
      vendorId: VendorIdVO.create(dto.vendorId),
      type: DocumentTypeVO.create(dto.type),
      status: DocumentStatusVO.pending(),
      documentNumber: dto.documentNumber,
      fileUrl: dto.fileUrl,
      fileName: dto.fileName,
      fileSize: dto.fileSize,
      mimeType: dto.mimeType,
      issuedAt: dto.issuedAt,
      expiresAt: dto.expiresAt,
      uploadedAt: now,
      createdAt: now,
      updatedAt: now,
    });

    const entity = VendorDocumentEntity.create({ id, vo, now });
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Document ${saved.id} uploaded for vendor ${dto.vendorId}`);
    return DocumentMapper.toResponse(saved as never);
  }

  async approve(documentId: string, actorId: string): Promise<DocumentResponseDTO> {
    const entity = await this.load(documentId);
    entity.approve(actorId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Document ${saved.id} approved by ${actorId}`);
    return DocumentMapper.toResponse(saved as never);
  }

  async reject(documentId: string, reason: string, actorId: string): Promise<DocumentResponseDTO> {
    const entity = await this.load(documentId);
    entity.reject(reason, actorId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Document ${saved.id} rejected by ${actorId}`);
    return DocumentMapper.toResponse(saved as never);
  }

  async resubmit(documentId: string, fileUrl: string, fileName: string, fileSize: number, _actorId?: string): Promise<DocumentResponseDTO> {
    const entity = await this.load(documentId);
    entity.resubmit(fileUrl, fileName, fileSize);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return DocumentMapper.toResponse(saved as never);
  }

  async remove(documentId: string, _actorId?: string): Promise<{ readonly success: true }> {
    await this.repo.delete(documentId);
    return { success: true };
  }

  async getById(id: string): Promise<DocumentResponseDTO> {
    const entity = await this.load(id);
    return DocumentMapper.toResponse(entity);
  }

  async listByVendor(vendorId: string): Promise<DocumentListResponseDTO> {
    const entities = await this.repo.findByVendor(VendorIdVO.create(vendorId));
    return DocumentMapper.toListResponse(entities as never, entities.length, 1, entities.length);
  }

  async listPending(limit = 50): Promise<readonly DocumentResponseDTO[]> {
    const entities = await this.repo.findPendingReview();
    return entities.slice(0, limit).map((e) => DocumentMapper.toResponse(e as never));
  }

  async listExpiringSoon(days: number): Promise<readonly DocumentResponseDTO[]> {
    const entities = await this.repo.findExpiringSoon(days);
    return entities.map((e) => DocumentMapper.toResponse(e as never));
  }

  async listExpired(): Promise<readonly DocumentResponseDTO[]> {
    const entities = await this.repo.findExpired();
    return entities.map((e) => DocumentMapper.toResponse(e as never));
  }

  private async load(id: string): Promise<VendorDocumentEntity> {
    const vo = DocumentIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new VendorValidationError(`Document "${id}" not found`, 'documentId');
    return entity;
  }
}
