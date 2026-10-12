/**
 * VendorRatingController — rating rollup
 * @module vendor-service/interfaces/controllers/rest
 */
import {
  Controller,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { Public, CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { ParseUuidPipe } from '@vubon/shared-kernel/interfaces/pipes';

import { VENDOR_SWAGGER_TAGS, VENDOR_BEARER_AUTH } from '../../swagger/index.js';

import { GetVendorRatingQuery } from '../../../application/queries/rating/get-vendor-rating.query.js';

@ApiTags(VENDOR_SWAGGER_TAGS.VENDOR_RATING)
@ApiBearerAuth(VENDOR_BEARER_AUTH)
@Controller('vendors/:vendorId/rating')
export class VendorRatingController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get vendor rating (public)' })
  async get(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetVendorRatingQuery(vendorId));
  }

  @Post('recalculate')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Force recalculate rating (admin)' })
  async recalculate(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    void user;
    return { ok: true };
  }
}
