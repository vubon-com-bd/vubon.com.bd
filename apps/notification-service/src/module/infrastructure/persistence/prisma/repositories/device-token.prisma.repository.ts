import { Injectable } from '@nestjs/common';
import { DeviceToken as PrismaToken } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { DeviceTokenEntity } from '../../../../domain/entities/device-token.entity';
import { DeviceIdVO } from '../../../../domain/value-objects/primitives/device-id.vo';
import { DeviceTokenVO } from '../../../../domain/value-objects/primitives/device-token.vo';
import type { DeviceTokenRepository } from '../../../../domain/repositories/device-token.repository.interface';

@Injectable()
export class DeviceTokenPrismaRepository
  extends BasePrismaRepository<DeviceTokenEntity, string>
  implements DeviceTokenRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaToken): DeviceTokenEntity {
    return DeviceTokenEntity.reconstitute(
      raw.id,
      {
        deviceId: DeviceIdVO.create(raw.deviceId),
        token: DeviceTokenVO.create(raw.token),
        lastUsedAt: raw.lastUsedAt,
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<DeviceTokenEntity | null> {
    const raw = await this.prisma.deviceToken.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly DeviceTokenEntity[]> {
    const rows = await this.prisma.deviceToken.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: DeviceTokenEntity): Promise<DeviceTokenEntity> {
    const data = {
      deviceId: entity.deviceId.value,
      token: entity.token.value,
      lastUsedAt: entity.lastUsedAt,
    };
    const raw = await this.prisma.deviceToken.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.deviceToken.delete({ where: { id } });
  }

  async findByDeviceId(deviceId: DeviceIdVO): Promise<readonly DeviceTokenEntity[]> {
    const rows = await this.prisma.deviceToken.findMany({
      where: { deviceId: deviceId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByToken(token: DeviceTokenVO): Promise<DeviceTokenEntity | null> {
    const raw = await this.prisma.deviceToken.findUnique({
      where: { token: token.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async deleteByDeviceId(deviceId: DeviceIdVO): Promise<void> {
    await this.prisma.deviceToken.deleteMany({
      where: { deviceId: deviceId.value },
    });
  }
}
