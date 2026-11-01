/**
 * HealthController
 * @module payment-service/interfaces/controllers/rest
 */
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import { PaymentPrismaService } from '@infrastructure/persistence/prisma/prisma.service';

interface DependencyHealth {
  readonly name: string;
  readonly healthy: boolean;
  readonly message?: string;
}

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PaymentPrismaService) {}

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
      service: 'payment-service',
      healthy: dependencies.every((d) => d.healthy),
      timestamp: new Date().toISOString(),
      dependencies,
    };
  }

  @Get('ready')
  @Public()
  @ApiOperation({ summary: 'Readiness check' })
  async ready(): Promise<{ readonly ready: boolean }> {
    try {
      const dbHealthy = await this.prisma.isHealthy();
      return { ready: dbHealthy };
    } catch {
      return { ready: false };
    }
  }
}
