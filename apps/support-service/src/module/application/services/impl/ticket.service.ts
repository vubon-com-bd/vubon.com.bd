/**
 * TicketService — use case orchestration for tickets
 * @module support-service/application/services/impl
 *
 * Registry: @Injectable() — NestJS DI allowed here (decorator only)
 * Rule: no business logic, delegates to domain; no direct DB
 */
import { Injectable } from '@nestjs/common';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import type { TicketServiceInterface } from '../interfaces/ticket.service.interface';
import type { TicketRepository } from '../../../domain/repositories/ticket.repository.interface';
import type { SupportAgentRepository } from '../../../domain/repositories/support-agent.repository.interface';
import { TicketEntity } from '../../../domain/entities/ticket.entity';
import { TicketIdVO } from '../../../domain/value-objects/primitives/ticket-id.vo';
import { TicketNumberVO } from '../../../domain/value-objects/primitives/ticket-number.vo';
import { TicketSubjectVO } from '../../../domain/value-objects/primitives/ticket-subject.vo';
import { TicketDescriptionVO } from '../../../domain/value-objects/primitives/ticket-description.vo';
import { TicketTypeVO } from '../../../domain/value-objects/primitives/ticket-type.vo';
import { TicketPriorityVO } from '../../../domain/value-objects/primitives/ticket-priority.vo';
import { TicketChannelVO } from '../../../domain/value-objects/primitives/ticket-channel.vo';
import { TicketCategoryIdVO } from '../../../domain/value-objects/primitives/ticket-category-id.vo';
import { TicketStatusVO } from '../../../domain/value-objects/primitives/ticket-status.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../../../domain/value-objects/primitives/agent-id.vo';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo';
import { TicketEscalationLevelVO } from '../../../domain/value-objects/primitives/ticket-escalation-level.vo';
import { TicketSatisfactionIdVO } from '../../../domain/value-objects/primitives/ticket-satisfaction-id.vo';
import { SatisfactionScoreVO } from '../../../domain/value-objects/primitives/satisfaction-score.vo';
import { SatisfactionCommentVO } from '../../../domain/value-objects/primitives/satisfaction-comment.vo';
import { TICKET_STATUS } from '@vubon/shared-constants/support';

import { TicketMapper } from '../../mappers/ticket.mapper';
import { TicketNotFoundException } from '../../errors/ticket.errors';
import type { CreateTicketRequestDTO } from '../../dtos/requests/ticket/create-ticket.dto';
import type { UpdateTicketRequestDTO } from '../../dtos/requests/ticket/update-ticket.dto';
import type { AssignTicketRequestDTO } from '../../dtos/requests/ticket/assign-ticket.dto';
import type { EscalateTicketRequestDTO } from '../../dtos/requests/ticket/escalate-ticket.dto';
import type { ResolveTicketRequestDTO } from '../../dtos/requests/ticket/resolve-ticket.dto';
import type { CloseTicketRequestDTO } from '../../dtos/requests/ticket/close-ticket.dto';
import type { ReopenTicketRequestDTO } from '../../dtos/requests/ticket/reopen-ticket.dto';
import type { RateTicketRequestDTO } from '../../dtos/requests/ticket/rate-ticket.dto';
import type { TicketResponseDTO } from '../../dtos/responses/ticket-response.dto';
import type { TicketDetailResponseDTO } from '../../dtos/responses/ticket-detail-response.dto';
import type { TicketListResponseDTO } from '../../dtos/responses/ticket-list-response.dto';

@Injectable()
export class TicketService implements TicketServiceInterface {
  constructor(
    private readonly ticketRepo: TicketRepository,
    private readonly agentRepo: SupportAgentRepository,
    private readonly mapper: TicketMapper,
  ) {}

  async create(input: CreateTicketRequestDTO): Promise<TicketResponseDTO> {
    const now = new Date().toISOString();
    const sequence = await this.ticketRepo.nextTicketSequence();
    const userId = UserIdVO.create(input.customerId ?? 'anonymous');

    const ticket = TicketEntity.create({
      id: TicketIdVO.generate(`${sequence}-${Date.now()}`),
      number: TicketNumberVO.fromSequence(sequence),
      subject: TicketSubjectVO.create(input.subject),
      description: TicketDescriptionVO.create(input.description),
      type: TicketTypeVO.create(input.type),
      channel: TicketChannelVO.create(input.channel),
      priority: TicketPriorityVO.create(input.priority),
      userId,
      categoryId: TicketCategoryIdVO.generate(input.category),
      orderId: input.orderId ? OrderIdVO.create(input.orderId) : undefined,
      productId: input.productId ? ProductIdVO.create(input.productId) : undefined,
      now,
    });

    await this.ticketRepo.save(ticket);
    return this.mapper.map(ticket);
  }

  async update(
    ticketId: string,
    input: UpdateTicketRequestDTO,
  ): Promise<TicketResponseDTO> {
    const ticket = await this.loadOrThrow(ticketId);
    const now = new Date().toISOString();

    if (input.subject !== undefined) {
      ticket.updateSubject(TicketSubjectVO.create(input.subject), now);
    }
    if (input.description !== undefined) {
      ticket.updateDescription(TicketDescriptionVO.create(input.description), now);
    }
    if (input.status !== undefined) {
      ticket.changeStatus(TicketStatusVO.create(input.status), now);
    }
    if (input.priority !== undefined) {
      ticket.changePriority(TicketPriorityVO.create(input.priority), now);
    }
    if (input.assignedTo !== undefined) {
      ticket.assignTo(AgentIdVO.create(input.assignedTo), now);
    }

    await this.ticketRepo.save(ticket);
    return this.mapper.map(ticket);
  }

  async getDetail(ticketId: string): Promise<TicketDetailResponseDTO> {
    const ticket = await this.loadOrThrow(ticketId);
    const base = this.mapper.map(ticket);
    const ageMs = Date.now() - Date.parse(ticket.createdAt);
    return {
      ...base,
      internalNoteCount: 0,
      messageCount: 0,
      attachmentCount: 0,
      escalationCount: 0,
      ageMinutes: Math.max(0, Math.round(ageMs / 60000)),
    };
  }

  async list(
    page: number,
    limit: number,
    _filter?: Readonly<Record<string, unknown>>,
  ): Promise<TicketListResponseDTO> {
    const all = await this.ticketRepo.findAll();
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

  async assign(input: AssignTicketRequestDTO): Promise<TicketResponseDTO> {
    const ticket = await this.loadOrThrow(input.ticketId);
    const now = new Date().toISOString();
    const agentId = AgentIdVO.create(input.agentId);

    const agent = await this.agentRepo.findById(agentId);
    if (!agent) {
      throw new BusinessRuleError('Agent not found', 'ticket.assign.agent.missing');
    }
    ticket.assignTo(agentId, now);
    agent.assignTicket(ticket.id, now);

    await this.ticketRepo.save(ticket);
    await this.agentRepo.save(agent);
    return this.mapper.map(ticket);
  }

  async escalate(input: EscalateTicketRequestDTO): Promise<TicketResponseDTO> {
    const ticket = await this.loadOrThrow(input.ticketId);
    const now = new Date().toISOString();
    const level = input.level
      ? TicketEscalationLevelVO.create(input.level)
      : TicketEscalationLevelVO.first();

    if (level.isHighest()) {
      ticket.changePriority(TicketPriorityVO.create('critical'), now);
    }
    ticket.changeStatus(TicketStatusVO.create(TICKET_STATUS.IN_PROGRESS), now);
    await this.ticketRepo.save(ticket);
    return this.mapper.map(ticket);
  }

  async resolve(input: ResolveTicketRequestDTO): Promise<TicketResponseDTO> {
    const ticket = await this.loadOrThrow(input.ticketId);
    ticket.resolve(new Date().toISOString());
    await this.ticketRepo.save(ticket);
    return this.mapper.map(ticket);
  }

  async close(input: CloseTicketRequestDTO): Promise<TicketResponseDTO> {
    const ticket = await this.loadOrThrow(input.ticketId);
    ticket.close(new Date().toISOString());
    await this.ticketRepo.save(ticket);
    return this.mapper.map(ticket);
  }

  async reopen(input: ReopenTicketRequestDTO): Promise<TicketResponseDTO> {
    const ticket = await this.loadOrThrow(input.ticketId);
    ticket.reopen(new Date().toISOString());
    await this.ticketRepo.save(ticket);
    return this.mapper.map(ticket);
  }

  async rate(input: RateTicketRequestDTO): Promise<TicketResponseDTO> {
    const ticket = await this.loadOrThrow(input.ticketId);
    const score = SatisfactionScoreVO.create(input.score);
    const comment = input.comment
      ? SatisfactionCommentVO.create(input.comment)
      : undefined;

    if (score.isNegative && !comment) {
      throw new BusinessRuleError(
        'Negative ratings require a comment',
        'ticket.rate.negative.requires.comment',
      );
    }
    // Satisfaction is persisted separately (via TicketSatisfactionRepository).
    // Here we only validate and reflect on ticket snapshot.
    void TicketSatisfactionIdVO.generate();
    await this.ticketRepo.save(ticket);
    return this.mapper.map(ticket);
  }

  // ─── helpers ───

  private async loadOrThrow(ticketId: string): Promise<TicketEntity> {
    const ticket = await this.ticketRepo.findById(TicketIdVO.create(ticketId));
    if (!ticket) {
      throw new TicketNotFoundException(ticketId);
    }
    return ticket;
  }
}
