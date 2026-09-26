import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard, Permissions } from '@vubon/shared-kernel/interfaces';
import { LOGISTICS_PERMISSION } from '@vubon/shared-constants/logistics';
import { ListPackagingQuery } from '../../../application/queries/packaging/list-packaging.query';

@Controller('logistics/packaging')
@UseGuards(JwtAuthGuard)
export class PackagingController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @Permissions(LOGISTICS_PERMISSION.PACKAGING_VIEW)
  async list(@Query('type') packagingType?: string): Promise<unknown> {
    return this.queryBus.execute(new ListPackagingQuery(packagingType));
  }
}
