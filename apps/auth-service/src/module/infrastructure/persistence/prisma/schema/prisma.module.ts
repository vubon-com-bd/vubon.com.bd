/**
 * Prisma Module - Enterprise Grade Database Module
 *
 * @module infrastructure/persistence/prisma/prisma.module
 *
 * @description
 * NestJS module for Prisma ORM integration.
 * Exports PrismaService for use across the application.
 *
 * Enterprise Features:
 * ✅ Global module (available everywhere)
 * ✅ Configurable via forRoot/forRootAsync
 * ✅ Health check integration
 * ✅ Environment-aware configuration (SSOT with shared-config)
 * ✅ Graceful shutdown handling
 * ✅ Extensible with custom repositories
 *
 * @example
 * // In your app.module.ts
 * @Module({
 *   imports: [
 *     PrismaModule.forRoot({
 *       logQueries: true,
 *       slowQueryThreshold: 50,
 *     }),
 *     // ... other modules
 *   ],
 * })
 * export class AppModule {}
 */

import { Module, Global, DynamicModule, Provider, OnModuleDestroy } from '@nestjs/common';
import { PrismaService, PrismaServiceOptions } from './prisma.service';
import { env } from '@vubon/shared-config';

// ============================================================
// Module Configuration
// ============================================================

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule implements OnModuleDestroy {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Configure Prisma module synchronously
   * @param options - Prisma service options
   * @returns Dynamic module
   */
  static forRoot(options?: PrismaServiceOptions): DynamicModule {
    const providers: Provider[] = [
      {
        provide: PrismaService,
        useFactory: () => {
          return new PrismaService(options);
        },
      },
    ];

    return {
      module: PrismaModule,
      global: true,
      providers,
      exports: [PrismaService],
    };
  }

  /**
   * Configure Prisma module asynchronously
   * @param optionsFactory - Factory function or class for async configuration
   * @returns Dynamic module
   */
  static forRootAsync(options: {
    imports?: any[];
    useFactory?: (...args: any[]) => Promise<PrismaServiceOptions> | PrismaServiceOptions;
    inject?: any[];
  }): DynamicModule {
    const providers: Provider[] = [
      {
        provide: PrismaService,
        useFactory: async (...args: any[]) => {
          const config = await options.useFactory?.(...args);
          return new PrismaService(config);
        },
        inject: options.inject || [],
      },
    ];

    return {
      module: PrismaModule,
      global: true,
      imports: options.imports || [],
      providers,
      exports: [PrismaService],
    };
  }

  /**
   * Configure Prisma module with environment-based configuration
   * Uses shared-config (SSOT) for all environment variables
   * @returns Dynamic module
   */
  static forRootWithEnv(): DynamicModule {
    return this.forRoot({
      logQueries: env.NODE_ENV !== 'production',
      slowQueryThreshold: Number(env.DB_SLOW_QUERY_THRESHOLD) || 100,
      enableAuditLogging: env.NODE_ENV !== 'production',
      maxRetries: Number(env.DB_MAX_RETRIES) || 3,
      retryDelayMs: Number(env.DB_RETRY_DELAY_MS) || 1000,
    });
  }

  /**
   * On module destroy, ensure Prisma disconnects
   */
  async onModuleDestroy(): Promise<void> {
    // PrismaService handles disconnect via OnModuleDestroy
    // This is just a safety net
    try {
      await this.prismaService.onModuleDestroy();
    } catch (error) {
      // Ignore errors during shutdown
    }
  }
}

// ============================================================
// Type Exports
// ============================================================

export { PrismaService };
export type { PrismaServiceOptions };
