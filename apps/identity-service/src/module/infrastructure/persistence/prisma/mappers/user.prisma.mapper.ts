/**
 * User Prisma Mapper — Prisma `User` row ↔ `UserEntity`
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { UserEntity } from '../../../../domain/entities/user.entity.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { UserEmailVO } from '../../../../domain/value-objects/primitives/user-email.vo.js';
import { UserNameVO } from '../../../../domain/value-objects/primitives/user-name.vo.js';
import { UserPhoneVO } from '../../../../domain/value-objects/primitives/user-phone.vo.js';
import { UserStatusVO } from '../../../../domain/value-objects/primitives/user-status.vo.js';
import { UserTypeVO } from '../../../../domain/value-objects/primitives/user-type.vo.js';
import { UserRoleVO } from '../../../../domain/value-objects/primitives/user-role.vo.js';

export interface PrismaUserRow {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string | null;
  status: string;
  type: string;
  role: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class UserPrismaMapper {
  static toDomain(raw: PrismaUserRow): UserEntity {
    const [firstName, ...rest] = raw.name.split(' ');
    const lastName = rest.join(' ') || undefined;

    return UserEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: 1,
      props: {
        email: UserEmailVO.reconstitute(raw.email),
        firstName: firstName
          ? UserNameVO.reconstitute(firstName)
          : undefined,
        lastName: lastName
          ? UserNameVO.reconstitute(lastName)
          : undefined,
        phone: raw.phone ? UserPhoneVO.reconstitute(raw.phone) : undefined,
        status: this.parseStatus(raw.status),
        type: this.parseType(raw.type),
        roles: [this.parseRole(raw.role)],
        emailVerified: raw.emailVerified,
        phoneVerified: false,
        isMfaEnabled: false,
      },
    });
  }

  static toPersistence(entity: UserEntity): Record<string, unknown> {
    const name = [entity.firstName?.value, entity.lastName?.value]
      .filter(Boolean)
      .join(' ');

    return {
      id: entity.id,
      email: entity.email.value,
      name: name || entity.email.localPart || entity.email.value,
      phone: entity.phone?.value ?? null,
      status: entity.status.value,
      type: entity.type.value,
      role: entity.roles[0]?.value ?? 'customer',
      emailVerified: entity.emailVerified,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static parseStatus(v: string): UserStatusVO {
    try { return UserStatusVO.reconstitute(v); } catch { return UserStatusVO.pending(); }
  }
  private static parseType(v: string): UserTypeVO {
    try { return UserTypeVO.reconstitute(v); } catch { return UserTypeVO.individual(); }
  }
  private static parseRole(v: string): UserRoleVO {
    try { return UserRoleVO.reconstitute(v); } catch { return UserRoleVO.customer(); }
  }
}
