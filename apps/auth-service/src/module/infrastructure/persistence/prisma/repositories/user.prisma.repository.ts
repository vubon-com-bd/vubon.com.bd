/**
 * UserPrismaRepository — UserEntity ↔ Prisma User
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { User as PrismaUser } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import type { UserId } from '@vubon/shared-types/common';
import { UserEntity } from '../../../../domain/entities/user.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '../../../../domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '../../../../domain/value-objects/primitives/user-name.vo';
import { UserPhoneVO } from '../../../../domain/value-objects/primitives/user-phone.vo';
import { UserStatusVO } from '../../../../domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../../../../domain/value-objects/primitives/user-type.vo';
import { UserRoleVO } from '../../../../domain/value-objects/primitives/user-role.vo';
import type { UserRepository } from '../../../../domain/repositories/user.repository.interface';

@Injectable()
export class UserPrismaRepository
  extends BasePrismaRepository<UserEntity, PrismaUser, UserId>
  implements UserRepository {
  protected readonly model: PrismaDelegate<PrismaUser>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.user as unknown as PrismaDelegate<PrismaUser>;
  }

  protected idOf(domain: UserEntity): UserId {
    return domain.id;
  }

  protected whereForId(id: UserId): Record<string, unknown> {
    return { id };
  }

  protected toDomain(raw: PrismaUser): UserEntity {
    return UserEntity.create({
      id: raw.id as UserId,
      email: UserEmailVO.of(raw.email),
      passwordHash: raw.password,
      name: UserNameVO.of(raw.name),
      phone: raw.phone ? UserPhoneVO.of(raw.phone) : undefined,
      status: UserStatusVO.of(raw.status),
      type: UserTypeVO.of(raw.type),
      roles: [UserRoleVO.of(raw.role)],
      emailVerified: raw.emailVerified,
      phoneVerified: false,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
    });
  }

  protected toPersistence(domain: UserEntity): Record<string, unknown> {
    return {
      id: domain.id,
      email: domain.email.value,
      password: domain.passwordHash,
      name: domain.name.value,
      phone: domain.phone?.value ?? null,
      status: domain.status.value,
      type: domain.type.value,
      role: domain.roles[0]?.value ?? 'user',
      emailVerified: domain.emailVerified,
      updatedAt: new Date(),
    };
  }

  async findByEmail(email: UserEmailVO): Promise<UserEntity | null> {
    const raw = await this.prisma.user.findUnique({
      where: { email: email.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async existsByEmail(email: UserEmailVO): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { email: email.value },
    });
    return count > 0;
  }

  async findByIds(ids: readonly UserId[]): Promise<readonly UserEntity[]> {
    if (ids.length === 0) return [];
    const rows = await this.prisma.user.findMany({
      where: { id: { in: [...ids] } },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async countByStatus(status: string): Promise<number> {
    return this.prisma.user.count({ where: { status } });
  }
}
