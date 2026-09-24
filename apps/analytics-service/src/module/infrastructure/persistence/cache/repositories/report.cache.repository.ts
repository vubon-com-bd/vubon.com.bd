import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { ReportEntity } from '../../../../domain/entities/report.entity';
import { ReportIdVO } from '../../../../domain/value-objects/primitives/report-id.vo';
import { ReportTypeVO } from '../../../../domain/value-objects/primitives/report-type.vo';
import { ReportFormatVO } from '../../../../domain/value-objects/primitives/report-format.vo';
import { ReportStatusVO } from '../../../../domain/value-objects/primitives/report-status.vo';
import { ReportFrequencyVO } from '../../../../domain/value-objects/primitives/report-frequency.vo';

interface SerializedReport {
  readonly id: string;
  readonly type: string;
  readonly format: string;
  readonly status: string;
  readonly frequency: string | null;
  readonly ownerId: string;
  readonly generatedAt: string | null;
  readonly nextRunAt: string | null;
  readonly rowCount: number;
  readonly filterCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'analytics:report';
const TTL_SECONDS = 60 * 30;

@Injectable()
export class ReportCacheRepository extends BaseCacheRepository<ReportEntity, ReportIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: ReportEntity): SerializedReport {
    return {
      id: entity.id.value,
      type: entity.type.value,
      format: entity.format.value,
      status: entity.status.value,
      frequency: entity.frequency?.value ?? null,
      ownerId: entity.ownerId,
      generatedAt: entity.generatedAt?.toISOString() ?? null,
      nextRunAt: entity.nextRunAt?.toISOString() ?? null,
      rowCount: 0,
      filterCount: 0,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedReport): ReportEntity {
    return ReportEntity.reconstitute(
      ReportIdVO.create(data.id),
      {
        type: ReportTypeVO.create(data.type),
        format: ReportFormatVO.create(data.format),
        status: ReportStatusVO.create(data.status),
        frequency: data.frequency ? ReportFrequencyVO.create(data.frequency) : null,
        ownerId: data.ownerId,
        generatedAt: data.generatedAt ? new Date(data.generatedAt) : null,
        nextRunAt: data.nextRunAt ? new Date(data.nextRunAt) : null,
        rowCount: data.rowCount ?? 0,
        filterCount: data.filterCount ?? 0,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: ReportIdVO): Promise<ReportEntity | null> {
    const raw = await this.redis.get<SerializedReport>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly ReportEntity[]> {
    return [];
  }

  async save(entity: ReportEntity): Promise<ReportEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: ReportIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  async cacheContent(reportId: string, content: unknown): Promise<void> {
    await this.redis.set(`${PREFIX}:content:${reportId}`, { content }, TTL_SECONDS * 2);
  }

  async getContent(reportId: string): Promise<unknown | null> {
    const raw = await this.redis.get<{ content: unknown }>(
      `${PREFIX}:content:${reportId}`,
    );
    return raw?.content ?? null;
  }
}
