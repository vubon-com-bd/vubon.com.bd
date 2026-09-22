import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { GetPerformanceQuery } from '../../../application/queries/performance';
import { GetPerformanceStatsQuery } from '../../../application/queries/performance';

@ApiTags('Vendor Performance')
@ApiBearerAuth()
@Controller('vendors/performance')
@UseGuards(JwtAuthGuard)
export class VendorPerformanceController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':vendorId')
  async get(@Param('vendorId') vendorId: string): Promise<unknown> {
    return this.queryBus.execute(new GetPerformanceQuery(vendorId));
  }

  @Get(':vendorId/stats')
  async stats(@Param('vendorId') vendorId: string): Promise<unknown> {
    return this.queryBus.execute(new GetPerformanceStatsQuery(vendorId));
  }
}
