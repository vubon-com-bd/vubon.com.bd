/**
 * User Prisma Repository
 * Implements IUserRepository interface using Prisma
 */

import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { IUserRepository } from '../../../../domain/repositories/user.repository.interface.js';
import { User } from '../../../../domain/entities/user.entity.js';
import type { UserStatus } from '@vubon/auth-shared-constants';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  private readonly logger = new Logger(UserPrismaRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<User> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id: user.id },
      });

      if (existingUser) {
        const updated = await this.prisma.user.update({
          where: { id: user.id },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: this.toPrismaCreateInput(user) as any,
        });
        this.logger.debug(`User updated: ${user.id}`);
        return this.toDomain(updated);
      } else {
        const created = await this.prisma.user.create({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: this.toPrismaCreateInput(user) as any,
        });
        this.logger.debug(`User created: ${user.id}`);
        return this.toDomain(created);
      }
    } catch (error) {
      this.logger.error(`Failed to save user: ${error}`);
      throw error;
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!user) return null;
      return this.toDomain(user);
    } catch (error) {
      this.logger.error(`Failed to find user by ID ${id}: ${error}`);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      if (!user) return null;
      return this.toDomain(user);
    } catch (error) {
      this.logger.error(`Failed to find user by email ${email}: ${error}`);
      throw error;
    }
  }

  async findByPhone(phone: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { phone },
      });
      if (!user) return null;
      return this.toDomain(user);
    } catch (error) {
      this.logger.error(`Failed to find user by phone ${phone}: ${error}`);
      throw error;
    }
  }

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const count = await this.prisma.user.count({
        where: { email },
      });
      return count > 0;
    } catch (error) {
      this.logger.error(`Failed to check email existence ${email}: ${error}`);
      throw error;
    }
  }

  async existsByPhone(phone: string): Promise<boolean> {
    try {
      const count = await this.prisma.user.count({
        where: { phone },
      });
      return count > 0;
    } catch (error) {
      this.logger.error(`Failed to check phone existence ${phone}: ${error}`);
      throw error;
    }
  }

  async exists(id: string): Promise<boolean> {
    try {
      const count = await this.prisma.user.count({
        where: { id },
      });
      return count > 0;
    } catch (error) {
      this.logger.error(`Failed to check user existence ${id}: ${error}`);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      this.logger.debug(`User deleted: ${id}`);
    } catch (error) {
      this.logger.error(`Failed to delete user ${id}: ${error}`);
      throw error;
    }
  }

  async findByStatus(status: UserStatus): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany({
        where: { status },
      });
      return users.map((user) => this.toDomain(user));
    } catch (error) {
      this.logger.error(`Failed to find users by status ${status}: ${error}`);
      throw error;
    }
  }

  async findByRole(role: string): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany({
        where: { role },
      });
      return users.map((user) => this.toDomain(user));
    } catch (error) {
      this.logger.error(`Failed to find users by role ${role}: ${error}`);
      throw error;
    }
  }

  async findUnverifiedUsers(): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          isEmailVerified: false,
        },
      });
      return users.map((user) => this.toDomain(user));
    } catch (error) {
      this.logger.error(`Failed to find unverified users: ${error}`);
      throw error;
    }
  }

  async findInactiveUsers(since: Date): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          updatedAt: { lt: since },
          status: 'ACTIVE',
        },
      });
      return users.map((user) => this.toDomain(user));
    } catch (error) {
      this.logger.error(`Failed to find inactive users: ${error}`);
      throw error;
    }
  }

  async updateStatus(id: string, status: UserStatus): Promise<User> {
    try {
      const updated = await this.prisma.user.update({
        where: { id },
        data: { status },
      });
      this.logger.debug(`User status updated: ${id} -> ${status}`);
      return this.toDomain(updated);
    } catch (error) {
      this.logger.error(`Failed to update status for user ${id}: ${error}`);
      throw error;
    }
  }

  async updateEmailVerification(id: string, isVerified: boolean): Promise<User> {
    try {
      const updated = await this.prisma.user.update({
        where: { id },
        data: { isEmailVerified: isVerified },
      });
      this.logger.debug(`Email verification updated: ${id} -> ${isVerified}`);
      return this.toDomain(updated);
    } catch (error) {
      this.logger.error(`Failed to update email verification for ${id}: ${error}`);
      throw error;
    }
  }

  async updatePhoneVerification(id: string, isVerified: boolean): Promise<User> {
    try {
      const updated = await this.prisma.user.update({
        where: { id },
        data: { isPhoneVerified: isVerified },
      });
      this.logger.debug(`Phone verification updated: ${id} -> ${isVerified}`);
      return this.toDomain(updated);
    } catch (error) {
      this.logger.error(`Failed to update phone verification for ${id}: ${error}`);
      throw error;
    }
  }

  async updatePasswordHash(id: string, newHash: string): Promise<User> {
    try {
      const updated = await this.prisma.user.update({
        where: { id },
        data: { password: newHash },
      });
      this.logger.debug(`Password hash updated for user: ${id}`);
      return this.toDomain(updated);
    } catch (error) {
      this.logger.error(`Failed to update password for ${id}: ${error}`);
      throw error;
    }
  }

  async findByEmailCaseInsensitive(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: {
            equals: email.toLowerCase(),
            mode: 'insensitive',
          },
        },
      });
      if (!user) return null;
      return this.toDomain(user);
    } catch (error) {
      this.logger.error(`Failed to find user by email (case-insensitive) ${email}: ${error}`);
      throw error;
    }
  }

  async countByStatus(status: UserStatus): Promise<number> {
    try {
      return await this.prisma.user.count({
        where: { status },
      });
    } catch (error) {
      this.logger.error(`Failed to count users by status ${status}: ${error}`);
      throw error;
    }
  }

  async countByRole(role: string): Promise<number> {
    try {
      return await this.prisma.user.count({
        where: { role },
      });
    } catch (error) {
      this.logger.error(`Failed to count users by role ${role}: ${error}`);
      throw error;
    }
  }

  async findWithMetadata(id: string): Promise<User | null> {
    return this.findById(id);
  }

  async bulkUpdateStatus(ids: string[], status: UserStatus): Promise<number> {
    try {
      const result = await this.prisma.user.updateMany({
        where: {
          id: { in: ids },
        },
        data: { status },
      });
      this.logger.debug(`Bulk status update: ${result.count} users updated`);
      return result.count;
    } catch (error) {
      this.logger.error(`Failed to bulk update status: ${error}`);
      throw error;
    }
  }

  async softDelete(id: string): Promise<User> {
    return this.updateStatus(id, 'DEACTIVATED');
  }

  async restore(id: string): Promise<User> {
    return this.updateStatus(id, 'ACTIVE');
  }

  async findRecentlyRegistered(days: number): Promise<User[]> {
    try {
      const date = new Date();
      date.setDate(date.getDate() - days);

      const users = await this.prisma.user.findMany({
        where: {
          createdAt: {
            gte: date,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return users.map((user) => this.toDomain(user));
    } catch (error) {
      this.logger.error(`Failed to find recently registered users: ${error}`);
      throw error;
    }
  }

  async findAll(options?: {
    skip?: number;
    take?: number;
    orderBy?: Record<string, 'asc' | 'desc'>;
  }): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany({
        skip: options?.skip,
        take: options?.take,
        orderBy: options?.orderBy || { createdAt: 'desc' },
      });
      return users.map((user) => this.toDomain(user));
    } catch (error) {
      this.logger.error(`Failed to find all users: ${error}`);
      throw error;
    }
  }

  async count(): Promise<number> {
    try {
      return await this.prisma.user.count();
    } catch (error) {
      this.logger.error(`Failed to count users: ${error}`);
      throw error;
    }
  }

  // ================ Mappers ================

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private toDomain(prismaUser: any): User {
    return new User(
      {
        email: prismaUser.email,
        passwordHash: prismaUser.password ?? prismaUser.passwordHash,
        firstName: prismaUser.firstName,
        lastName: prismaUser.lastName,
        phone: prismaUser.phone,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        role: prismaUser.role as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        status: prismaUser.status as any,
        isEmailVerified: prismaUser.isEmailVerified,
        isPhoneVerified: prismaUser.isPhoneVerified,
        metadata: prismaUser.metadata as Record<string, unknown> | null || null,
      },
      prismaUser.id
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private toPrismaCreateInput(user: User): any {
    return {
      id: user.id,
      email: user.email,
      password: user.passwordHash,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role,
      status: user.status,
      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified,
      metadata: user.metadata ?? null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
