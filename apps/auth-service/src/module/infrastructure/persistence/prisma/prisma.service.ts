/**
 * Prisma Service
 * Wraps PrismaClient as a NestJS service
 */

import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
// ✅ সরাসরি জেনারেটেড ফাইল থেকে ইমপোর্ট করুন (প্রকল্পের লোকেশন অনুযায়ী)
import { PrismaClient } from '../../../generated/prisma/index.js';
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
}
