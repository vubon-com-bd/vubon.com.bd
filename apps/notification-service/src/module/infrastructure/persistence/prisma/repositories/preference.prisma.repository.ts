/**
 * PreferencePrismaRepository — implements PreferenceRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { PreferenceRepository } from '../../../../domain/repositories/preference.repository.interface.js';
import { PreferenceEntity } from '../../../../domain/entities/preference.entity.js';
import { PreferenceIdVO } from '../../../../domain/value-objects/primitives/preference-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { PreferencePrismaMapper } from '../mappers/preference.prisma.mapper.js';

@Injectable()
export class PreferencePrismaRepository implements PreferenceRepository {
  private readonly logger = new Logger(PreferencePrismaRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<PreferenceEntity | null> {
    return this.findByIdVO(PreferenceIdVO.reconstitute(id));
  }

  async findByIdVO(id: PreferenceIdVO): Promise<PreferenceEntity | null> {
    const row = await this.prisma.notificationPreference.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return row ? PreferencePrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly PreferenceEntity[]> {
    const rows = await this.prisma.notificationPreference.findMany({
      where: { deletedAt: null },
    });
    return rows.map((r) => PreferencePrismaMapper.toDomain(r));
  }

  async findByUserId(userId: UserIdVO): Promise<PreferenceEntity | null> {
    const row = await this.prisma.notificationPreference.findFirst({
      where: { userId: userId.value, deletedAt: null },
    });
    return row ? PreferencePrismaMapper.toDomain(row) : null;
  }

  async existsByUserId(userId: UserIdVO): Promise<boolean> {
    const count = await this.prisma.notificationPreference.count({
      where: { userId: userId.value, deletedAt: null },
    });
    return count > 0;
  }

  async findUserIdsOptedOutOf(channel: string): Promise<readonly string[]> {
    const rows = await this.prisma.notificationPreference.findMany({
      where: { deletedAt: null },
      select: { userId: true, channelPreferences: true },
    });
    const out: string[] = [];
    for (const r of rows) {
      const prefs = r.channelPreferences as Record<string, unknown> | null;
      if (prefs && prefs[channel] === false) out.push(r.userId);
    }
    return out;
  }

  async save(entity: PreferenceEntity): Promise<PreferenceEntity> {
    const data = PreferencePrismaMapper.toPersistence(entity);
    const existing = await this.prisma.notificationPreference.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.prisma.notificationPreference.update({
        where: { id: entity.id },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
      });
      return PreferencePrismaMapper.toDomain(updated);
    }

    const created = await this.prisma.notificationPreference.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    });
    return PreferencePrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.notificationPreference.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.notificationPreference.count({ where: { id } });
    return count > 0;
  }
}
