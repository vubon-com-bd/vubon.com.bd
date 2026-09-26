import { Injectable } from '@nestjs/common';
import { Webhook as PrismaWebhook } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { WebhookEntity } from '../../../../domain/entities/webhook.entity';
import { WebhookIdVO } from '../../../../domain/value-objects/primitives/webhook-id.vo';
import { WebhookStatusVO } from '../../../../domain/value-objects/primitives/webhook-status.vo';
import { WebhookTypeVO } from '../../../../domain/value-objects/primitives/webhook-type.vo';
import { WebhookUrlVO } from '../../../../domain/value-objects/primitives/webhook-url.vo';
import { WebhookSecretVO } from '../../../../domain/value-objects/primitives/webhook-secret.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { WebhookRepository } from '../../../../domain/repositories/webhook.repository.interface';

@Injectable()
export class WebhookPrismaRepository
  extends BasePrismaRepository<WebhookEntity, WebhookIdVO>
  implements WebhookRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaWebhook): WebhookEntity {
    return WebhookEntity.reconstitute(
      WebhookIdVO.create(raw.id),
      {
        userId: UserIdVO.create(raw.userId),
        type: WebhookTypeVO.create(raw.type),
        url: WebhookUrlVO.create(raw.url),
        secret: WebhookSecretVO.create(raw.secret),
        status: WebhookStatusVO.create(raw.status),
        events: [],
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: WebhookIdVO): Promise<WebhookEntity | null> {
    const raw = await this.prisma.webhook.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly WebhookEntity[]> {
    const rows = await this.prisma.webhook.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: WebhookEntity): Promise<WebhookEntity> {
    const data = {
      userId: entity.userId.value,
      type: entity.type.value,
      url: entity.url.value,
      secret: entity.secret.value,
      status: entity.status.value,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.webhook.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: WebhookIdVO): Promise<void> {
    await this.prisma.webhook.delete({ where: { id: id.value } });
  }

  async findByUser(userId: UserIdVO): Promise<readonly WebhookEntity[]> {
    const rows = await this.prisma.webhook.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findActive(): Promise<readonly WebhookEntity[]> {
    const rows = await this.prisma.webhook.findMany({
      where: { status: 'active' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByType(type: WebhookTypeVO): Promise<readonly WebhookEntity[]> {
    const rows = await this.prisma.webhook.findMany({
      where: { type: type.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async countByUser(userId: UserIdVO): Promise<number> {
    return this.prisma.webhook.count({ where: { userId: userId.value } });
  }
}
