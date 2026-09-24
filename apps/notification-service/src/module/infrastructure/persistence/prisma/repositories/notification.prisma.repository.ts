import { Injectable } from '@nestjs/common';
import {
  Notification as PrismaNotification,
  Prisma,
} from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { NotificationEntity } from '../../../../domain/entities/notification.entity';
import { NotificationIdVO } from '../../../../domain/value-objects/primitives/notification-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { NotificationTypeVO } from '../../../../domain/value-objects/primitives/notification-type.vo';
import { NotificationChannelVO } from '../../../../domain/value-objects/primitives/notification-channel.vo';
import { NotificationStatusVO } from '../../../../domain/value-objects/primitives/notification-status.vo';
import { NotificationPriorityVO } from '../../../../domain/value-objects/primitives/notification-priority.vo';
import { NotificationCategoryVO } from '../../../../domain/value-objects/primitives/notification-category.vo';
import { ReadStatusVO } from '../../../../domain/value-objects/primitives/read-status.vo';
import type { NotificationRepository } from '../../../../domain/repositories/notification.repository.interface';

@Injectable()
export class NotificationPrismaRepository
  extends BasePrismaRepository<NotificationEntity, NotificationIdVO>
  implements NotificationRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaNotification): NotificationEntity {
    return NotificationEntity.reconstitute(
      NotificationIdVO.create(raw.id),
      {
        userId: UserIdVO.create(raw.userId),
        type: NotificationTypeVO.create(raw.type),
        channel: NotificationChannelVO.create(raw.channel),
        status: NotificationStatusVO.create(raw.status),
        priority: NotificationPriorityVO.create(raw.priority),
        category: NotificationCategoryVO.create(raw.category),
        readStatus: ReadStatusVO.create(raw.readAt ? 'read' : 'unread'),
        readAt: raw.readAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: NotificationIdVO): Promise<NotificationEntity | null> {
    const raw = await this.prisma.notification.findUnique({
      where: { id: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly NotificationEntity[]> {
    const rows = await this.prisma.notification.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: NotificationEntity): Promise<NotificationEntity> {
    const data = {
      userId: entity.userId.value,
      type: entity.type.value,
      channel: entity.channel.value,
      status: entity.status.value,
      priority: entity.priority.value,
      category: entity.category.value,
      subject: null as string | null,
      body: '' as string,
      data: Prisma.JsonNull,
      readAt: entity.readAt,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.notification.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: NotificationIdVO): Promise<void> {
    await this.prisma.notification.delete({ where: { id: id.value } });
  }

  async findByUser(
    userId: UserIdVO,
    limit: number = 50,
  ): Promise<readonly NotificationEntity[]> {
    const rows = await this.prisma.notification.findMany({
      where: { userId: userId.value },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findUnread(userId: UserIdVO): Promise<readonly NotificationEntity[]> {
    const rows = await this.prisma.notification.findMany({
      where: { userId: userId.value, readAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async countUnread(userId: UserIdVO): Promise<number> {
    return this.prisma.notification.count({
      where: { userId: userId.value, readAt: null },
    });
  }

  async markAllRead(userId: UserIdVO): Promise<void> {
    await this.prisma.notification.updateMany({
      where: { userId: userId.value, readAt: null },
      data: { readAt: new Date(), updatedAt: new Date() },
    });
  }
}
