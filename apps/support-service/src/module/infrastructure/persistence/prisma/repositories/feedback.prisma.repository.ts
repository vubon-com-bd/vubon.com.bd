/**
 * FeedbackPrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { FeedbackRepository } from '../../../../domain/repositories/feedback.repository.interface';
import { FeedbackEntity } from '../../../../domain/entities/feedback.entity';
import { FeedbackIdVO } from '../../../../domain/value-objects/primitives/feedback-id.vo';
import { FeedbackStatusVO } from '../../../../domain/value-objects/primitives/feedback-status.vo';
import { FeedbackTypeVO } from '../../../../domain/value-objects/primitives/feedback-type.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { TicketIdVO } from '../../../../domain/value-objects/primitives/ticket-id.vo';
import { FeedbackMapper } from '../mappers/feedback.mapper';

@Injectable()
export class FeedbackPrismaRepository implements FeedbackRepository {
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: FeedbackMapper,
  ) {}

  async findById(id: FeedbackIdVO): Promise<FeedbackEntity | null> {
    const raw = await this.prisma.feedback.findUnique({ where: { id: id.value } });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly FeedbackEntity[]> {
    const rows = await this.prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: FeedbackEntity): Promise<FeedbackEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.feedback.upsert({
      where: { id: data.id },
      create: { ...data },
      update: {
        status: data.status,
        reviewerId: data.reviewerId,
        reviewedAt: data.reviewedAt,
        reviewOutcome: data.reviewOutcome,
        updatedAt: new Date(),
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: FeedbackIdVO): Promise<void> {
    await this.prisma.feedback.delete({ where: { id: id.value } });
  }

  async exists(id: FeedbackIdVO): Promise<boolean> {
    const count = await this.prisma.feedback.count({ where: { id: id.value } });
    return count > 0;
  }

  async findByUser(userId: UserIdVO): Promise<readonly FeedbackEntity[]> {
    const rows = await this.prisma.feedback.findMany({
      where: { userId: userId.value },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByTicket(ticketId: TicketIdVO): Promise<readonly FeedbackEntity[]> {
    const rows = await this.prisma.feedback.findMany({
      where: { ticketId: ticketId.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByStatus(status: FeedbackStatusVO): Promise<readonly FeedbackEntity[]> {
    const rows = await this.prisma.feedback.findMany({
      where: { status: status.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByType(type: FeedbackTypeVO): Promise<readonly FeedbackEntity[]> {
    const rows = await this.prisma.feedback.findMany({
      where: { type: type.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findPending(): Promise<readonly FeedbackEntity[]> {
    const rows = await this.prisma.feedback.findMany({
      where: { status: 'pending' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findNeedingFollowup(): Promise<readonly FeedbackEntity[]> {
    const rows = await this.prisma.feedback.findMany({
      where: { status: 'pending', reviewedAt: null },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async averageRating(): Promise<number> {
    const result = await this.prisma.feedback.aggregate({
      _avg: { rating: true },
    });
    return result._avg.rating ?? 0;
  }
}
