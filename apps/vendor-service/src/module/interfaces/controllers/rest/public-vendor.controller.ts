import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces';
import { GetVendorBySlugQuery } from '../../../application/queries/vendor';
import { ListVendorsQuery } from '../../../application/queries/vendor';

@ApiTags('Public Vendors')
@Controller('public/vendors')
export class PublicVendorController {
  constructor(private readonly queryBus: QueryBus) {}

  @Public()
  @Get()
  async list(@Query() query: Record<string, string>): Promise<unknown> {
    return this.queryBus.execute(new ListVendorsQuery(1, 20, query));
  }

  @Public()
  @Get(':slug')
  async getBySlug(@Param('slug') slug: string): Promise<unknown> {
    return this.queryBus.execute(new GetVendorBySlugQuery(slug));
  }
}
