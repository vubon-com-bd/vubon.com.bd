/**
 * HealthController — service health endpoint
 * @module cart-service/interfaces/controllers/rest
 */
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import { CartPrismaService } from '../../../infrastructure/persistence/prisma/prisma.service.js';

interface DependencyHealth {
  readonly name: string;
  readonly healthy: boolean;
  readonly message?: string;
}

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly prisma: CartPrismaService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Service health check' })
  async check(): Promise<{
    readonly service: string;
    readonly healthy: boolean;
    readonly timestamp: string;
    readonly dependencies: readonly DependencyHealth[];
  }> {
    const dependencies: DependencyHealth[] = [];

    try {
      const dbHealthy = await this.prisma.isHealthy();
      dependencies.push({
        name: 'database',
        healthy: dbHealthy,
        message: dbHealthy ? undefined : 'DB check failed',
      });
    } catch (err) {
      dependencies.push({
        name: 'database',
        healthy: false,
        message: err instanceof Error ? err.message : 'unknown',
      });
    }

    return {
      service: 'cart-service',
      healthy: dependencies.every((d) => d.healthy),
      timestamp: new Date().toISOString(),
      dependencies,
    };
  }
}
