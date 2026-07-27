/**
 * Prisma Service
 * Wraps PrismaClient as a NestJS service
 */

import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { getDatabaseConfig } from '../../config/database.config.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const config = getDatabaseConfig();
    super({
      datasources: {
        db: {
          url: config.url,
        },
      },
      log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    });
  }

  async onModuleInit(): Promise<void> {
    this.logger.log('Connecting to database...');
    await this.$connect();
    this.logger.log('Database connected successfully');
  }

  async onModuleDestroy(): Promise<void> {
    this.logger.log('Disconnecting from database...');
    await this.$disconnect();
    this.logger.log('Database disconnected');
  }

  /**
   * Enable soft delete filtering
   * Automatically filters out soft-deleted records
   */
  async softDelete<
    T extends {
      update: (args: { where: { id: string }; data: { deletedAt: Date } }) => Promise<T>;
    },
  >(model: T, id: string): Promise<T> {
    return model.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  /**
   * Restore soft-deleted record
   */
  async restore<
    T extends {
      update: (args: { where: { id: string }; data: { deletedAt: null } }) => Promise<T>;
    },
  >(model: T, id: string): Promise<T> {
    return model.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}
