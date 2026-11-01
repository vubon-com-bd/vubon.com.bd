/**
 * HealthController — liveness/readiness probes
 * @module logistics-service/interfaces/controllers/rest
 */
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @HttpCode(HttpStatus.OK)
  check(): {
    readonly status: 'ok';
    readonly service: 'logistics';
    readonly timestamp: string;
    readonly uptime: number;
  } {
    return {
      status: 'ok',
      service: 'logistics',
      timestamp: new Date().toISOString(),
      uptime: Math.round(process.uptime()),
    };
  }

  @Get('ready')
  @HttpCode(HttpStatus.OK)
  ready(): { readonly status: 'ready' } {
    return { status: 'ready' };
  }
}
