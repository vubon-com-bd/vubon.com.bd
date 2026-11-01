/**
 * VendorShippingController — REST endpoints (stub for API surface)
 * @module vendor-service/interfaces/controllers/rest
 *
 * TODO: Wire up specific commands/queries for shipping.
 */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

@ApiTags('vendor-shipping')
@ApiBearerAuth('bearer')
@Controller('vendors/:vendorId/shipping')
@UseGuards(JwtAuthGuard)
export class VendorShippingController extends BaseController {
  @Get()
  @ApiOperation({ summary: 'List shippings' })
  async list(@Param('vendorId') _vendorId: string): Promise<{ readonly items: readonly unknown[] }> {
    return { items: [] };
  }
}
