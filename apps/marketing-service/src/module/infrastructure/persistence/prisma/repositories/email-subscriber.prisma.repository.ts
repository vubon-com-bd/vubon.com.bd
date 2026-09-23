import { Injectable } from '@nestjs/common';
import { EmailSubscriber as PrismaEmailSubscriber } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { EmailSubscriberEntity } from '../../../../domain/entities/email-subscriber.entity';
import { LeadEmailVO } from '../../../../domain/value-objects/primitives/lead-email.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { EmailSubscriberRepository } from '../../../../domain/repositories/email-subscriber.repository.interface';

@Injectable()
export class EmailSubscriberPrismaRepository
  extends BasePrismaRepository<EmailSubscriberEntity, string>
  implements EmailSubscriberRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaEmailSubscriber): EmailSubscriberEntity {
    return EmailSubscriberEntity.reconstitute(
      raw.id,
      {
        email: LeadEmailVO.create(raw.email),
        userId: raw.userId ? UserIdVO.create(raw.userId) : null,
        status: raw.status,
        subscribedAt: raw.subscribedAt,
        unsubscribedAt: raw.unsubscribedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<EmailSubscriberEntity | null> {
    const raw = await this.prisma.emailSubscriber.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly EmailSubscriberEntity[]> {
    const rows = await this.prisma.emailSubscriber.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: EmailSubscriberEntity): Promise<EmailSubscriberEntity> {
    const data = {
      email: entity.email.value,
      userId: entity.userId?.value ?? null,
      status: entity.status,
      subscribedAt: entity.subscribedAt,
      unsubscribedAt: entity.unsubscribedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.emailSubscriber.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.emailSubscriber.delete({ where: { id } });
  }

  async findByEmail(email: LeadEmailVO): Promise<EmailSubscriberEntity | null> {
    const raw = await this.prisma.emailSubscriber.findUnique({ where: { email: email.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findActive(): Promise<readonly EmailSubscriberEntity[]> {
    const rows = await this.prisma.emailSubscriber.findMany({ where: { status: 'active' } });
    return rows.map((r) => this.toDomain(r));
  }
}
