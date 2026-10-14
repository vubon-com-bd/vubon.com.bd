/**
 * VendorApprovalController — REST endpoints (stub for API surface)
 * @module vendor-service/interfaces/controllers/rest
 *
 * TODO: Wire up specific commands/queries for approval.
 */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

@ApiTags('vendor-approval')
@ApiBearerAuth('bearer')
@Controller('vendors/:vendorId/approvals')
@UseGuards(JwtAuthGuard)
export class VendorApprovalController extends BaseController {
  @Get()
  @ApiOperation({ summary: 'List approvals' })
  async list(@Param('vendorId') _vendorId: string): Promise<{ readonly items: readonly unknown[] }> {
    return { items: [] };
  }
}
