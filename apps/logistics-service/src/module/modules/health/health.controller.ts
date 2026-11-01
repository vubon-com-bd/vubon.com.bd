/**
 * Health Controller
 * @module logistics-service/modules/health
 *
 * Pattern 2 Commandment 13 — mandatory health check
 */
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Service health check' })
  check(): {
    status: 'ok';
    service: string;
    version: string;
    timestamp: string;
    uptime: number;
  } {
    return {
      status: 'ok',
      service: 'logistics',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
    };
  }
}
