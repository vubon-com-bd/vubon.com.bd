/**
 * UserPrismaRepository — Prisma implementation of UserRepository
 * @module user-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { User as PrismaUser } from '@prisma/client';
import { PrismaService } from '../prisma.service.js';
import type {
  UserRepository,
  UserPaginationOptions,
} from '@domain/repositories/user.repository.interface';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserPhoneVO } from '@domain/value-objects/primitives/user-phone.vo';
import { UserStatusVO } from '@domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Mappers ─────────────────────────────────────────
  private toDomain(raw: PrismaUser): UserEntity {
    return UserEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
      props: {
        id: UserIdVO.create(raw.id),
        email: UserEmailVO.create(raw.email),
        name: UserNameVO.create(raw.name),
        phone: raw.phone ? UserPhoneVO.create(raw.phone) : null,
        status: UserStatusVO.create(raw.status),
        type: UserTypeVO.create(raw.type),
        emailVerified: raw.emailVerified,
        phoneVerified: false,
      },
    });
  }

  private toPersistence(entity: UserEntity): {
    id: string;
    email: string;
    name: string;
    phone: string | null;
    status: string;
    type: string;
    emailVerified: boolean;
    updatedAt: Date;
    deletedAt: Date | null;
  } {
    return {
      id: entity.id,
      email: entity.email.value,
      name: entity.name.value,
      phone: entity.phone?.value ?? null,
      status: entity.status.value,
      type: entity.type.value,
      emailVerified: entity.emailVerified,
      updatedAt: new Date(),
      deletedAt: entity.isDeleted() ? new Date() : null,
    };
  }

  // ─── BaseRepository ──────────────────────────────────
  async findById(id: string): Promise<UserEntity | null> {
    const raw = await this.prisma.user.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly UserEntity[]> {
    const raws = await this.prisma.user.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return raws.map((r) => this.toDomain(r));
  }

  async save(entity: UserEntity): Promise<UserEntity> {
    const data = this.toPersistence(entity);
    const raw = await this.prisma.user.upsert({
      where: { id: data.id },
      create: {
        id: data.id,
        email: data.email,
        name: data.name,
        phone: data.phone,
          password: '',
        status: data.status,
        type: data.type,
        emailVerified: data.emailVerified,
      },
      update: {
        email: data.email,
        name: data.name,
        phone: data.phone,
        status: data.status,
        type: data.type,
        emailVerified: data.emailVerified,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
      },
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.user.count({ where: { id } });
    return count > 0;
  }

  // ─── Custom finders ──────────────────────────────────
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

  async findByStatus(status: UserStatusVO): Promise<readonly UserEntity[]> {
    const raws = await this.prisma.user.findMany({
      where: { status: status.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return raws.map((r) => this.toDomain(r));
  }

  async findByType(type: UserTypeVO): Promise<readonly UserEntity[]> {
    const raws = await this.prisma.user.findMany({
      where: { type: type.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return raws.map((r) => this.toDomain(r));
  }

  async findPaginated(options: UserPaginationOptions): Promise<{
    readonly items: readonly UserEntity[];
    readonly total: number;
  }> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (options.status) where.status = options.status.value;
    if (options.type) where.type = options.type.value;
    if (options.search) {
      where.OR = [
        { email: { contains: options.search, mode: 'insensitive' } },
        { name: { contains: options.search, mode: 'insensitive' } },
      ];
    }

    const [raws, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { items: raws.map((r) => this.toDomain(r)), total };
  }

  async countByStatus(status: UserStatusVO): Promise<number> {
    return this.prisma.user.count({
      where: { status: status.value, deletedAt: null },
    });
  }

  async softDelete(id: UserIdVO): Promise<void> {
    await this.prisma.user.update({
      where: { id: id.value },
      data: { deletedAt: new Date() },
    });
  }
}
