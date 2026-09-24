import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Public()
  @Get()
  check(): { status: string; timestamp: string } {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
