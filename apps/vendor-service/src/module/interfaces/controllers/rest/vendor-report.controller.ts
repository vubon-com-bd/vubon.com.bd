/**
 * VendorReportController
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

import { RequestReportCommand } from '../../../application/commands/report/request-report.command.js';
import { MarkReportReadyCommand } from '../../../application/commands/report/mark-report-ready.command.js';
import { MarkReportFailedCommand } from '../../../application/commands/report/mark-report-failed.command.js';

import { GetVendorReportQuery } from '../../../application/queries/report/get-vendor-report.query.js';
import { ListVendorReportsQuery } from '../../../application/queries/report/list-vendor-reports.query.js';

interface RequestReportBody {
  readonly type: string;
  readonly format: string;
  readonly period: string;
  readonly periodStart: string;
  readonly periodEnd: string;
}

interface MarkReadyBody {
  readonly fileUrl: string;
  readonly fileSize: number;
}

interface MarkFailedBody {
  readonly reason: string;
}

@ApiTags(VENDOR_SWAGGER_TAGS.VENDOR_REPORT)
@ApiBearerAuth(VENDOR_BEARER_AUTH)
@Controller('vendors/:vendorId/reports')
export class VendorReportController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  // ─── Request report ───
  @Post('request')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Request a report' })
  async request(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: RequestReportBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new RequestReportCommand({
        vendorId,
        type: body.type,
        format: body.format,
        period: body.period,
        periodStart: body.periodStart,
        periodEnd: body.periodEnd,
      }, user.userId, user.userId),
    );
  }

  // ─── Admin: mark ready / failed ───
  @Post(':reportId/ready')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Mark report ready (admin)' })
  async markReady(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('reportId', ParseUuidPipe) reportId: string,
    @Body() body: MarkReadyBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new MarkReportReadyCommand(reportId, body.fileUrl, body.fileSize, user.userId),
    );
  }

  @Post(':reportId/fail')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Mark report failed (admin)' })
  async markFailed(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('reportId', ParseUuidPipe) reportId: string,
    @Body() body: MarkFailedBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new MarkReportFailedCommand(reportId, body.reason, user.userId),
    );
  }

  // ─── Read ───
  @Get()
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'List reports for vendor' })
  async list(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new ListVendorReportsQuery(vendorId));
  }

  @Get(':reportId')
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Get report by id' })
  async getById(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('reportId') reportId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetVendorReportQuery(reportId));
  }
}
