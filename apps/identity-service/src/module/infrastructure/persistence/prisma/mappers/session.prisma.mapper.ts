/**
 * Session Prisma Mapper — Prisma `AuthSession` row ↔ `SessionEntity`
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { SessionEntity } from '../../../../domain/entities/session.entity.js';
import { SessionIdVO } from '../../../../domain/value-objects/primitives/session-id.vo.js';
import { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { SessionStatusVO } from '../../../../domain/value-objects/primitives/session-status.vo.js';
import { SessionExpiryVO } from '../../../../domain/value-objects/primitives/session-expiry.vo.js';
import { IpAddressVO } from '../../../../domain/value-objects/primitives/ip-address.vo.js';
import { UserAgentVO } from '../../../../domain/value-objects/primitives/user-agent.vo.js';
import { DeviceIdVO } from '../../../../domain/value-objects/primitives/device-id.vo.js';

export interface PrismaSessionRow {
  id: string;
  userId: string;
  token: string;
  expiry: Date;
  ip: string;
  userAgent: string;
  deviceId: string | null;
  revokedAt: Date | null;
  revokeReason: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class SessionPrismaMapper {
  static toDomain(raw: PrismaSessionRow): SessionEntity {
    const nowSec = Math.floor(Date.now() / 1000);
    const absExpiresAt = Math.floor(new Date(raw.expiry).getTime() / 1000);
    const isRevoked = !!raw.revokedAt;

    const status = isRevoked
      ? SessionStatusVO.revoked()
      : absExpiresAt < nowSec
        ? SessionStatusVO.expired()
        : SessionStatusVO.active();

    const ipAddress = this.tryIp(raw.ip);
    const userAgent = this.tryUserAgent(raw.userAgent);
    const deviceId = raw.deviceId
      ? DeviceIdVO.reconstitute(raw.deviceId)
      : undefined;

    return SessionEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: 1,
      props: {
        authId: AuthIdVO.reconstitute(raw.userId),
        userId: UserIdVO.reconstitute(raw.userId),
        status,
        expiry: SessionExpiryVO.create({
          absoluteExpiresAt: absExpiresAt,
          idleTimeoutSeconds: 1800,
        }),
        ipAddress,
        userAgent,
        deviceId,
        rememberMe: false,
        lastAccessedAt: new Date(raw.updatedAt).toISOString(),
        revokedAt: raw.revokedAt
          ? new Date(raw.revokedAt).toISOString()
          : undefined,
        revokedReason: raw.revokeReason ?? undefined,
      },
    });
  }

  static toPersistence(entity: SessionEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.userId.value,
      expiry: new Date(entity.expiry.absoluteExpiresAt * 1000),
      ip: entity.ipAddress?.value ?? '0.0.0.0',
      userAgent: entity.userAgent?.value ?? 'unknown',
      deviceId: entity.deviceId?.value ?? null,
      revokedAt: entity.revokedAt ? new Date(entity.revokedAt) : null,
      revokeReason: entity.revokedReason ?? null,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static tryIp(value: string | undefined): IpAddressVO | undefined {
    if (!value || value === '0.0.0.0') return undefined;
    try {
      return IpAddressVO.create(value);
    } catch {
      return undefined;
    }
  }

  private static tryUserAgent(value: string | undefined): UserAgentVO | undefined {
    if (!value || value === 'unknown') return undefined;
    try {
      return UserAgentVO.create(value);
    } catch {
      return undefined;
    }
  }
}
