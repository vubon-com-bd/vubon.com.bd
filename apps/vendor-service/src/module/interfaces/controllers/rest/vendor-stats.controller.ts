/**
 * VendorStatsController
 * @module vendor-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { ParseUuidPipe } from '@vubon/shared-kernel/interfaces/pipes';

import { VENDOR_SWAGGER_TAGS, VENDOR_BEARER_AUTH } from '../../swagger/index.js';
import { VendorOwnerGuard } from '../../guards/vendor-owner.guard.js';
import { VendorOwner } from '../../decorators/vendor-owner.decorator.js';

import { InitializeStatsPeriodCommand } from '../../../application/commands/stats/initialize-stats-period.command.js';
import { RecordOrderStatsCommand } from '../../../application/commands/stats/record-order-stats.command.js';

import { GetLatestVendorStatsQuery } from '../../../application/queries/stats/get-latest-vendor-stats.query.js';

interface InitializeStatsBody {
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly currency: string;
}

interface RecordOrderBody {
  readonly amount: number;
}

@ApiTags(VENDOR_SWAGGER_TAGS.VENDOR_STATS)
@ApiBearerAuth(VENDOR_BEARER_AUTH)
@Controller('vendors/:vendorId/stats')
export class VendorStatsController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Get()
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Get latest stats' })
  async getLatest(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetLatestVendorStatsQuery(vendorId));
  }

  @Post('period')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Initialize stats period (admin)' })
  async initialize(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: InitializeStatsBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new InitializeStatsPeriodCommand(
        vendorId,
        body.periodStart,
        body.periodEnd,
        body.currency,
        user.userId,
      ),
    );
  }

  @Post('record-order')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Record an order in stats (admin/internal)' })
  async recordOrder(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: RecordOrderBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new RecordOrderStatsCommand(vendorId, body.amount, user.userId),
    );
  }
}
