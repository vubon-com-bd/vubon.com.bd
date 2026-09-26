/**
 * ComplaintService — use case orchestration
 * @module support-service/application/services/impl
 */
import { Injectable } from '@nestjs/common';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import type { ComplaintServiceInterface } from '../interfaces/complaint.service.interface';
import type { ComplaintRepository } from '../../../domain/repositories/complaint.repository.interface';
import { ComplaintEntity } from '../../../domain/entities/complaint.entity';
import { ComplaintIdVO } from '../../../domain/value-objects/primitives/complaint-id.vo';
import { ComplaintTypeVO } from '../../../domain/value-objects/primitives/complaint-type.vo';
import { ComplaintSeverityVO } from '../../../domain/value-objects/primitives/complaint-severity.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo';

import { ComplaintMapper } from '../../mappers/complaint.mapper';
import { ComplaintNotFoundException } from '../../errors/complaint.errors';
import type { FileComplaintRequestDTO } from '../../dtos/requests/complaint/file-complaint.dto';
import type { ResolveComplaintRequestDTO } from '../../dtos/requests/complaint/resolve-complaint.dto';
import type { EscalateComplaintRequestDTO } from '../../dtos/requests/complaint/escalate-complaint.dto';
import type { ComplaintResponseDTO } from '../../dtos/responses/complaint-response.dto';
import type { ComplaintListResponseDTO } from '../../dtos/responses/complaint-list-response.dto';

@Injectable()
export class ComplaintService implements ComplaintServiceInterface {
  constructor(
    private readonly complaintRepo: ComplaintRepository,
    private readonly mapper: ComplaintMapper,
  ) {}

  async file(input: FileComplaintRequestDTO): Promise<ComplaintResponseDTO> {
    if (input.description.length < 10) {
      throw new BusinessRuleError(
        'Description too short',
        'complaint.description.min',
      );
    }
    const now = new Date().toISOString();
    const userId = UserIdVO.create(input.userId ?? 'anonymous');

    const complaint = ComplaintEntity.create({
      id: ComplaintIdVO.generate(),
      type: ComplaintTypeVO.create(input.type),
      severity: ComplaintSeverityVO.create(input.severity),
      userId,
      description: input.description,
      orderId: input.orderId ? OrderIdVO.create(input.orderId) : undefined,
      now,
    });

    await this.complaintRepo.save(complaint);
    return this.mapper.map(complaint);
  }

  async resolve(input: ResolveComplaintRequestDTO): Promise<ComplaintResponseDTO> {
    const complaint = await this.loadOrThrow(input.complaintId);
    const resolver = UserIdVO.create(input.resolvedBy);
    complaint.resolve(resolver, input.resolution, new Date().toISOString());
    await this.complaintRepo.save(complaint);
    return this.mapper.map(complaint);
  }

  async escalate(input: EscalateComplaintRequestDTO): Promise<ComplaintResponseDTO> {
    const complaint = await this.loadOrThrow(input.complaintId);
    complaint.escalate(new Date().toISOString());
    await this.complaintRepo.save(complaint);
    return this.mapper.map(complaint);
  }

  async getById(complaintId: string): Promise<ComplaintResponseDTO> {
    const complaint = await this.loadOrThrow(complaintId);
    return this.mapper.map(complaint);
  }

  async list(page: number, limit: number): Promise<ComplaintListResponseDTO> {
    const all = await this.complaintRepo.findAll();
    const safeLimit = Math.max(1, Math.min(limit, 100));
    const safePage = Math.max(1, page);
    const total = all.length;
    const start = (safePage - 1) * safeLimit;
    const slice = all.slice(start, start + safeLimit);
    return {
      items: this.mapper.toList(slice),
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit) || 1,
    };
  }

  private async loadOrThrow(complaintId: string): Promise<ComplaintEntity> {
    const complaint = await this.complaintRepo.findById(
      ComplaintIdVO.create(complaintId),
    );
    if (!complaint) {
      throw new ComplaintNotFoundException(complaintId);
    }
    return complaint;
  }
}
