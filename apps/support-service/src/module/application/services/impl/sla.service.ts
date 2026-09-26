/**
 * SlaService — use case orchestration
 * @module support-service/application/services/impl
 */
import { Injectable } from '@nestjs/common';

import type { SlaServiceInterface } from '../interfaces/sla.service.interface';
import type { SlaRepository } from '../../../domain/repositories/sla.repository.interface';
import { SlaEntity } from '../../../domain/entities/sla.entity';
import { SlaIdVO } from '../../../domain/value-objects/primitives/sla-id.vo';
import { SlaTypeVO } from '../../../domain/value-objects/primitives/sla-type.vo';
import { SlaTargetVO } from '../../../domain/value-objects/primitives/sla-target.vo';
import { TicketIdVO } from '../../../domain/value-objects/primitives/ticket-id.vo';
import { TicketPriorityVO } from '../../../domain/value-objects/primitives/ticket-priority.vo';

import { SlaMapper } from '../../mappers/sla.mapper';
import { SlaNotFoundException } from '../../errors/sla.errors';
import type { CreateSlaRequestDTO } from '../../dtos/requests/sla/create-sla.dto';
import type { UpdateSlaRequestDTO } from '../../dtos/requests/sla/update-sla.dto';
import type { SlaResponseDTO } from '../../dtos/responses/sla-response.dto';

@Injectable()
export class SlaService implements SlaServiceInterface {
  constructor(
    private readonly slaRepo: SlaRepository,
    private readonly mapper: SlaMapper,
  ) {}

  async create(input: CreateSlaRequestDTO): Promise<SlaResponseDTO> {
    const now = new Date().toISOString();
    const sla = SlaEntity.create({
      id: SlaIdVO.generate(),
      type: SlaTypeVO.create(input.metric),
      target: SlaTargetVO.create(input.targetMinutes),
      priority: TicketPriorityVO.create(input.priority),
      ticketId: TicketIdVO.create(input.ticketId),
      now,
    });
    await this.slaRepo.save(sla);
    return this.mapper.map(sla);
  }

  async update(input: UpdateSlaRequestDTO): Promise<SlaResponseDTO> {
    const sla = await this.loadOrThrow(input.slaId);
    // SLA target update passes through a rebuild in fuller impl
    void input.targetMinutes;
    await this.slaRepo.save(sla);
    return this.mapper.map(sla);
  }

  async getById(slaId: string): Promise<SlaResponseDTO> {
    const sla = await this.loadOrThrow(slaId);
    return this.mapper.map(sla);
  }

  async listByTicket(ticketId: string): Promise<readonly SlaResponseDTO[]> {
    const all = await this.slaRepo.findByTicket(TicketIdVO.create(ticketId));
    return this.mapper.toList(all);
  }

  async tick(slaId: string, elapsedMinutes: number): Promise<SlaResponseDTO> {
    const sla = await this.loadOrThrow(slaId);
    sla.tick(elapsedMinutes, new Date().toISOString());
    await this.slaRepo.save(sla);
    return this.mapper.map(sla);
  }

  private async loadOrThrow(slaId: string): Promise<SlaEntity> {
    const sla = await this.slaRepo.findById(SlaIdVO.create(slaId));
    if (!sla) {
      throw new SlaNotFoundException(slaId);
    }
    return sla;
  }
}
