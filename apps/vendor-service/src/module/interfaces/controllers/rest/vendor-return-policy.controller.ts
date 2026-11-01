/**
 * VendorReturnPolicyController — REST endpoints (stub for API surface)
 * @module vendor-service/interfaces/controllers/rest
 *
 * TODO: Wire up specific commands/queries for return-policy.
 */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

@ApiTags('vendor-return-policy')
@ApiBearerAuth('bearer')
@Controller('vendors/:vendorId/return-policies')
@UseGuards(JwtAuthGuard)
export class VendorReturnPolicyController extends BaseController {
  @Get()
  @ApiOperation({ summary: 'List return-policys' })
  async list(@Param('vendorId') _vendorId: string): Promise<{ readonly items: readonly unknown[] }> {
    return { items: [] };
  }
}
