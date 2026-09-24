import { Injectable } from '@nestjs/common';
import { Feedback as PrismaFeedback } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { FeedbackEntity } from '../../../../domain/entities/feedback.entity';
import { FeedbackIdVO } from '../../../../domain/value-objects/primitives/feedback-id.vo';
import { FeedbackTypeVO } from '../../../../domain/value-objects/primitives/feedback-type.vo';
import { FeedbackStatusVO } from '../../../../domain/value-objects/primitives/feedback-status.vo';
import { FeedbackContentVO } from '../../../../domain/value-objects/primitives/feedback-content.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { FeedbackRepository } from '../../../../domain/repositories/feedback.repository.interface';

@Injectable()
export class FeedbackPrismaRepository
  extends BasePrismaRepository<FeedbackEntity, FeedbackIdVO>
  implements FeedbackRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaFeedback): FeedbackEntity {
    return FeedbackEntity.reconstitute(
      FeedbackIdVO.create(raw.id),
      {
        userId: UserIdVO.create(raw.userId),
        type: FeedbackTypeVO.create(raw.type),
        status: FeedbackStatusVO.create(raw.status),
        content: FeedbackContentVO.create(raw.content),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: FeedbackIdVO): Promise<FeedbackEntity | null> {
    const raw = await this.prisma.feedback.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly FeedbackEntity[]> {
    const rows = await this.prisma.feedback.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: FeedbackEntity): Promise<FeedbackEntity> {
    const data = {
      userId: entity.userId.value,
      type: entity.type.value,
      status: entity.status.value,
      content: entity.content.value,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.feedback.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: FeedbackIdVO): Promise<void> {
    await this.prisma.feedback.delete({ where: { id: id.value } });
  }

  async findByUser(userId: UserIdVO): Promise<readonly FeedbackEntity[]> {
    const rows = await this.prisma.feedback.findMany({ where: { userId: userId.value } });
    return rows.map((r) => this.toDomain(r));
  }

  async findPending(): Promise<readonly FeedbackEntity[]> {
    const rows = await this.prisma.feedback.findMany({ where: { status: 'pending' } });
    return rows.map((r) => this.toDomain(r));
  }
}
