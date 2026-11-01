/**
 * Auth Prisma Mapper — row ↔ domain entity
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { AuthEntity } from '../../../../domain/entities/auth.entity.js';
import { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { AuthTypeVO } from '../../../../domain/value-objects/primitives/auth-type.vo.js';
import { AuthStatusVO } from '../../../../domain/value-objects/primitives/auth-status.vo.js';
import { AuthProviderVO } from '../../../../domain/value-objects/primitives/auth-provider.vo.js';
import { AuthMethodVO } from '../../../../domain/value-objects/primitives/auth-method.vo.js';
import { IdentifierVO } from '../../../../domain/value-objects/primitives/identifier.vo.js';

/**
 * Prisma `User` row shape (relevant fields for auth)
 */
export interface PrismaAuthRow {
  id: string;
  email: string;
  password: string;
  status: string;
  type: string;
  role: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toIso = (d: Date | null | undefined): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

export class AuthPrismaMapper {
  static toDomain(raw: PrismaAuthRow): AuthEntity {
    const identifier = IdentifierVO.auto(raw.email);
    const type = raw.password ? AuthTypeVO.password() : AuthTypeVO.oauth();
    const status = AuthStatusVO.reconstitute(raw.status);
    const provider = AuthProviderVO.local();
    const method = AuthMethodVO.emailPassword();

    return AuthEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: toIso(raw.deletedAt) ?? null,
      version: 1,
      props: {
        userId: UserIdVO.reconstitute(raw.id),
        type,
        provider,
        method,
        status,
        identifier,
        isEmailVerified: raw.emailVerified,
        isPhoneVerified: false,
        isMfaEnabled: false,
        failedAttempts: 0,
      },
    });
  }

  static toPersistence(entity: AuthEntity): Record<string, unknown> {
    return {
      id: entity.id,
      email: entity.identifier.normalized,
      status: entity.status.value,
      emailVerified: entity.isEmailVerified,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
