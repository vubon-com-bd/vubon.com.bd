/**
 * VendorPerformanceController — REST endpoints (stub for API surface)
 * @module vendor-service/interfaces/controllers/rest
 *
 * TODO: Wire up specific commands/queries for performance.
 */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

@ApiTags('vendor-performance')
@ApiBearerAuth('bearer')
@Controller('vendors/:vendorId/performances')
@UseGuards(JwtAuthGuard)
export class VendorPerformanceController extends BaseController {
  @Get()
  @ApiOperation({ summary: 'List performances' })
  async list(@Param('vendorId') _vendorId: string): Promise<{ readonly items: readonly unknown[] }> {
    return { items: [] };
  }
}
