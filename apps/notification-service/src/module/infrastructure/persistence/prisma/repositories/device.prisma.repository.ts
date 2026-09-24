import { Injectable } from '@nestjs/common';
import { Device as PrismaDevice } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { DeviceEntity } from '../../../../domain/entities/device.entity';
import { DeviceIdVO } from '../../../../domain/value-objects/primitives/device-id.vo';
import { DeviceTypeVO } from '../../../../domain/value-objects/primitives/device-type.vo';
import { DeviceStatusVO } from '../../../../domain/value-objects/primitives/device-status.vo';
import { DevicePlatformVO } from '../../../../domain/value-objects/primitives/device-platform.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { DeviceRepository } from '../../../../domain/repositories/device.repository.interface';

@Injectable()
export class DevicePrismaRepository
  extends BasePrismaRepository<DeviceEntity, DeviceIdVO>
  implements DeviceRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaDevice): DeviceEntity {
    return DeviceEntity.reconstitute(
      DeviceIdVO.create(raw.id),
      {
        userId: UserIdVO.create(raw.userId),
        type: DeviceTypeVO.create(raw.type),
        platform: DevicePlatformVO.create(raw.platform),
        status: DeviceStatusVO.create(raw.status),
        fingerprint: raw.fingerprint,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: DeviceIdVO): Promise<DeviceEntity | null> {
    const raw = await this.prisma.device.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly DeviceEntity[]> {
    const rows = await this.prisma.device.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: DeviceEntity): Promise<DeviceEntity> {
    const data = {
      userId: entity.userId.value,
      type: entity.type.value,
      platform: entity.platform.value,
      status: entity.status.value,
      fingerprint: entity.fingerprint,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.device.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: DeviceIdVO): Promise<void> {
    await this.prisma.device.delete({ where: { id: id.value } });
  }

  async findByUser(userId: UserIdVO): Promise<readonly DeviceEntity[]> {
    const rows = await this.prisma.device.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByFingerprint(fingerprint: string): Promise<DeviceEntity | null> {
    const raw = await this.prisma.device.findFirst({
      where: { fingerprint },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async countByUser(userId: UserIdVO): Promise<number> {
    return this.prisma.device.count({ where: { userId: userId.value } });
  }

  async findOldest(userId: UserIdVO): Promise<DeviceEntity | null> {
    const raw = await this.prisma.device.findFirst({
      where: { userId: userId.value },
      orderBy: { createdAt: 'asc' },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
