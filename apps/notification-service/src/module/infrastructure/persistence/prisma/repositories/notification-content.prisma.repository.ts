import { Injectable } from '@nestjs/common';
import { NotificationContent as PrismaContent } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { NotificationContentEntity } from '../../../../domain/entities/notification-content.entity';
import { NotificationIdVO } from '../../../../domain/value-objects/primitives/notification-id.vo';
import type { NotificationContentRepository } from '../../../../domain/repositories/notification-content.repository.interface';

@Injectable()
export class NotificationContentPrismaRepository
  extends BasePrismaRepository<NotificationContentEntity, string>
  implements NotificationContentRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaContent): NotificationContentEntity {
    return NotificationContentEntity.reconstitute(
      raw.id,
      {
        notificationId: NotificationIdVO.create(raw.notificationId),
        subject: raw.subject,
        body: raw.body,
        bodyHtml: raw.bodyHtml,
        variables: (raw.variables ?? {}) as Record<string, unknown>,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<NotificationContentEntity | null> {
    const raw = await this.prisma.notificationContent.findUnique({
      where: { id },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly NotificationContentEntity[]> {
    const rows = await this.prisma.notificationContent.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: NotificationContentEntity): Promise<NotificationContentEntity> {
    const data = {
      notificationId: entity.notificationId.value,
      subject: entity.subject,
      body: entity.body,
      bodyHtml: entity.bodyHtml,
      variables: entity.variables as object,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.notificationContent.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.notificationContent.delete({ where: { id } });
  }

  async findByNotificationId(
    notificationId: NotificationIdVO,
  ): Promise<NotificationContentEntity | null> {
    const raw = await this.prisma.notificationContent.findUnique({
      where: { notificationId: notificationId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
