import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Permissions } from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { GetVendorQuery } from '../../../application/queries/vendor';

@ApiTags('Vendor Addresses')
@ApiBearerAuth()
@Controller('vendors/addresses')
@UseGuards(JwtAuthGuard)
export class VendorAddressController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':vendorId')
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async list(@Param('vendorId') vendorId: string): Promise<unknown> {
    return this.queryBus.execute(new GetVendorQuery(vendorId));
  }
}
