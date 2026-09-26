import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiSearch as PrismaSearch } from '@prisma/client';
import { AiSearchEntity } from '../../../../domain/entities/ai-search.entity';
import type { AiSearchRepository } from '../../../../domain/repositories/ai-search.repository.interface';
import { AiSearchIdVO } from '../../../../domain/value-objects/primitives/ai-search-id.vo';
import { SearchTypeVO } from '../../../../domain/value-objects/primitives/search-type.vo';
import { SearchModelVO } from '../../../../domain/value-objects/primitives/search-model.vo';
import { SearchStatusVO } from '../../../../domain/value-objects/primitives/search-status.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { SearchResultVO } from '../../../../domain/value-objects/composites/search-result.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AiSearchPrismaRepository
  extends BasePrismaRepository<AiSearchEntity, AiSearchIdVO>
  implements AiSearchRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaSearch): AiSearchEntity {
    return AiSearchEntity.reconstitute(
      AiSearchIdVO.create(raw.id),
      {
        userId: raw.userId ? UserIdVO.create(raw.userId) : null,
        type: SearchTypeVO.create(raw.type),
        model: SearchModelVO.create(raw.model),
        status: SearchStatusVO.create(raw.status),
        result: SearchResultVO.create({ query: '', items: [], totalHits: 0, tookMs: 0 }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: AiSearchIdVO): Promise<AiSearchEntity | null> {
    const raw = await this.prisma.aiSearch.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AiSearchEntity[]> {
    const rows = await this.prisma.aiSearch.findMany({ where: { deletedAt: null } });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: AiSearchEntity): Promise<AiSearchEntity> {
    const data = {
      userId: entity.userId?.value ?? null,
      type: entity.type.value,
      model: entity.model.value,
      status: entity.status.value,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiSearch.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: AiSearchIdVO): Promise<void> {
    await this.prisma.aiSearch.update({ where: { id: id.value }, data: { deletedAt: new Date() } });
  }

  async findByUser(userId: UserIdVO): Promise<readonly AiSearchEntity[]> {
    const rows = await this.prisma.aiSearch.findMany({
      where: { userId: userId.value, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly AiSearchEntity[]> {
    const rows = await this.prisma.aiSearch.findMany({ where: { status, deletedAt: null } });
    return rows.map((r) => this.toDomain(r));
  }

  async findRecentByUser(userId: UserIdVO, limit: number): Promise<readonly AiSearchEntity[]> {
    const rows = await this.prisma.aiSearch.findMany({
      where: { userId: userId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }
}
