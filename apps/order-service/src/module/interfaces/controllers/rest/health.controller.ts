/**
 * HealthController — DB_MODE-aware
 * @module order-service/interfaces/controllers/rest
 */
import { Controller, Get, Optional, Inject } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import { OrderPrismaService } from '../../../infrastructure/persistence/prisma/prisma.service.js';
import { IS_MEMORY_MODE } from '../../../infrastructure/config/db-mode.config.js';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    @Optional()
    @Inject(OrderPrismaService)
    private readonly prisma?: OrderPrismaService,
  ) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Service health check' })
  async check(): Promise<{
    readonly service: string;
    readonly healthy: boolean;
    readonly mode: 'memory' | 'prisma';
    readonly timestamp: string;
    readonly dependencies: readonly {
      readonly name: string;
      readonly healthy: boolean;
      readonly message?: string;
    }[];
  }> {
    const deps: { name: string; healthy: boolean; message?: string }[] = [];

    if (IS_MEMORY_MODE) {
      deps.push({
        name: 'database',
        healthy: true,
        message: 'In-memory repositories (DB_MODE=memory)',
      });
    } else if (this.prisma) {
      try {
        const ok = this.prisma.isEngineAvailable()
          ? await this.prisma.isHealthy()
          : false;
        deps.push({
          name: 'database',
          healthy: ok,
          message: ok ? undefined : 'Prisma engine unavailable',
        });
      } catch (err) {
        deps.push({
          name: 'database',
          healthy: false,
          message: err instanceof Error ? err.message : 'unknown',
        });
      }
    } else {
      deps.push({ name: 'database', healthy: true, message: 'Memory mode' });
    }

    return {
      service: 'order-service',
      healthy: deps.every((d) => d.healthy),
      mode: IS_MEMORY_MODE ? 'memory' : 'prisma',
      timestamp: new Date().toISOString(),
      dependencies: deps,
    };
  }
}
