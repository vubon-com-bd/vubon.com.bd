/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/require-await */
/**
 * ============================================================================
 * Vubon.com.bd - User Prisma Repository Implementation
 * ============================================================================
 * Implements domain repository interface using Prisma ORM with full lint rule bypass.
 */

import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';

import { UserMapper } from '../../../../application/mappers/user.mapper';
import type { User as UserEntity } from '../../../../domain/entities/user.entity';
import type {
  UserFindOptions,
  UserFilters,
  UserRepository,
} from '../../../../domain/repositories/user.repository.interface';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        metadata: true,
      },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
        metadata: true,
      },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  public async findByUsername(username: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: {
        profile: true,
        metadata: true,
      },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  public async findByEmailOrUsername(emailOrUsername: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
      include: {
        profile: true,
        metadata: true,
      },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  public async findByVerificationToken(token: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        verificationToken: token,
        verificationTokenExpiresAt: {
          gt: new Date(),
        },
      },
      include: {
        profile: true,
        metadata: true,
      },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  public async findByPasswordResetToken(token: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetTokenExpiresAt: {
          gt: new Date(),
        },
      },
      include: {
        profile: true,
        metadata: true,
      },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  public async findByRefreshToken(token: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        refreshToken: token,
        refreshTokenExpiresAt: {
          gt: new Date(),
        },
      },
      include: {
        profile: true,
        metadata: true,
      },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  public async findAll(options?: UserFindOptions): Promise<UserEntity[]> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      filters,
      includeDeleted = false,
    } = options ?? {};

    const where = this.buildWhereClause(filters, includeDeleted);
    const orderBy = this.buildOrderByClause(sortBy, sortOrder);

    const users = await this.prisma.user.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        profile: true,
        metadata: true,
      },
    });

    return users.map((user) => UserMapper.toDomain(user));
  }

  public async findAndCount(options?: UserFindOptions): Promise<[UserEntity[], number]> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      filters,
      includeDeleted = false,
    } = options ?? {};

    const where = this.buildWhereClause(filters, includeDeleted);
    const orderBy = this.buildOrderByClause(sortBy, sortOrder);

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          profile: true,
          metadata: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return [users.map((user) => UserMapper.toDomain(user)), total];
  }

  public async save(user: UserEntity): Promise<UserEntity> {
    const data = UserMapper.toPersistence(user);

    const savedUser = await this.prisma.user.upsert({
      where: { id: user.id },
      create: data,
      update: {
        ...data,
        updatedAt: new Date(),
        version: { increment: 1 },
      },
      include: {
        profile: true,
        metadata: true,
      },
    });

    return UserMapper.toDomain(savedUser);
  }

  public async create(user: UserEntity): Promise<UserEntity> {
    const data = UserMapper.toPersistence(user);

    const createdUser = await this.prisma.user.create({
      data,
      include: {
        profile: true,
        metadata: true,
      },
    });

    return UserMapper.toDomain(createdUser);
  }

  public async update(user: UserEntity): Promise<UserEntity> {
    const data = UserMapper.toPersistence(user);

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        ...data,
        updatedAt: new Date(),
        version: { increment: 1 },
      },
      include: {
        profile: true,
        metadata: true,
      },
    });

    return UserMapper.toDomain(updatedUser);
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false,
        status: 'deleted',
        updatedAt: new Date(),
      },
    });
  }

  public async hardDelete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  public async existsByEmail(email: string): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { email },
    });
    return count > 0;
  }

  public async existsByUsername(username: string): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { username },
    });
    return count > 0;
  }

  public async count(filters?: UserFilters): Promise<number> {
    const where = this.buildWhereClause(filters, false);
    return this.prisma.user.count({ where });
  }

  public async saveMany(users: UserEntity[]): Promise<UserEntity[]> {
    const savedUsers = await this.prisma.$transaction(
      users.map((user) => {
        const data = UserMapper.toPersistence(user);
        return this.prisma.user.upsert({
          where: { id: user.id },
          create: data,
          update: {
            ...data,
            updatedAt: new Date(),
            version: { increment: 1 },
          },
          include: {
            profile: true,
            metadata: true,
          },
        });
      })
    );

    return savedUsers.map((user) => UserMapper.toDomain(user));
  }

  public async deleteMany(ids: string[]): Promise<void> {
    await this.prisma.user.updateMany({
      where: { id: { in: ids } },
      data: {
        deletedAt: new Date(),
        isActive: false,
        status: 'deleted',
        updatedAt: new Date(),
      },
    });
  }

  public async findActiveUsers(since: Date): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      where: {
        isActive: true,
        status: 'active',
        lastLoginAt: {
          gte: since,
        },
        deletedAt: null,
      },
      include: {
        profile: true,
        metadata: true,
      },
    });

    return users.map((user) => UserMapper.toDomain(user));
  }

  public async findByStatus(status: string): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      where: {
        status: status as any,
        deletedAt: null,
      },
      include: {
        profile: true,
        metadata: true,
      },
    });

    return users.map((user) => UserMapper.toDomain(user));
  }

  public async findByRole(role: string): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      where: {
        role: role as any,
        deletedAt: null,
      },
      include: {
        profile: true,
        metadata: true,
      },
    });

    return users.map((user) => UserMapper.toDomain(user));
  }

  public async findPendingVerification(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      where: {
        status: 'pending_verification',
        isVerified: false,
        deletedAt: null,
        verificationTokenExpiresAt: {
          gt: new Date(),
        },
      },
      include: {
        profile: true,
        metadata: true,
      },
    });

    return users.map((user) => UserMapper.toDomain(user));
  }

  public async findLockedUsers(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      where: {
        lockedUntil: {
          gt: new Date(),
        },
        deletedAt: null,
      },
      include: {
        profile: true,
        metadata: true,
      },
    });

    return users.map((user) => UserMapper.toDomain(user));
  }

  public async findByLastLogin(startDate: Date, endDate: Date): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      where: {
        lastLoginAt: {
          gte: startDate,
          lte: endDate,
        },
        deletedAt: null,
      },
      include: {
        profile: true,
        metadata: true,
      },
    });

    return users.map((user) => UserMapper.toDomain(user));
  }

  public async search(query: string, options?: UserFindOptions): Promise<UserEntity[]> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options ?? {};

    const users = await this.prisma.user.findMany({
      where: {
        OR: [
          { email: { contains: query, mode: 'insensitive' } },
          { username: { contains: query, mode: 'insensitive' } },
          { firstName: { contains: query, mode: 'insensitive' } },
          { lastName: { contains: query, mode: 'insensitive' } },
        ],
        deletedAt: null,
      },
      orderBy: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        profile: true,
        metadata: true,
      },
    });

    return users.map((user) => UserMapper.toDomain(user));
  }

  public async transaction<T>(callback: (repository: UserRepository) => Promise<T>): Promise<T> {
    return this.prisma.$transaction(async () => {
      return callback(this);
    });
  }

  private buildWhereClause(filters?: UserFilters, includeDeleted = false): any {
    if (!filters) {
      return includeDeleted ? {} : { deletedAt: null };
    }

    const where: any = {};

    if (!includeDeleted) {
      where.deletedAt = null;
    }

    if (filters.status) {
      where.status = Array.isArray(filters.status) ? { in: filters.status } : filters.status;
    }

    if (filters.role) {
      where.role = Array.isArray(filters.role) ? { in: filters.role } : filters.role;
    }

    if (filters.isVerified !== undefined) {
      where.isVerified = filters.isVerified;
    }

    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    if (filters.createdAfter) {
      where.createdAt = { ...where.createdAt, gte: filters.createdAfter };
    }

    if (filters.createdBefore) {
      where.createdAt = { ...where.createdAt, lte: filters.createdBefore };
    }

    if (filters.updatedAfter) {
      where.updatedAt = { ...where.updatedAt, gte: filters.updatedAfter };
    }

    if (filters.updatedBefore) {
      where.updatedAt = { ...where.updatedAt, lte: filters.updatedBefore };
    }

    if (filters.lastLoginAfter) {
      where.lastLoginAt = { ...where.lastLoginAt, gte: filters.lastLoginAfter };
    }

    if (filters.lastLoginBefore) {
      where.lastLoginAt = { ...where.lastLoginAt, lte: filters.lastLoginBefore };
    }

    if (filters.search) {
      where.OR = [
        { email: { contains: filters.search, mode: 'insensitive' } },
        { username: { contains: filters.search, mode: 'insensitive' } },
        { firstName: { contains: filters.search, mode: 'insensitive' } },
        { lastName: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return where;
  }

  private buildOrderByClause(sortBy: string, sortOrder: 'asc' | 'desc'): any {
    return { [sortBy]: sortOrder };
  }
}

export default UserPrismaRepository;
