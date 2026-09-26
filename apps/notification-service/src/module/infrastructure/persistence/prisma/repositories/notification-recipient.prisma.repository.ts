import { Injectable } from '@nestjs/common';
import { NotificationRecipient as PrismaRecipient } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { NotificationRecipientEntity } from '../../../../domain/entities/notification-recipient.entity';
import { NotificationIdVO } from '../../../../domain/value-objects/primitives/notification-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { EmailAddressVO } from '../../../../domain/value-objects/primitives/email-address.vo';
import { PhoneNumberVO } from '../../../../domain/value-objects/primitives/phone-number.vo';
import { DeviceTokenVO } from '../../../../domain/value-objects/primitives/device-token.vo';
import type { NotificationRecipientRepository } from '../../../../domain/repositories/notification-recipient.repository.interface';

@Injectable()
export class NotificationRecipientPrismaRepository
  extends BasePrismaRepository<NotificationRecipientEntity, string>
  implements NotificationRecipientRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaRecipient): NotificationRecipientEntity {
    return NotificationRecipientEntity.reconstitute(
      raw.id,
      {
        notificationId: NotificationIdVO.create(raw.notificationId),
        userId: UserIdVO.create(raw.userId),
        email: raw.email ? EmailAddressVO.create(raw.email) : null,
        phone: raw.phone ? PhoneNumberVO.create(raw.phone) : null,
        deviceTokens: raw.deviceTokens.map((t) => DeviceTokenVO.create(t)),
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<NotificationRecipientEntity | null> {
    const raw = await this.prisma.notificationRecipient.findUnique({
      where: { id },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly NotificationRecipientEntity[]> {
    const rows = await this.prisma.notificationRecipient.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: NotificationRecipientEntity): Promise<NotificationRecipientEntity> {
    const data = {
      notificationId: entity.notificationId.value,
      userId: entity.userId.value,
      email: entity.email?.value ?? null,
      phone: entity.phone?.value ?? null,
      deviceTokens: entity.deviceTokens.map((t) => t.value),
    };
    const raw = await this.prisma.notificationRecipient.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.notificationRecipient.delete({ where: { id } });
  }

  async findByNotificationId(
    notificationId: NotificationIdVO,
  ): Promise<NotificationRecipientEntity | null> {
    const raw = await this.prisma.notificationRecipient.findUnique({
      where: { notificationId: notificationId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByUser(userId: UserIdVO): Promise<readonly NotificationRecipientEntity[]> {
    const rows = await this.prisma.notificationRecipient.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
