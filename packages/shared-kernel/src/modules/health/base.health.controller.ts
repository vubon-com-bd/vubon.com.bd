import { Controller, Get, Query, Logger } from '@nestjs/common';
import { HealthService } from './base.health';

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(private readonly healthService: HealthService) {}

  @Get()
  check() {
    return this.healthService.check();
  }

  @Get('details')
  checkDetailed() {
    return this.healthService.getDetailedHealth();
  }

  @Get('database')
  checkDatabase(@Query('latency') latency?: string) {
    const result = this.healthService.checkDatabase();
    if (latency) {
      this.logger.debug(`Latency check requested with threshold: ${latency}ms`);
    }
    return result;
  }

  @Get('redis')
  checkRedis(@Query('latency') latency?: string) {
    const result = this.healthService.checkRedis();
    if (latency) {
      this.logger.debug(`Latency check requested with threshold: ${latency}ms`);
    }
    return result;
  }

  @Get('queue')
  checkQueue(@Query('details') details?: string) {
    const result = this.healthService.checkQueue();
    if (details) {
      this.logger.debug(`Queue details requested: ${details}`);
    }
    return result;
  }
}
