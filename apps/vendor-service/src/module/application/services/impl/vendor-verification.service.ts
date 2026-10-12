/**
 * VendorVerificationService
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_VERIFICATION_REPOSITORY,
  type VendorVerificationRepository,
} from '../../../domain/repositories/vendor-verification.repository.interface.js';
import { VendorVerificationEntity } from '../../../domain/entities/vendor-verification.entity.js';
import { VendorVerificationMapper } from '../../mappers/vendor-verification.mapper.js';
import {
  VENDOR_VERIFICATION_SERVICE,
  type IVendorVerificationService,
} from '../interfaces/vendor-verification.service.interface.js';
import type { SubmitVerificationRequestDto } from '../../dtos/requests/submit-verification.dto.js';
import type { VendorVerificationResponseDto } from '../../dtos/responses/vendor-verification-response.dto.js';
import { VerificationNotSubmittableError } from '../../errors/verification.errors.js';
import { VendorIdGeneratorService } from '../../../domain/services/vendor-id-generator.service.js';

@Injectable()
export class VendorVerificationService implements IVendorVerificationService {
  constructor(
    @Inject(VENDOR_VERIFICATION_REPOSITORY)
    private readonly repo: VendorVerificationRepository,
  ) {}

  async submit(dto: SubmitVerificationRequestDto, _actorId?: string): Promise<VendorVerificationResponseDto> {
    let entity = await this.repo.findByVendorId(dto.vendorId);
    const now = new Date().toISOString();

    if (!entity) {
      entity = VendorVerificationEntity.create({
        id: VendorIdGeneratorService.generateUUID(),
        vendorId: dto.vendorId,
        now,
      });
    }

    entity.submit(now);
    const saved = await this.repo.upsert(entity);
    return VendorVerificationMapper.toResponse(saved);
  }

  async startReview(vendorId: string, reviewedBy: string, _actorId?: string): Promise<VendorVerificationResponseDto> {
    const entity = await this.requireVerification(vendorId);
    entity.startReview(reviewedBy, new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return VendorVerificationMapper.toResponse(saved);
  }

  async approve(vendorId: string, reviewedBy: string, _actorId?: string): Promise<VendorVerificationResponseDto> {
    const entity = await this.requireVerification(vendorId);
    entity.approve(reviewedBy, new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return VendorVerificationMapper.toResponse(saved);
  }

  async reject(vendorId: string, reviewedBy: string, reason: string, _actorId?: string): Promise<VendorVerificationResponseDto> {
    const entity = await this.requireVerification(vendorId);
    entity.reject(reviewedBy, reason, new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return VendorVerificationMapper.toResponse(saved);
  }

  async getByVendorId(vendorId: string): Promise<VendorVerificationResponseDto> {
    const entity = await this.requireVerification(vendorId);
    return VendorVerificationMapper.toResponse(entity);
  }

  private async requireVerification(vendorId: string): Promise<VendorVerificationEntity> {
    const entity = await this.repo.findByVendorId(vendorId);
    if (!entity) {
      throw new VerificationNotSubmittableError(`no verification record for vendor ${vendorId}`);
    }
    return entity;
  }
}
