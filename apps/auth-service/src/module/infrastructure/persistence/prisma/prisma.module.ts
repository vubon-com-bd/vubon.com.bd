/**
 * ============================================================================
 * Vubon.com.bd - Prisma Module (NestJS Infrastructure)
 * ============================================================================
 * Registers the Prisma service as a global module for database access across the auth service.
 */

import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: 'PRISMA_SERVICE',
      useClass: PrismaService,
    },
  ],
  exports: [PrismaService, 'PRISMA_SERVICE'],
})
export class PrismaModule {
  /**
   * Configure Prisma module with options
   */
  public static forRoot(): PrismaModule {
    return new PrismaModule();
  }

  /**
   * Configure Prisma module with async options
   */
  public static forRootAsync(): PrismaModule {
    return new PrismaModule();
  }
}

export default PrismaModule;
