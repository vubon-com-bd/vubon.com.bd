import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import { CartHealthService } from '../../infrastructure/health/health.service.js';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly health: CartHealthService) {}

  @Get()
  @Public()
  async check() {
    return this.health.check();
  }
}
