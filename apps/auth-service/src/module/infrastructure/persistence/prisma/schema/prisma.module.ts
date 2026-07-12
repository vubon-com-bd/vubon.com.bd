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
 * ✅ Environment-aware configuration (using shared-config)
 * ✅ Graceful shutdown handling with enhanced error management
 * ✅ Extensible with custom repositories
 * ✅ Type-safe configuration
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

import { Module, Global, DynamicModule, Provider, OnModuleDestroy, Logger } from '@nestjs/common';
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
  private readonly logger = new Logger(PrismaModule.name);

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
   * Configure Prisma module with environment-based configuration using shared-config
   * This ensures SSOT (Single Source of Truth) and type-safety
   * @returns Dynamic module
   */
  static forRootWithEnv(): DynamicModule {
    // All configuration values come from the validated shared-config env object
    const options: PrismaServiceOptions = {
      // Determine if query logging should be enabled (non-production environments by default)
      logQueries: env.NODE_ENV !== 'production',
      
      // Slow query threshold in milliseconds (with fallback)
      slowQueryThreshold: env.DB_SLOW_QUERY_THRESHOLD ?? 100,
      
      // Enable audit logging in non-production environments
      enableAuditLogging: env.NODE_ENV !== 'production',
      
      // Database connection retry attempts (with fallback)
      maxRetries: env.DB_MAX_RETRIES ?? 3,
      
      // Retry delay in milliseconds (with fallback)
      retryDelayMs: env.DB_RETRY_DELAY_MS ?? 1000,
    };

    return this.forRoot(options);
  }

  /**
   * On module destroy, ensure Prisma disconnects gracefully
   * Enhanced error handling to prevent crashes during shutdown
   */
  async onModuleDestroy(): Promise<void> {
    this.logger.log('Initiating Prisma graceful shutdown...');
    
    try {
      // Set a timeout to prevent hanging during shutdown
      const timeoutPromise = new Promise<void>((_, reject) => {
        const timeoutId = setTimeout(() => {
          clearTimeout(timeoutId);
          reject(new Error('Prisma shutdown timeout after 5 seconds'));
        }, 5000);
      });

      // Race between successful disconnect and timeout
      await Promise.race([
        this.prismaService.onModuleDestroy(),
        timeoutPromise,
      ]);

      this.logger.log('Prisma disconnected successfully');
    } catch (error) {
      // Log the error but don't throw to prevent application crash during shutdown
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Prisma shutdown error: ${errorMessage}`);
      
      // In production, you might want to send this to a monitoring service
      if (env.NODE_ENV === 'production') {
        // You could integrate with your error tracking service here
        // e.g., Sentry.captureException(error);
      }
    }
  }
}

// ============================================================
// Type Exports
// ============================================================

export { PrismaService };
export type { PrismaServiceOptions };
