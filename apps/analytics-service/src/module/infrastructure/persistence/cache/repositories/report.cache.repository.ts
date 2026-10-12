/**
 * Report Cache Repository
 * @module analytics-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { ReportEntity } from '../../../../domain/entities/report.entity.js';
import { ReportIdVO } from '../../../../domain/value-objects/primitives/report-id.vo.js';
import { ReportTypeVO } from '../../../../domain/value-objects/primitives/report-type.vo.js';
import { ReportFormatVO } from '../../../../domain/value-objects/primitives/report-format.vo.js';
import { ReportStatusVO } from '../../../../domain/value-objects/primitives/report-status.vo.js';
import { ReportFrequencyVO } from '../../../../domain/value-objects/primitives/report-frequency.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { EventTimestampVO } from '../../../../domain/value-objects/primitives/event-timestamp.vo.js';
import { TimeRangeVO } from '../../../../domain/value-objects/composites/time-range.vo.js';

const PREFIX = 'analytics:report';
const DEFAULT_TTL = CACHE_TTL.ONE_HOUR;

interface ReportCachePayload {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly format: string;
  readonly status: string;
  readonly frequency: string;
  readonly ownerId: string;
  readonly rangeStart: number;
  readonly rangeEnd: number;
  readonly nextRunAt?: string;
  readonly lastRunAt?: string;
  readonly outputUrl?: string;
  readonly rowCount?: number;
  readonly failureReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

@Injectable()
export class ReportCacheRepository {
  constructor(private readonly redis: RedisService) {}

  private keyFor(id: string): string {
    return `${PREFIX}:${id}`;
  }

  private ownerKey(ownerId: string): string {
    return `${PREFIX}:owner:${ownerId}`;
  }

  private scheduledKey(): string {
    return `${PREFIX}:scheduled`;
  }

  async findById(id: string): Promise<ReportEntity | null> {
    const payload = await this.redis.get<ReportCachePayload>(this.keyFor(id));
    return payload ? this.deserialize(payload) : null;
  }

  async findByOwner(ownerId: string): Promise<readonly ReportEntity[] | null> {
    const payload = await this.redis.get<readonly ReportCachePayload[]>(this.ownerKey(ownerId));
    return payload ? payload.map((p) => this.deserialize(p)) : null;
  }

  async findScheduled(): Promise<readonly ReportEntity[] | null> {
    const payload = await this.redis.get<readonly ReportCachePayload[]>(this.scheduledKey());
    return payload ? payload.map((p) => this.deserialize(p)) : null;
  }

  async save(entity: ReportEntity, ttlSeconds: number = DEFAULT_TTL): Promise<void> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), ttlSeconds);
  }

  async saveOwnerList(
    ownerId: string,
    entities: readonly ReportEntity[],
    ttlSeconds: number = DEFAULT_TTL
  ): Promise<void> {
    await this.redis.set(
      this.ownerKey(ownerId),
      entities.map((e) => this.serialize(e)),
      ttlSeconds
    );
  }

  async saveScheduledList(
    entities: readonly ReportEntity[],
    ttlSeconds: number = DEFAULT_TTL
  ): Promise<void> {
    await this.redis.set(
      this.scheduledKey(),
      entities.map((e) => this.serialize(e)),
      ttlSeconds
    );
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(this.keyFor(id));
    await this.redis.del(this.scheduledKey());
  }

  async invalidateOwner(ownerId: string): Promise<void> {
    await this.redis.del(this.ownerKey(ownerId));
  }

  async invalidateScheduled(): Promise<void> {
    await this.redis.del(this.scheduledKey());
  }

  async exists(id: string): Promise<boolean> {
    return this.redis.exists(this.keyFor(id));
  }

  private serialize(entity: ReportEntity): ReportCachePayload {
    return {
      id: entity.id,
      name: entity.name,
      type: entity.type.value,
      format: entity.format.value,
      status: entity.status.value,
      frequency: entity.frequency.value,
      ownerId: entity.ownerId.value,
      rangeStart: entity.range.startAt.value.epochMs,
      rangeEnd: entity.range.endAt.value.epochMs,
      nextRunAt: entity.nextRunAt ?? undefined,
      lastRunAt: entity.lastRunAt ?? undefined,
      outputUrl: entity.outputUrl ?? undefined,
      rowCount: entity.rowCount,
      failureReason: entity.failureReason ?? undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private deserialize(payload: ReportCachePayload): ReportEntity {
    return ReportEntity.reconstitute({
      id: payload.id,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
      props: {
        name: payload.name,
        type: ReportTypeVO.create(payload.type),
        format: ReportFormatVO.create(payload.format),
        status: ReportStatusVO.create(payload.status),
        frequency: ReportFrequencyVO.create(payload.frequency),
        range: TimeRangeVO.create({
          startAt: EventTimestampVO.fromEpochMs(payload.rangeStart),
          endAt: EventTimestampVO.fromEpochMs(payload.rangeEnd),
        }),
        ownerId: UserIdVO.create(payload.ownerId),
        nextRunAt: payload.nextRunAt ?? null,
        lastRunAt: payload.lastRunAt ?? null,
        outputUrl: payload.outputUrl ?? null,
        rowCount: payload.rowCount,
        failureReason: payload.failureReason ?? null,
      },
    });
  }
}
