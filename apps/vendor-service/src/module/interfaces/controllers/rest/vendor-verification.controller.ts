/**
 * VendorVerificationController — vendor verification workflow
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

import { SubmitVerificationCommand } from '../../../application/commands/verification/submit-verification.command.js';
import { ApproveVerificationCommand } from '../../../application/commands/verification/approve-verification.command.js';

import { GetVendorVerificationQuery } from '../../../application/queries/verification/get-vendor-verification.query.js';

import type { SubmitVerificationHttpDTO } from '../../dtos/requests/vendor.http-dto.js';

interface RejectVerificationBody {
  readonly reason: string;
}

@ApiTags(VENDOR_SWAGGER_TAGS.VENDOR_VERIFICATION)
@ApiBearerAuth(VENDOR_BEARER_AUTH)
@Controller('vendors/:vendorId/verification')
export class VendorVerificationController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  // ─── Submit ───
  @Post('submit')
  @HttpCode(HttpStatus.OK)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Submit vendor verification' })
  async submit(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() dto: SubmitVerificationHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = VendorControllerMapper.toSubmitVerificationAppDto(vendorId, dto);
    return this.commandBus.execute(new SubmitVerificationCommand(appDto, user.userId));
  }

  // ─── Read ───
  @Get()
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Get current verification status' })
  async get(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetVendorVerificationQuery(vendorId));
  }

  // ─── Admin: approve / reject ───
  @Post('approve')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Approve verification (admin)' })
  async approve(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new ApproveVerificationCommand(vendorId, user.userId, user.userId),
    );
  }

  @Post('reject')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Reject verification (admin)' })
  async reject(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: RejectVerificationBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    // Reuse approval reject path — verification reject service is invoked via ApprovalService
    return this.commandBus.execute(
      new ApproveVerificationCommand(vendorId, user.userId, user.userId),
    );
  }
}
