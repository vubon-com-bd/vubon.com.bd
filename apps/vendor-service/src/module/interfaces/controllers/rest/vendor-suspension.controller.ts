/**
 * VendorSuspensionController — suspension lifecycle
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

import { SuspendVendorCommand } from '../../../application/commands/lifecycle/suspend-vendor.command.js';
import { ReinstateVendorCommand } from '../../../application/commands/lifecycle/reinstate-vendor.command.js';

import { GetSuspensionQuery } from '../../../application/queries/vendor/get-suspension.query.js';
import { GetActiveSuspensionQuery } from '../../../application/queries/vendor/get-active-suspension.query.js';
import { ListSuspensionsQuery } from '../../../application/queries/vendor/list-suspensions.query.js';

import type {
  SuspendVendorHttpDTO,
  ReinstateVendorHttpDTO,
  AppealSuspensionHttpDTO,
} from '../../dtos/requests/vendor.http-dto.js';

@ApiTags(VENDOR_SWAGGER_TAGS.VENDOR_SUSPENSION)
@ApiBearerAuth(VENDOR_BEARER_AUTH)
@Controller('vendors/:vendorId/suspensions')
export class VendorSuspensionController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  // ─── Admin: suspend ───
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Suspend vendor (admin)' })
  async suspend(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() dto: SuspendVendorHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = VendorControllerMapper.toSuspendAppDto(vendorId, dto, user.userId);
    return this.commandBus.execute(new SuspendVendorCommand(appDto, user.userId));
  }

  // ─── Admin: lift ───
  @Post(':suspensionId/lift')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Lift suspension (admin)' })
  async lift(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() dto: ReinstateVendorHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = VendorControllerMapper.toReinstateAppDto(vendorId, dto, user.userId);
    return this.commandBus.execute(new ReinstateVendorCommand(appDto, user.userId));
  }

  // ─── Vendor: appeal ───
  @Post(':suspensionId/appeal')
  @HttpCode(HttpStatus.OK)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'File an appeal against suspension' })
  async appeal(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Param('suspensionId', ParseUuidPipe) suspensionId: string,
    @Body() dto: AppealSuspensionHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    // The appeal command is dispatched via VendorSuspensionService — placeholder
    void suspensionId;
    void dto;
    void user;
    void vendorId;
    return { ok: true };
  }

  // ─── Read ───
  @Get()
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'List all suspensions for a vendor' })
  async list(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new ListSuspensionsQuery(vendorId));
  }

  @Get('active')
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Get active suspension for a vendor' })
  async getActive(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetActiveSuspensionQuery(vendorId));
  }

  @Get(':suspensionId')
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Get suspension by id' })
  async getById(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('suspensionId', ParseUuidPipe) suspensionId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetSuspensionQuery(suspensionId));
  }
}
