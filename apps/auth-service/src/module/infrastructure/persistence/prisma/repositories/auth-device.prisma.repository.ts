/**
 * AuthDevicePrismaRepository
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { AuthDevice as PrismaAuthDevice } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import type { UserId } from '@vubon/shared-types/common';
import { AuthDeviceEntity } from '../../../../domain/entities/auth-device.entity';
import { DeviceFingerprintVO } from '../../../../domain/value-objects/primitives/device-fingerprint.vo';
import { DeviceTypeVO } from '../../../../domain/value-objects/primitives/device-type.vo';
import { DeviceStatusVO } from '../../../../domain/value-objects/primitives/device-status.vo';
import type { AuthDeviceRepository } from '../../../../domain/repositories/auth-device.repository.interface';

@Injectable()
export class AuthDevicePrismaRepository
  extends BasePrismaRepository<AuthDeviceEntity, PrismaAuthDevice, string>
  implements AuthDeviceRepository {
  protected readonly model: PrismaDelegate<PrismaAuthDevice>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.authDevice as unknown as PrismaDelegate<PrismaAuthDevice>;
  }

  protected idOf(domain: AuthDeviceEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  protected toDomain(raw: PrismaAuthDevice): AuthDeviceEntity {
    return AuthDeviceEntity.create({
      id: raw.id,
      userId: raw.userId as UserId,
      fingerprint: DeviceFingerprintVO.of(raw.fingerprint),
      type: DeviceTypeVO.of(raw.type),
      status: DeviceStatusVO.of(raw.status),
      name: raw.name ?? 'Unknown Device',
      firstSeenAt: raw.createdAt.getTime(),
      lastSeenAt: raw.lastSeenAt.getTime(),
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
    });
  }

  protected toPersistence(domain: AuthDeviceEntity): Record<string, unknown> {
    return {
      id: domain.id,
      userId: domain.userId,
      fingerprint: domain.fingerprint.value,
      type: domain.type.value,
      status: domain.status.value,
      name: domain.name,
      lastSeenAt: new Date(domain.lastSeenAt),
      trustedAt: domain.isTrusted() ? new Date() : null,
      updatedAt: new Date(),
    };
  }

  async findByUser(userId: UserId): Promise<readonly AuthDeviceEntity[]> {
    const rows = await this.prisma.authDevice.findMany({
      where: { userId },
      orderBy: { lastSeenAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByFingerprint(
    userId: UserId,
    fingerprint: DeviceFingerprintVO,
  ): Promise<AuthDeviceEntity | null> {
    const raw = await this.prisma.authDevice.findFirst({
      where: { userId, fingerprint: fingerprint.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async countTrustedByUser(userId: UserId): Promise<number> {
    return this.prisma.authDevice.count({
      where: { userId, status: 'trusted' },
    });
  }
}
