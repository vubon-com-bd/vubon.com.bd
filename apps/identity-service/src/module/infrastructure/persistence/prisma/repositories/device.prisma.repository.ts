/**
 * Device Prisma Repository
 * @module identity-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../prisma.service.js';
import { DevicePrismaMapper, type PrismaDeviceRow } from '../mappers/device.prisma.mapper.js';
import { DeviceEntity } from '../../../../domain/entities/device.entity.js';
import type {
  DeviceRepository,
  DeviceListOptions,
  DevicePaginationResult,
  DeviceStats,
} from '../../../../domain/repositories/device.repository.interface.js';
import type { DeviceIdVO } from '../../../../domain/value-objects/primitives/device-id.vo.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

interface DeviceDelegate {
  findUnique(args: unknown): Promise<PrismaDeviceRow | null>;
  findFirst(args: unknown): Promise<PrismaDeviceRow | null>;
  findMany(args?: unknown): Promise<PrismaDeviceRow[]>;
  create(args: unknown): Promise<PrismaDeviceRow>;
  update(args: unknown): Promise<PrismaDeviceRow>;
  delete(args: unknown): Promise<PrismaDeviceRow>;
  count(args?: unknown): Promise<number>;
  updateMany(args: unknown): Promise<{ count: number }>;
}

@Injectable()
export class DevicePrismaRepository implements DeviceRepository {
  constructor(private readonly prisma: AuthPrismaService) {}

  private get delegate(): DeviceDelegate {
    return this.prisma.getModel<DeviceDelegate>('authDevice');
  }

  async findById(id: string): Promise<DeviceEntity | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw && !raw.deletedAt ? DevicePrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: DeviceIdVO): Promise<DeviceEntity | null> {
    return this.findById(id.value);
  }

  async findAll(): Promise<readonly DeviceEntity[]> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map((r) => DevicePrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }

  async save(entity: DeviceEntity): Promise<DeviceEntity> {
    const data = DevicePrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true } as never,
    });
    const raw = existing
      ? await this.delegate.update({ where: { id: entity.id }, data: data as never })
      : await this.delegate.create({ data: data as never });
    return DevicePrismaMapper.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }

  async softDelete(id: string): Promise<void> {
    return this.delete(id);
  }

  async findByUserId(userId: UserIdVO): Promise<readonly DeviceEntity[]> {
    const rows = await this.delegate.findMany({
      where: { userId: userId.value, deletedAt: null },
    });
    return rows.map((r) => DevicePrismaMapper.toDomain(r));
  }

  async findByFingerprint(userId: UserIdVO, fingerprint: string): Promise<DeviceEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { userId: userId.value, fingerprint, deletedAt: null },
    });
    return raw ? DevicePrismaMapper.toDomain(raw) : null;
  }

  async countByUserId(userId: UserIdVO): Promise<number> {
    return this.delegate.count({
      where: { userId: userId.value, deletedAt: null },
    });
  }

  async findPaginated(options: DeviceListOptions): Promise<DevicePaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.userId) where['userId'] = f.userId;
    if (f.type) where['type'] = f.type;
    if (f.trusted === true) where['status'] = 'trusted';

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where: where as never,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where: where as never }),
    ]);

    return {
      items: rows.map((r) => DevicePrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(userId?: string): Promise<DeviceStats> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (userId) where['userId'] = userId;
    const rows = await this.delegate.findMany({ where: where as never });
    const byType: Record<string, number> = {};
    let trustedCount = 0;
    for (const r of rows) {
      byType[r.type] = (byType[r.type] ?? 0) + 1;
      if (r.status === 'trusted') trustedCount++;
    }
    return { total: rows.length, trustedCount, byType };
  }

  async findStale(inactiveDays: number): Promise<readonly DeviceEntity[]> {
    const cutoff = new Date(Date.now() - inactiveDays * 24 * 3600 * 1000);
    const rows = await this.delegate.findMany({
      where: { lastSeenAt: { lt: cutoff }, deletedAt: null } as never,
    });
    return rows.map((r) => DevicePrismaMapper.toDomain(r));
  }

  async findOldestByUserId(userId: UserIdVO): Promise<DeviceEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { userId: userId.value, deletedAt: null },
      orderBy: { createdAt: 'asc' },
    } as never);
    return raw ? DevicePrismaMapper.toDomain(raw) : null;
  }

  async findExpiredTrust(): Promise<readonly DeviceEntity[]> {
    return [];
  }

  async removeExpiredTrust(): Promise<number> {
    const result = await this.delegate.updateMany({
      where: { status: 'trusted', trustedAt: null },
      data: { status: 'untrusted' } as never,
    });
    return result.count;
  }
}
