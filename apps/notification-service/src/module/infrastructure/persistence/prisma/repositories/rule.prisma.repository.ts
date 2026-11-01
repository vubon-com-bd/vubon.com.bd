/**
 * RulePrismaRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 *
 * Infrastructure-only — notification rule (trigger/filter/throttle).
 */
import { Injectable } from '@nestjs/common';
import {
  NotificationBasePrismaRepository,
  type PrismaDelegate,
} from '@infrastructure/persistence/prisma/base.prisma.repository.js';
import type { PrismaNotificationRule } from '@infrastructure/persistence/prisma/prisma.client.js';
import {
  RulePrismaMapper,
  type RuleRow,
} from '@infrastructure/persistence/prisma/mappers/rule.prisma.mapper.js';

const MODEL_NAME = 'notificationRule';

@Injectable()
export class RulePrismaRepository extends NotificationBasePrismaRepository {
  private get delegate(): PrismaDelegate<PrismaNotificationRule> {
    return this.model<PrismaNotificationRule>(MODEL_NAME);
  }

  async findById(id: string): Promise<RuleRow | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw ? RulePrismaMapper.toRow(raw) : null;
  }

  async findByType(type: string): Promise<readonly RuleRow[]> {
    const rows = await this.delegate.findMany({
      where: { type, deletedAt: null },
      orderBy: { priority: 'asc' },
    });
    return rows.map((r) => RulePrismaMapper.toRow(r));
  }

  async findByStatus(status: string): Promise<readonly RuleRow[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
      orderBy: { priority: 'asc' },
    });
    return rows.map((r) => RulePrismaMapper.toRow(r));
  }

  async findActive(): Promise<readonly RuleRow[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'active', deletedAt: null },
      orderBy: { priority: 'asc' },
    });
    return rows.map((r) => RulePrismaMapper.toRow(r));
  }

  async findAll(): Promise<readonly RuleRow[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { priority: 'asc' },
    });
    return rows.map((r) => RulePrismaMapper.toRow(r));
  }

  async save(row: RuleRow): Promise<RuleRow> {
    const data = RulePrismaMapper.toPersistence(row);
    const existing = await this.delegate.findUnique({
      where: { id: row.id },
      select: { id: true },
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: row.id },
        data: data as never,
      });
      return RulePrismaMapper.toRow(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return RulePrismaMapper.toRow(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(id: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date() } as never,
    });
  }
}
