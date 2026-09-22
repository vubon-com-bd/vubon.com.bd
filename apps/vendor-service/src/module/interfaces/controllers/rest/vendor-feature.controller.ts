import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { GetVendorQuery } from '../../../application/queries/vendor';

@ApiTags('Vendor Features')
@ApiBearerAuth()
@Controller('vendors/features')
@UseGuards(JwtAuthGuard)
export class VendorFeatureController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':vendorId')
  async list(@Param('vendorId') vendorId: string): Promise<unknown> {
    return this.queryBus.execute(new GetVendorQuery(vendorId));
  }
}
