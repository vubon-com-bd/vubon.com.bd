import { Injectable } from '@nestjs/common';
import { NotificationDelivery as PrismaDelivery } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { NotificationDeliveryEntity } from '../../../../domain/entities/notification-delivery.entity';
import { NotificationIdVO } from '../../../../domain/value-objects/primitives/notification-id.vo';
import { ProviderNameVO } from '../../../../domain/value-objects/primitives/provider-name.vo';
import { ProviderMessageIdVO } from '../../../../domain/value-objects/primitives/provider-message-id.vo';
import { DeliveryStatusVO } from '../../../../domain/value-objects/primitives/delivery-status.vo';
import { DeliveryAttemptVO } from '../../../../domain/value-objects/primitives/delivery-attempt.vo';
import { DeliveryErrorVO } from '../../../../domain/value-objects/primitives/delivery-error.vo';
import type { NotificationDeliveryRepository } from '../../../../domain/repositories/notification-delivery.repository.interface';

@Injectable()
export class NotificationDeliveryPrismaRepository
  extends BasePrismaRepository<NotificationDeliveryEntity, string>
  implements NotificationDeliveryRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaDelivery): NotificationDeliveryEntity {
    return NotificationDeliveryEntity.reconstitute(
      raw.id,
      {
        notificationId: NotificationIdVO.create(raw.notificationId),
        providerName: ProviderNameVO.create(raw.providerName),
        providerMessageId: raw.providerMessageId
          ? ProviderMessageIdVO.create(raw.providerMessageId)
          : null,
        status: DeliveryStatusVO.create(raw.status),
        attemptCount: DeliveryAttemptVO.create(raw.attemptCount),
        lastError: raw.lastError ? DeliveryErrorVO.create(raw.lastError) : null,
        deliveredAt: raw.deliveredAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<NotificationDeliveryEntity | null> {
    const raw = await this.prisma.notificationDelivery.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly NotificationDeliveryEntity[]> {
    const rows = await this.prisma.notificationDelivery.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: NotificationDeliveryEntity): Promise<NotificationDeliveryEntity> {
    const data = {
      notificationId: entity.notificationId.value,
      providerName: entity.providerName.value,
      providerMessageId: entity.providerMessageId?.value ?? null,
      status: entity.status.value,
      attemptCount: entity.attemptCount.value,
      lastError: entity.lastError?.value ?? null,
      deliveredAt: entity.deliveredAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.notificationDelivery.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.notificationDelivery.delete({ where: { id } });
  }

  async findByNotificationId(
    notificationId: NotificationIdVO,
  ): Promise<NotificationDeliveryEntity | null> {
    const raw = await this.prisma.notificationDelivery.findUnique({
      where: { notificationId: notificationId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByProviderMessageId(
    messageId: ProviderMessageIdVO,
  ): Promise<NotificationDeliveryEntity | null> {
    const raw = await this.prisma.notificationDelivery.findFirst({
      where: { providerMessageId: messageId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findFailed(limit: number = 50): Promise<readonly NotificationDeliveryEntity[]> {
    const rows = await this.prisma.notificationDelivery.findMany({
      where: { status: 'failed' },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findRetryable(): Promise<readonly NotificationDeliveryEntity[]> {
    const rows = await this.prisma.notificationDelivery.findMany({
      where: {
        status: { in: ['failed', 'bounced'] },
        attemptCount: { lt: 10 },
      },
      orderBy: { updatedAt: 'asc' },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
