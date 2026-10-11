/**
 * DevicePrismaRepository — implements DeviceRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  DeviceRepository,
  DeviceListOptions,
  DevicePaginationResult,
} from '../../../../domain/repositories/device.repository.interface.js';
import { DeviceEntity } from '../../../../domain/entities/device.entity.js';
import { DeviceIdVO } from '../../../../domain/value-objects/primitives/device-id.vo.js';
import { DeviceStatusVO } from '../../../../domain/value-objects/primitives/device-status.vo.js';
import { DeviceTokenVO } from '../../../../domain/value-objects/primitives/device-token.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { DevicePrismaMapper } from '../mappers/device.prisma.mapper.js';

@Injectable()
export class DevicePrismaRepository implements DeviceRepository {
  private readonly logger = new Logger(DevicePrismaRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<DeviceEntity | null> {
    return this.findByIdVO(DeviceIdVO.reconstitute(id));
  }

  async findByIdVO(id: DeviceIdVO): Promise<DeviceEntity | null> {
    const row = await this.prisma.notificationDevice.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return row ? DevicePrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly DeviceEntity[]> {
    const rows = await this.prisma.notificationDevice.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => DevicePrismaMapper.toDomain(r));
  }

  async findByUserId(userId: UserIdVO): Promise<readonly DeviceEntity[]> {
    const rows = await this.prisma.notificationDevice.findMany({
      where: { userId: userId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => DevicePrismaMapper.toDomain(r));
  }

  async findActiveByUserId(userId: UserIdVO): Promise<readonly DeviceEntity[]> {
    const rows = await this.prisma.notificationDevice.findMany({
      where: { userId: userId.value, status: 'active', deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => DevicePrismaMapper.toDomain(r));
  }

  async findByStatus(status: DeviceStatusVO): Promise<readonly DeviceEntity[]> {
    const rows = await this.prisma.notificationDevice.findMany({
      where: { status: status.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => DevicePrismaMapper.toDomain(r));
  }

  async findByToken(token: DeviceTokenVO): Promise<DeviceEntity | null> {
    const row = await this.prisma.notificationDevice.findFirst({
      where: { token: token.value, deletedAt: null },
    });
    return row ? DevicePrismaMapper.toDomain(row) : null;
  }

  async findPaginated(options: DeviceListOptions): Promise<DevicePaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const orderBy: Record<string, 'asc' | 'desc'> = {
      [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc',
    };

    const [rows, total] = await Promise.all([
      this.prisma.notificationDevice.findMany({
        where,
        orderBy,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.prisma.notificationDevice.count({ where }),
    ]);

    return {
      items: rows.map((r) => DevicePrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async countByUserId(userId: UserIdVO): Promise<number> {
    return this.prisma.notificationDevice.count({
      where: { userId: userId.value, deletedAt: null },
    });
  }

  async existsByToken(token: DeviceTokenVO): Promise<boolean> {
    const count = await this.prisma.notificationDevice.count({
      where: { token: token.value, deletedAt: null },
    });
    return count > 0;
  }

  async findStale(olderThanDays: number): Promise<readonly DeviceEntity[]> {
    const cutoff = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000);
    const rows = await this.prisma.notificationDevice.findMany({
      where: {
        deletedAt: null,
        OR: [
          { lastActiveAt: { lt: cutoff } },
          { AND: [{ lastActiveAt: null }, { registeredAt: { lt: cutoff } }] },
        ],
      },
    });
    return rows.map((r) => DevicePrismaMapper.toDomain(r));
  }

  async save(entity: DeviceEntity): Promise<DeviceEntity> {
    const data = DevicePrismaMapper.toPersistence(entity);
    const existing = await this.prisma.notificationDevice.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.prisma.notificationDevice.update({
        where: { id: entity.id },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
      });
      return DevicePrismaMapper.toDomain(updated);
    }

    const created = await this.prisma.notificationDevice.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    });
    return DevicePrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.notificationDevice.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.notificationDevice.count({ where: { id } });
    return count > 0;
  }
}
