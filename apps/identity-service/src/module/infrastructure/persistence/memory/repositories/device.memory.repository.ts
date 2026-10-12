/**
 * DeviceEntity In-Memory Repository
 * @module identity-service/infrastructure/persistence/memory/repositories
 */
import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { DeviceEntity } from '../../../../domain/entities/device.entity.js';
import type {
  DeviceRepository,
  DeviceListOptions,
  DevicePaginationResult,
  DeviceStats,
} from '../../../../domain/repositories/device.repository.interface.js';
import type { DeviceIdVO } from '../../../../domain/value-objects/primitives/device-id.vo.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

@Injectable()
export class InMemoryDeviceRepository
  extends InMemoryRepository<DeviceEntity, string>
  implements DeviceRepository
{
  protected idOf(entity: DeviceEntity): string { return entity.id; }

  async findByIdVO(id: DeviceIdVO): Promise<DeviceEntity | null> { return this.findById(id.value); }

  async findByUserId(userId: UserIdVO): Promise<readonly DeviceEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === userId.value);
  }

  async findByFingerprint(userId: UserIdVO, fingerprint: string): Promise<DeviceEntity | null> {
    const all = await this.findByUserId(userId);
    return all.find((e) => e.fingerprint.value === fingerprint) ?? null;
  }

  async countByUserId(userId: UserIdVO): Promise<number> { return (await this.findByUserId(userId)).length; }

  async findPaginated(options: DeviceListOptions): Promise<DevicePaginationResult> {
    const all = await this.findAll();
    const start = (options.page - 1) * options.limit;
    return {
      items: all.slice(start, start + options.limit),
      total: all.length,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(all.length / options.limit),
    };
  }

  async getStats(): Promise<DeviceStats> {
    const all = await this.findAll();
    const byType: Record<string, number> = {};
    let trustedCount = 0;
    for (const d of all) {
      byType[d.type.value] = (byType[d.type.value] ?? 0) + 1;
      if (d.trusted) trustedCount++;
    }
    return { total: all.length, trustedCount, byType };
  }

  async findStale(inactiveDays: number): Promise<readonly DeviceEntity[]> {
    const cutoff = Date.now() - inactiveDays * 24 * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => Date.parse(e.lastActiveAt) < cutoff);
  }

  async findOldestByUserId(userId: UserIdVO): Promise<DeviceEntity | null> {
    const all = await this.findByUserId(userId);
    const sorted = [...all].sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
    return sorted[0] ?? null;
  }

  async findExpiredTrust(): Promise<readonly DeviceEntity[]> { return []; }

  async removeExpiredTrust(): Promise<number> { return 0; }

  async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }
}
