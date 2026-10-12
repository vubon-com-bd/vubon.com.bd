/**
 * VendorApprovalService
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_APPROVAL_REPOSITORY,
  type VendorApprovalRepository,
} from '../../../domain/repositories/vendor-approval.repository.interface.js';
import { VendorApprovalEntity } from '../../../domain/entities/vendor-approval.entity.js';
import { ApprovalReasonVO } from '../../../domain/value-objects/primitives/approval-reason.vo.js';
import {
  VENDOR_APPROVAL_SERVICE,
  type IVendorApprovalService,
} from '../interfaces/vendor-approval.service.interface.js';
import type { ApproveVendorRequestDto } from '../../dtos/requests/approve-vendor.dto.js';
import type { RejectVendorRequestDto } from '../../dtos/requests/reject-vendor.dto.js';
import type { VendorApprovalResponseDto } from '../../dtos/responses/vendor-approval-response.dto.js';
import { ApprovalNotFoundError } from '../../errors/approval.errors.js';

@Injectable()
export class VendorApprovalService implements IVendorApprovalService {
  constructor(
    @Inject(VENDOR_APPROVAL_REPOSITORY)
    private readonly repo: VendorApprovalRepository,
  ) {}

  async approve(dto: ApproveVendorRequestDto, _actorId?: string): Promise<VendorApprovalResponseDto> {
    const entity = await this.requireApproval(dto.vendorId);
    entity.approve(dto.reviewedBy, dto.note, new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async reject(dto: RejectVendorRequestDto, _actorId?: string): Promise<VendorApprovalResponseDto> {
    const entity = await this.requireApproval(dto.vendorId);
    entity.reject(
      dto.reviewedBy,
      ApprovalReasonVO.create(dto.reason),
      dto.note,
      new Date().toISOString(),
    );
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async requestInfo(vendorId: string, reviewedBy: string, note: string, _actorId?: string): Promise<VendorApprovalResponseDto> {
    const entity = await this.requireApproval(vendorId);
    entity.requestInfo(reviewedBy, note, new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async resubmit(vendorId: string, _actorId?: string): Promise<VendorApprovalResponseDto> {
    const entity = await this.requireApproval(vendorId);
    entity.resubmit(new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async fileAppeal(vendorId: string, _actorId?: string): Promise<VendorApprovalResponseDto> {
    const entity = await this.requireApproval(vendorId);
    entity.fileAppeal(new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async getByVendorId(vendorId: string): Promise<VendorApprovalResponseDto> {
    const entity = await this.requireApproval(vendorId);
    return this.toResponse(entity);
  }

  private async requireApproval(vendorId: string): Promise<VendorApprovalEntity> {
    const entity = await this.repo.findByVendorId(vendorId);
    if (!entity) throw new ApprovalNotFoundError(vendorId);
    return entity;
  }

  private toResponse(entity: VendorApprovalEntity): VendorApprovalResponseDto {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      status: entity.status.value as VendorApprovalResponseDto['status'],
      reason: entity.reason?.value as VendorApprovalResponseDto['reason'],
      submittedAt: entity.submittedAt,
      reviewedAt: entity.reviewedAt,
      resubmissionCount: entity.resubmissionCount,
      appealDeadline: entity.appealDeadline,
      isSlaBreached: entity.isSlaBreached(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
