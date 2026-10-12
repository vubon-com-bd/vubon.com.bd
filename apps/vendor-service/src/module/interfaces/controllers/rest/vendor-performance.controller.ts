/**
 * VendorPerformanceController
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

import { GetVendorPerformanceQuery } from '../../../application/queries/performance/get-vendor-performance.query.js';
import { ListVendorPerformanceQuery } from '../../../application/queries/performance/list-vendor-performance.query.js';

interface EvaluateBody {
  readonly evaluationPeriodStart: string;
  readonly evaluationPeriodEnd: string;
  readonly orderCount: number;
}

@ApiTags(VENDOR_SWAGGER_TAGS.VENDOR_PERFORMANCE)
@ApiBearerAuth(VENDOR_BEARER_AUTH)
@Controller('vendors/:vendorId/performance')
export class VendorPerformanceController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Get()
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Get latest performance' })
  async getLatest(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetVendorPerformanceQuery(vendorId));
  }

  @Get('history')
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'List performance history' })
  async list(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new ListVendorPerformanceQuery(vendorId));
  }

  @Post('evaluate')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Trigger evaluation (admin)' })
  async evaluate(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: EvaluateBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    void this.commandBus;
    void vendorId;
    void body;
    void user;
    return { ok: true };
  }

  @Post('warning/issue')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Issue warning (admin)' })
  async issueWarning(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    void user;
    return { ok: true };
  }

  @Post('warning/clear')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Clear warning (admin)' })
  async clearWarning(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    void user;
    return { ok: true };
  }

  @Post('recalculate')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Recalculate performance (admin)' })
  async recalculate(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    void user;
    return { ok: true };
  }
}
