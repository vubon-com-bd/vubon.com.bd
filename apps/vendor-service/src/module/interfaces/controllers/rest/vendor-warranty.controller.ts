/**
 * VendorWarrantyController — REST endpoints (stub for API surface)
 * @module vendor-service/interfaces/controllers/rest
 *
 * TODO: Wire up specific commands/queries for warranty.
 */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

@ApiTags('vendor-warranty')
@ApiBearerAuth('bearer')
@Controller('vendors/:vendorId/warranties')
@UseGuards(JwtAuthGuard)
export class VendorWarrantyController extends BaseController {
  @Get()
  @ApiOperation({ summary: 'List warrantys' })
  async list(@Param('vendorId') _vendorId: string): Promise<{ readonly items: readonly unknown[] }> {
    return { items: [] };
  }
}
