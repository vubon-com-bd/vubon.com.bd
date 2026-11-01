/**
 * HealthController — service health endpoint
 * @module product-service/interfaces/controllers/rest
 */
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @Public()
  @ApiOperation({ summary: 'Service health check' })
  check(): {
    readonly service: string;
    readonly status: string;
    readonly timestamp: string;
  } {
    return {
      service: 'product-service',
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
