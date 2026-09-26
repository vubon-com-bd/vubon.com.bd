import { Injectable } from '@nestjs/common';
import { Session as PrismaSession } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { SessionEntity } from '../../../../domain/entities/session.entity';
import { SessionIdVO } from '../../../../domain/value-objects/primitives/session-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { PagePathVO } from '../../../../domain/value-objects/primitives/page-path.vo';
import type { SessionRepository } from '../../../../domain/repositories/session.repository.interface';

@Injectable()
export class SessionPrismaRepository
  extends BasePrismaRepository<SessionEntity, SessionIdVO>
  implements SessionRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaSession): SessionEntity {
    return SessionEntity.reconstitute(
      SessionIdVO.create(raw.id),
      {
        userId: raw.userId ? UserIdVO.create(raw.userId) : null,
        entryPage: PagePathVO.create(raw.entryPage),
        exitPage: PagePathVO.create(raw.exitPage),
        pageViewCount: raw.pageViewCount,
        startedAt: raw.startedAt,
        endedAt: raw.endedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: SessionIdVO): Promise<SessionEntity | null> {
    const raw = await this.prisma.session.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SessionEntity[]> {
    const rows = await this.prisma.session.findMany({
      where: { deletedAt: null },
      orderBy: { startedAt: 'desc' },
      take: 1000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: SessionEntity): Promise<SessionEntity> {
    const data = {
      userId: entity.userId?.value ?? null,
      entryPage: entity.entryPage.value,
      exitPage: entity.exitPage.value,
      pageViewCount: entity.pageViewCount,
      startedAt: entity.startedAt,
      endedAt: entity.endedAt,
      isBounce: entity.isBounce,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.session.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: SessionIdVO): Promise<void> {
    await this.prisma.session.delete({ where: { id: id.value } });
  }

  async findByUser(userId: UserIdVO): Promise<readonly SessionEntity[]> {
    const rows = await this.prisma.session.findMany({
      where: { userId: userId.value, deletedAt: null },
      orderBy: { startedAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findActive(): Promise<readonly SessionEntity[]> {
    const rows = await this.prisma.session.findMany({
      where: { endedAt: null, deletedAt: null },
      orderBy: { startedAt: 'desc' },
      take: 1000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findInWindow(startMs: number, endMs: number): Promise<readonly SessionEntity[]> {
    const rows = await this.prisma.session.findMany({
      where: {
        startedAt: { gte: new Date(startMs), lte: new Date(endMs) },
        deletedAt: null,
      },
      orderBy: { startedAt: 'desc' },
      take: 10000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async countByUser(userId: UserIdVO): Promise<number> {
    return this.prisma.session.count({
      where: { userId: userId.value, deletedAt: null },
    });
  }
}
