import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiSearchResult as PrismaRes } from '@prisma/client';
import { SearchResultEntity } from '../../../../domain/entities/search-result.entity';
import type { SearchResultRepository } from '../../../../domain/repositories/search-result.repository.interface';
import { AiSearchIdVO } from '../../../../domain/value-objects/primitives/ai-search-id.vo';
import { SearchResultVO } from '../../../../domain/value-objects/composites/search-result.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SearchResultPrismaRepository
  extends BasePrismaRepository<SearchResultEntity, AiSearchIdVO>
  implements SearchResultRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaRes): SearchResultEntity {
    const items = (raw.items as Array<{ documentId: string; score: number; snippet: string | null; source: string }>) ?? [];
    return SearchResultEntity.reconstitute(
      AiSearchIdVO.create(raw.searchId),
      {
        searchId: AiSearchIdVO.create(raw.searchId),
        result: SearchResultVO.create({
          query: raw.query,
          items: items.map((i) => ({
            documentId: i.documentId,
            score: i.score,
            snippet: i.snippet,
            source: i.source,
          })),
          totalHits: raw.totalHits,
          tookMs: raw.tookMs,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: AiSearchIdVO): Promise<SearchResultEntity | null> {
    const raw = await this.prisma.aiSearchResult.findUnique({ where: { searchId: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SearchResultEntity[]> {
    const rows = await this.prisma.aiSearchResult.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: SearchResultEntity): Promise<SearchResultEntity> {
    const data = {
      query: entity.result.query,
      items: entity.result.items.map((i) => ({
        documentId: i.documentId,
        score: i.score,
        snippet: i.snippet,
        source: i.source,
      })),
      totalHits: entity.result.totalHits,
      tookMs: entity.result.tookMs,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiSearchResult.upsert({
      where: { searchId: entity.searchId.value },
      create: { id: entity.id.value, searchId: entity.searchId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: AiSearchIdVO): Promise<void> {
    await this.prisma.aiSearchResult.delete({ where: { searchId: id.value } });
  }

  async findBySearchId(searchId: AiSearchIdVO): Promise<SearchResultEntity | null> {
    const raw = await this.prisma.aiSearchResult.findUnique({
      where: { searchId: searchId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
