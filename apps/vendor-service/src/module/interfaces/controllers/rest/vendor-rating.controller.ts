import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { GetReviewStatsQuery } from '../../../application/queries/review';

@ApiTags('Vendor Ratings')
@ApiBearerAuth()
@Controller('vendors/ratings')
@UseGuards(JwtAuthGuard)
export class VendorRatingController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':vendorId')
  async get(@Param('vendorId') vendorId: string): Promise<unknown> {
    return this.queryBus.execute(new GetReviewStatsQuery(vendorId));
  }
}
