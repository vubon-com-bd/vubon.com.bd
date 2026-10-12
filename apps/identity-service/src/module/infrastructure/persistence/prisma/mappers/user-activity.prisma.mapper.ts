/**
 * User Activity Prisma Mapper
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { UserActivityEntity } from '../../../../domain/entities/user-activity.entity.js';
import { ActivityIdVO } from '../../../../domain/value-objects/primitives/activity-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { ActivityTypeVO } from '../../../../domain/value-objects/primitives/activity-type.vo.js';
import { IpAddressVO } from '../../../../domain/value-objects/primitives/ip-address.vo.js';
import { UserAgentVO } from '../../../../domain/value-objects/primitives/user-agent.vo.js';

export interface PrismaUserActivityRow {
  id: string;
  userId: string;
  type: string;
  description: string | null;
  ip: string | null;
  userAgent: string | null;
  deviceId: string | null;
  metadata: unknown;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class UserActivityPrismaMapper {
  static toDomain(raw: PrismaUserActivityRow): UserActivityEntity {
    return UserActivityEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      props: {
        userId: UserIdVO.reconstitute(raw.userId),
        type: this.parseType(raw.type),
        description: raw.description ?? undefined,
        ipAddress: this.tryIp(raw.ip),
        userAgent: this.tryUa(raw.userAgent),
        deviceId: raw.deviceId ?? undefined,
        metadata: (raw.metadata as Readonly<Record<string, unknown>> | null) ?? undefined,
        occurredAt: new Date(raw.createdAt).toISOString(),
      },
    });
  }

  static toPersistence(entity: UserActivityEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.userId.value,
      type: entity.type.value,
      description: entity.description ?? null,
      ip: entity.ipAddress?.value ?? null,
      userAgent: entity.userAgent?.value ?? null,
      deviceId: entity.deviceId ?? null,
      metadata: entity.metadata ?? null,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static parseType(v: string): ActivityTypeVO {
    try { return ActivityTypeVO.reconstitute(v); } catch { return ActivityTypeVO.login(); }
  }
  private static tryIp(v: string | null): IpAddressVO | undefined {
    if (!v) return undefined;
    try { return IpAddressVO.create(v); } catch { return undefined; }
  }
  private static tryUa(v: string | null): UserAgentVO | undefined {
    if (!v) return undefined;
    try { return UserAgentVO.create(v); } catch { return undefined; }
  }
}
