/**
 * VendorApprovalService — approval workflow
 * @module vendor-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  VENDOR_APPROVAL_REPOSITORY,
  type VendorApprovalRepository,
} from '../../../domain/repositories/vendor-approval.repository.interface.js';
import { ApprovalIdVO } from '../../../domain/value-objects/primitives/approval-id.vo.js';
import { ApprovalReasonVO } from '../../../domain/value-objects/primitives/approval-reason.vo.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { ApprovalMapper } from '../../mappers/approval.mapper.js';
import { VendorNotFoundApplicationError } from '../../errors/vendor.errors.js';
import type {
  ApproveVendorRequestDTO,
  RejectVendorRequestDTO,
  RequestInfoRequestDTO,
} from '../../dtos/requests/approval/index.js';
import type {
  ApprovalResponseDTO,
  ApprovalStatusResponseDTO,
} from '../../dtos/responses/approval-response.dto.js';
import type { IVendorApprovalService } from '../interfaces/vendor-approval.service.interface.js';

@Injectable()
export class VendorApprovalService implements IVendorApprovalService {
  private readonly logger = new Logger(VendorApprovalService.name);

  constructor(
    @Inject(VENDOR_APPROVAL_REPOSITORY)
    private readonly repo: VendorApprovalRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async approve(dto: ApproveVendorRequestDTO, actorId: string): Promise<ApprovalResponseDTO> {
    const approval = await this.repo.findLatestByVendor(dto.vendorId);
    if (!approval) throw new VendorNotFoundApplicationError(dto.vendorId);
    approval.approve(actorId, dto.notes);
    const saved = await this.repo.save(approval);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Vendor ${dto.vendorId} approved by ${actorId}`);
    return ApprovalMapper.toResponse(saved as never);
  }

  async reject(dto: RejectVendorRequestDTO, actorId: string): Promise<ApprovalResponseDTO> {
    const approval = await this.repo.findLatestByVendor(dto.vendorId);
    if (!approval) throw new VendorNotFoundApplicationError(dto.vendorId);
    approval.reject(ApprovalReasonVO.create(dto.reason), actorId, dto.notes);
    const saved = await this.repo.save(approval);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Vendor ${dto.vendorId} rejected by ${actorId} — ${dto.reason}`);
    return ApprovalMapper.toResponse(saved as never);
  }

  async requestInfo(dto: RequestInfoRequestDTO, actorId: string): Promise<ApprovalResponseDTO> {
    const approval = await this.repo.findLatestByVendor(dto.vendorId);
    if (!approval) throw new VendorNotFoundApplicationError(dto.vendorId);
    approval.requestInfo(dto.infoNeeded, actorId);
    const saved = await this.repo.save(approval);
    await this.eventBridge.publishFromEntity(saved as never);
    return ApprovalMapper.toResponse(saved as never);
  }

  async resubmit(vendorId: string, _actorId?: string): Promise<ApprovalResponseDTO> {
    const approval = await this.repo.findLatestByVendor(vendorId);
    if (!approval) throw new VendorNotFoundApplicationError(vendorId);
    approval.resubmit();
    const saved = await this.repo.save(approval);
    await this.eventBridge.publishFromEntity(saved as never);
    return ApprovalMapper.toResponse(saved as never);
  }

  async appeal(approvalId: string, _actorId?: string): Promise<ApprovalResponseDTO> {
    const approval = await this.load(approvalId);
    approval.appeal();
    const saved = await this.repo.save(approval);
    await this.eventBridge.publishFromEntity(saved as never);
    return ApprovalMapper.toResponse(saved as never);
  }

  async getById(id: string): Promise<ApprovalResponseDTO> {
    const entity = await this.load(id);
    return ApprovalMapper.toResponse(entity);
  }

  async getStatus(vendorId: string): Promise<ApprovalStatusResponseDTO> {
    const approval = await this.repo.findLatestByVendor(vendorId);
    if (!approval) throw new VendorNotFoundApplicationError(vendorId);
    return {
      vendorId,
      status: approval.status.value,
      latestApproval: ApprovalMapper.toResponse(approval as never),
      canResubmit: approval.canResubmit(),
      canAppeal: approval.canAppeal(),
      pendingDays: approval.pendingDays,
    };
  }

  async listPending(limit = 50): Promise<readonly ApprovalResponseDTO[]> {
    const entities = await this.repo.findPending(limit);
    return entities.map((e) => ApprovalMapper.toResponse(e as never));
  }

  async listOverdue(): Promise<readonly ApprovalResponseDTO[]> {
    const entities = await this.repo.findOverdue();
    return entities.map((e) => ApprovalMapper.toResponse(e as never));
  }

  private async load(id: string): Promise<import('../../../domain/entities/vendor-approval.entity.js').VendorApprovalEntity> {
    const vo = ApprovalIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new VendorNotFoundApplicationError(id);
    return entity;
  }
}
