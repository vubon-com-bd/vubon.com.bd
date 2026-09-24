import { Injectable } from '@nestjs/common';
import type { ComplaintServiceInterface } from '../interfaces/complaint.service.interface';
import type { ComplaintRepository } from '../../../domain/repositories/complaint.repository.interface';
import { ComplaintEntity } from '../../../domain/entities/complaint.entity';
import { ComplaintIdVO } from '../../../domain/value-objects/primitives/complaint-id.vo';
import { ComplaintTypeVO } from '../../../domain/value-objects/primitives/complaint-type.vo';
import { ComplaintStatusVO } from '../../../domain/value-objects/primitives/complaint-status.vo';
import { ComplaintSeverityVO } from '../../../domain/value-objects/primitives/complaint-severity.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { ComplaintNotFoundError, ComplaintOperationFailedError } from '../../errors/complaint.errors';
import type { FileComplaintRequestDTO } from '../../dtos/requests/complaint';
import type { ComplaintResponseDTO } from '../../dtos/responses/complaint-response.dto';

@Injectable()
export class ComplaintService implements ComplaintServiceInterface {
  constructor(private readonly complaintRepo: ComplaintRepository) {}

  async file(input: FileComplaintRequestDTO): Promise<ComplaintResponseDTO> {
    try {
      const entity = ComplaintEntity.create({
        userId: UserIdVO.create(input.userId),
        type: ComplaintTypeVO.create(input.type),
        severity: ComplaintSeverityVO.create(input.severity),
        status: ComplaintStatusVO.create('open'),
        content: input.content,
      });
      const saved = await this.complaintRepo.save(entity);
      return this.toDTO(saved);
    } catch (error) {
      throw new ComplaintOperationFailedError(
        error instanceof Error ? error.message : 'unknown',
      );
    }
  }

  async findById(id: ComplaintIdVO): Promise<ComplaintEntity | null> {
    return this.complaintRepo.findById(id);
  }

  async resolve(id: ComplaintIdVO, resolution: string): Promise<void> {
    const existing = await this.complaintRepo.findById(id);
    if (!existing) throw new ComplaintNotFoundError(id.value);
    void resolution;
    // In full impl: create updated entity with resolved status
  }

  private toDTO(entity: ComplaintEntity): ComplaintResponseDTO {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      type: entity.type.value,
      severity: entity.severity.value,
      status: entity.status.value,
      content: entity.content,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
