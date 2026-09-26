import { Injectable } from '@nestjs/common';
import { PageView as PrismaPageView } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { PageViewEntity } from '../../../../domain/entities/page-view.entity';
import { PageViewIdVO } from '../../../../domain/value-objects/primitives/page-view-id.vo';
import { PagePathVO } from '../../../../domain/value-objects/primitives/page-path.vo';
import { ReferrerVO } from '../../../../domain/value-objects/primitives/referrer.vo';
import { UserAgentVO } from '../../../../domain/value-objects/primitives/user-agent.vo';
import { SessionIdVO } from '../../../../domain/value-objects/primitives/session-id.vo';
import type { PageViewRepository } from '../../../../domain/repositories/page-view.repository.interface';

@Injectable()
export class PageViewPrismaRepository
  extends BasePrismaRepository<PageViewEntity, PageViewIdVO>
  implements PageViewRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaPageView): PageViewEntity {
    return PageViewEntity.reconstitute(
      PageViewIdVO.create(raw.id),
      {
        sessionId: SessionIdVO.create(raw.sessionId),
        path: PagePathVO.create(raw.path),
        referrer: ReferrerVO.create(raw.referrer),
        userAgent: UserAgentVO.create(raw.userAgent),
        viewedAt: raw.viewedAt,
        timeOnPageSeconds: raw.timeOnPageSeconds,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: PageViewIdVO): Promise<PageViewEntity | null> {
    const raw = await this.prisma.pageView.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly PageViewEntity[]> {
    const rows = await this.prisma.pageView.findMany({
      where: { deletedAt: null },
      orderBy: { viewedAt: 'desc' },
      take: 1000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: PageViewEntity): Promise<PageViewEntity> {
    const data = {
      sessionId: entity.sessionId.value,
      path: entity.path.value,
      referrer: entity.referrer.value,
      userAgent: entity.userAgent.value,
      viewedAt: entity.viewedAt,
      timeOnPageSeconds: entity.timeOnPageSeconds,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.pageView.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: PageViewIdVO): Promise<void> {
    await this.prisma.pageView.delete({ where: { id: id.value } });
  }

  async findBySession(sessionId: SessionIdVO): Promise<readonly PageViewEntity[]> {
    const rows = await this.prisma.pageView.findMany({
      where: { sessionId: sessionId.value, deletedAt: null },
      orderBy: { viewedAt: 'asc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByPath(path: PagePathVO): Promise<readonly PageViewEntity[]> {
    const rows = await this.prisma.pageView.findMany({
      where: { path: path.value, deletedAt: null },
      orderBy: { viewedAt: 'desc' },
      take: 1000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async countByPath(path: PagePathVO): Promise<number> {
    return this.prisma.pageView.count({
      where: { path: path.value, deletedAt: null },
    });
  }
}
