/**
 * VendorApprovalController — vendor approval workflow
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
import { VendorControllerMapper } from '../../mappers/vendor.controller.mapper.js';

import { ApproveVendorApprovalCommand } from '../../../application/commands/approval/approve-vendor-approval.command.js';
import { RejectVendorApprovalCommand } from '../../../application/commands/approval/reject-vendor-approval.command.js';
import { ResubmitApprovalCommand } from '../../../application/commands/approval/resubmit-approval.command.js';

import { GetVendorApprovalQuery } from '../../../application/queries/approval/get-vendor-approval.query.js';

import type {
  ApproveVendorHttpDTO,
  RejectVendorHttpDTO,
} from '../../dtos/requests/vendor.http-dto.js';

interface RequestInfoBody {
  readonly note: string;
}

@ApiTags(VENDOR_SWAGGER_TAGS.VENDOR_APPROVAL)
@ApiBearerAuth(VENDOR_BEARER_AUTH)
@Controller('vendors/:vendorId/approval')
export class VendorApprovalController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  // ─── Read ───
  @Get()
  @ApiOperation({ summary: 'Get vendor approval status' })
  async get(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetVendorApprovalQuery(vendorId));
  }

  // ─── Admin: approve / reject / request-info ───
  @Post('approve')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Approve vendor (admin)' })
  async approve(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() dto: ApproveVendorHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = VendorControllerMapper.toApproveAppDto(vendorId, dto, user.userId);
    return this.commandBus.execute(new ApproveVendorApprovalCommand(appDto, user.userId));
  }

  @Post('reject')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Reject vendor (admin)' })
  async reject(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() dto: RejectVendorHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = VendorControllerMapper.toRejectAppDto(vendorId, dto, user.userId);
    return this.commandBus.execute(new RejectVendorApprovalCommand(appDto, user.userId));
  }

  @Post('request-info')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Request more info (admin)' })
  async requestInfo(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Body() _body: RequestInfoBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    // Handled by application service; placeholder for route
    void user;
    return { ok: true };
  }

  // ─── Vendor: resubmit ───
  @Post('resubmit')
  @HttpCode(HttpStatus.OK)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Resubmit vendor approval' })
  async resubmit(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(new ResubmitApprovalCommand(vendorId, user.userId));
  }
}
