import { Injectable } from '@nestjs/common';
import { AuthDevice as PrismaAuthDevice } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { AuthDeviceEntity } from '../../../../domain/entities/auth-device.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { DeviceFingerprintVO } from '../../../../domain/value-objects/primitives/device-fingerprint.vo';
import { DeviceTypeVO } from '../../../../domain/value-objects/primitives/device-type.vo';
import { DeviceStatusVO } from '../../../../domain/value-objects/primitives/device-status.vo';
import type { AuthDeviceRepository } from '../../../../domain/repositories/auth-device.repository.interface';

@Injectable()
export class AuthDevicePrismaRepository
  extends BasePrismaRepository<AuthDeviceEntity, string>
  implements AuthDeviceRepository{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaAuthDevice): AuthDeviceEntity {
    return AuthDeviceEntity.reconstitute(
      raw.id,
      {
        userId: UserIdVO.create(raw.userId),
        fingerprint: DeviceFingerprintVO.create(raw.fingerprint),
        type: DeviceTypeVO.create(raw.type),
        status: DeviceStatusVO.create(raw.status),
        name: raw.name,
        lastSeenAt: raw.lastSeenAt,
        trustedAt: raw.trustedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: string): Promise<AuthDeviceEntity | null> {
    const raw = await this.prisma.authDevice.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AuthDeviceEntity[]> {
    const rows = await this.prisma.authDevice.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: AuthDeviceEntity): Promise<AuthDeviceEntity> {
    const data = {
      userId: entity.userId.value,
      fingerprint: entity.fingerprint.value,
      type: entity.type.value,
      status: entity.status.value,
      name: entity.name,
      lastSeenAt: entity.lastSeenAt,
      trustedAt: entity.trustedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.authDevice.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.authDevice.delete({ where: { id } });
  }

  async findByUser(userId: UserIdVO): Promise<readonly AuthDeviceEntity[]> {
    const rows = await this.prisma.authDevice.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByFingerprint(fingerprint: DeviceFingerprintVO): Promise<AuthDeviceEntity | null> {
    const raw = await this.prisma.authDevice.findFirst({
      where: { fingerprint: fingerprint.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
