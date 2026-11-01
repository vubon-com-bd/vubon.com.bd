/**
 * Login Attempt Prisma Mapper
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { LoginAttemptEntity } from '../../../../domain/entities/login-attempt.entity.js';
import { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';
import { LoginAttemptStatusVO } from '../../../../domain/value-objects/primitives/login-attempt-status.vo.js';
import { IdentifierVO } from '../../../../domain/value-objects/primitives/identifier.vo.js';
import { IpAddressVO } from '../../../../domain/value-objects/primitives/ip-address.vo.js';
import { UserAgentVO } from '../../../../domain/value-objects/primitives/user-agent.vo.js';
import { DeviceFingerprintVO } from '../../../../domain/value-objects/primitives/device-fingerprint.vo.js';

export interface PrismaLoginAttemptRow {
  id: string;
  userId: string | null;
  email: string | null;
  ip: string;
  userAgent: string;
  status: string;
  attemptedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class LoginAttemptPrismaMapper {
  static toDomain(raw: PrismaLoginAttemptRow): LoginAttemptEntity {
    const identifier = this.tryIdentifier(raw.email);

    return LoginAttemptEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      props: {
        authId: raw.userId
          ? AuthIdVO.reconstitute(raw.userId)
          : undefined,
        identifier,
        status: this.parseStatus(raw.status),
        ipAddress: this.tryIp(raw.ip),
        userAgent: this.tryUa(raw.userAgent),
        deviceFingerprint: DeviceFingerprintVO.reconstitute(
          'unknown-fp-00000000',
        ),
        attemptedAt: new Date(raw.attemptedAt).toISOString(),
      },
    });
  }

  static toPersistence(entity: LoginAttemptEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.authId?.value ?? null,
      email: entity.identifier.normalized,
      ip: entity.ipAddress?.value ?? '0.0.0.0',
      userAgent: entity.userAgent?.value ?? 'unknown',
      status: entity.status.value,
      attemptedAt: new Date(entity.attemptedAt),
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static parseStatus(value: string): LoginAttemptStatusVO {
    try {
      return LoginAttemptStatusVO.reconstitute(value);
    } catch {
      return LoginAttemptStatusVO.failed();
    }
  }

  private static tryIdentifier(email: string | null): IdentifierVO {
    if (email) {
      try {
        return IdentifierVO.email(email);
      } catch {
        /* fall through */
      }
    }
    return IdentifierVO.username('unknown-user');
  }

  private static tryIp(value: string): IpAddressVO | undefined {
    if (!value || value === '0.0.0.0') return undefined;
    try {
      return IpAddressVO.create(value);
    } catch {
      return undefined;
    }
  }

  private static tryUa(value: string): UserAgentVO | undefined {
    if (!value || value === 'unknown') return undefined;
    try {
      return UserAgentVO.create(value);
    } catch {
      return undefined;
    }
  }
}
