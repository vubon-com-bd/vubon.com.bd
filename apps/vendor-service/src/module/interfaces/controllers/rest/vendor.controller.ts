/**
 * VendorController — vendor aggregate management
 * @module vendor-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard, RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { ParseUuidPipe } from '@vubon/shared-kernel/interfaces/pipes';

import { VENDOR_SWAGGER_TAGS, VENDOR_BEARER_AUTH } from '../../swagger/index.js';
import { VendorOwnerGuard } from '../../guards/vendor-owner.guard.js';
import { VendorOwner } from '../../decorators/vendor-owner.decorator.js';
import { IdempotencyKey } from '../../decorators/idempotency-key.decorator.js';
import { VendorControllerMapper } from '../../mappers/vendor.controller.mapper.js';

// Commands
import { RegisterVendorCommand } from '../../../application/commands/vendor/register-vendor.command.js';
import { UpdateVendorCommand } from '../../../application/commands/vendor/update-vendor.command.js';
import { UpdateVendorProfileCommand } from '../../../application/commands/vendor/update-vendor-profile.command.js';
import { UpdateVendorBusinessCommand } from '../../../application/commands/vendor/update-vendor-business.command.js';
import { ApproveVendorCommand } from '../../../application/commands/vendor/approve-vendor.command.js';
import { RejectVendorCommand } from '../../../application/commands/vendor/reject-vendor.command.js';
import { DeleteVendorCommand } from '../../../application/commands/vendor/delete-vendor.command.js';
import { ActivateVendorCommand } from '../../../application/commands/lifecycle/activate-vendor.command.js';
import { DeactivateVendorCommand } from '../../../application/commands/lifecycle/deactivate-vendor.command.js';
import { SuspendVendorCommand } from '../../../application/commands/lifecycle/suspend-vendor.command.js';
import { ReinstateVendorCommand } from '../../../application/commands/lifecycle/reinstate-vendor.command.js';

// Queries
import { GetVendorQuery } from '../../../application/queries/vendor/get-vendor.query.js';
import { GetVendorSummaryQuery } from '../../../application/queries/vendor/get-vendor-summary.query.js';
import { GetVendorStatsQuery } from '../../../application/queries/vendor/get-vendor-stats.query.js';
import { ListVendorsQuery } from '../../../application/queries/vendor/list-vendors.query.js';
import { CheckVendorSlugQuery } from '../../../application/queries/vendor/check-vendor-slug.query.js';
import { SuggestVendorSlugQuery } from '../../../application/queries/vendor/suggest-vendor-slug.query.js';

// HTTP DTOs
import type {
  RegisterVendorHttpDTO,
  UpdateVendorHttpDTO,
  UpdateVendorProfileHttpDTO,
  UpdateVendorBusinessHttpDTO,
  ActivateVendorHttpDTO,
  DeactivateVendorHttpDTO,
  SuspendVendorHttpDTO,
  ReinstateVendorHttpDTO,
  ApproveVendorHttpDTO,
  RejectVendorHttpDTO,
  ListVendorsHttpQueryDTO,
} from '../../dtos/requests/vendor.http-dto.js';

@ApiTags(VENDOR_SWAGGER_TAGS.VENDORS)
@ApiBearerAuth(VENDOR_BEARER_AUTH)
@Controller('vendors')
export class VendorController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  // ═══════════════ Registration ═══════════════
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new vendor' })
  async register(
    @Body() dto: RegisterVendorHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = VendorControllerMapper.toRegisterAppDto(dto, user.userId);
    return this.commandBus.execute(new RegisterVendorCommand(appDto, user.userId));
  }

  // ═══════════════ List / Search ═══════════════
  @Get()
  @ApiOperation({ summary: 'List vendors (paginated)' })
  async list(@Query() q: ListVendorsHttpQueryDTO): Promise<unknown> {
    return this.queryBus.execute(new ListVendorsQuery(VendorControllerMapper.toListOptions(q)));
  }

  @Get('slug/check')
  @ApiOperation({ summary: 'Check slug availability' })
  async checkSlug(@Query('slug') slug: string): Promise<unknown> {
    return this.queryBus.execute(new CheckVendorSlugQuery(slug));
  }

  @Get('slug/suggest')
  @ApiOperation({ summary: 'Suggest a slug based on name' })
  async suggestSlug(@Query('name') name: string): Promise<unknown> {
    return this.queryBus.execute(new SuggestVendorSlugQuery(name));
  }

  // ═══════════════ Read ═══════════════
  @Get(':vendorId')
  @ApiOperation({ summary: 'Get vendor by id' })
  async getById(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetVendorQuery(vendorId));
  }

  @Get(':vendorId/summary')
  @ApiOperation({ summary: 'Get vendor summary' })
  async getSummary(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetVendorSummaryQuery(vendorId));
  }

  @Get(':vendorId/stats')
  @ApiOperation({ summary: 'Get vendor statistics' })
  async getStats(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetVendorStatsQuery(vendorId));
  }

  // ═══════════════ Update ═══════════════
  @Patch(':vendorId')
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Update vendor profile fields' })
  async update(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() dto: UpdateVendorHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = VendorControllerMapper.toUpdateAppDto(vendorId, dto);
    return this.commandBus.execute(new UpdateVendorCommand(appDto, user.userId));
  }

  @Patch(':vendorId/profile')
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Update vendor public profile' })
  async updateProfile(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() dto: UpdateVendorProfileHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = VendorControllerMapper.toUpdateProfileAppDto(vendorId, dto);
    return this.commandBus.execute(new UpdateVendorProfileCommand(appDto, user.userId));
  }

  @Patch(':vendorId/business')
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Update vendor legal/business info' })
  async updateBusiness(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() dto: UpdateVendorBusinessHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = VendorControllerMapper.toUpdateBusinessAppDto(vendorId, dto);
    return this.commandBus.execute(new UpdateVendorBusinessCommand(appDto, user.userId));
  }

  // ═══════════════ Lifecycle ═══════════════
  @Post(':vendorId/activate')
  @HttpCode(HttpStatus.OK)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Activate vendor' })
  async activate(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() dto: ActivateVendorHttpDTO,
    @CurrentUser() user: CurrentUserShape,
    @IdempotencyKey() idempotencyKey?: string,
  ): Promise<unknown> {
    const appDto = VendorControllerMapper.toActivateAppDto(vendorId, {
      ...dto,
      activatedBy: dto.activatedBy ?? user.userId,
      idempotencyKey: dto.idempotencyKey ?? idempotencyKey,
    });
    return this.commandBus.execute(new ActivateVendorCommand(appDto, user.userId));
  }

  @Post(':vendorId/deactivate')
  @HttpCode(HttpStatus.OK)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Deactivate vendor' })
  async deactivate(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() dto: DeactivateVendorHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = VendorControllerMapper.toDeactivateAppDto(vendorId, dto);
    return this.commandBus.execute(new DeactivateVendorCommand(appDto, user.userId));
  }

  // ═══════════════ Suspension (admin) ═══════════════
  @Post(':vendorId/suspend')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Suspend a vendor (admin)' })
  async suspend(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() dto: SuspendVendorHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = VendorControllerMapper.toSuspendAppDto(vendorId, dto, user.userId);
    return this.commandBus.execute(new SuspendVendorCommand(appDto, user.userId));
  }

  @Post(':vendorId/reinstate')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Lift vendor suspension (admin)' })
  async reinstate(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() dto: ReinstateVendorHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = VendorControllerMapper.toReinstateAppDto(vendorId, dto, user.userId);
    return this.commandBus.execute(new ReinstateVendorCommand(appDto, user.userId));
  }

  // ═══════════════ Approval (admin) ═══════════════
  @Post(':vendorId/approve')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Approve a vendor (admin)' })
  async approve(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() dto: ApproveVendorHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = VendorControllerMapper.toApproveAppDto(vendorId, dto, user.userId);
    return this.commandBus.execute(new ApproveVendorCommand(appDto, user.userId));
  }

  @Post(':vendorId/reject')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Reject a vendor (admin)' })
  async reject(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() dto: RejectVendorHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = VendorControllerMapper.toRejectAppDto(vendorId, dto, user.userId);
    return this.commandBus.execute(new RejectVendorCommand(appDto, user.userId));
  }

  // ═══════════════ Delete (soft) ═══════════════
  @Delete(':vendorId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Soft-delete vendor' })
  async remove(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Query('reason') reason: string | undefined,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    return this.commandBus.execute(
      new DeleteVendorCommand({ vendorId, reason }, user.userId),
    );
  }
}
