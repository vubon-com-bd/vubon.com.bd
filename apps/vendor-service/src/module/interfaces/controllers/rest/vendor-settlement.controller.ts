/**
 * VendorSettlementController — settlement lifecycle
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

import { CreateSettlementCommand } from '../../../application/commands/payout/create-settlement.command.js';
import { CompleteSettlementCommand } from '../../../application/commands/payout/complete-settlement.command.js';

import { GetSettlementQuery } from '../../../application/queries/settlement/get-settlement.query.js';
import { ListSettlementsByVendorQuery } from '../../../application/queries/settlement/list-settlements-by-vendor.query.js';

import type { CreateSettlementRequestDto } from '../../../application/dtos/requests/create-settlement.dto.js';
import type { CompleteSettlementRequestDto } from '../../../application/dtos/requests/complete-settlement.dto.js';

interface CreateSettlementBody {
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly grossAmount: number;
  readonly commissionAmount: number;
  readonly netAmount: number;
  readonly currency: string;
  readonly orderCount: number;
  readonly orderIds?: readonly string[];
  readonly idempotencyKey?: string;
}

interface CompleteSettlementBody {
  readonly payoutId: string;
}

@ApiTags(VENDOR_SWAGGER_TAGS.VENDOR_SETTLEMENT)
@ApiBearerAuth(VENDOR_BEARER_AUTH)
@Controller('vendors/:vendorId/settlements')
export class VendorSettlementController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  // ─── Admin: create ───
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create a settlement (admin)' })
  async create(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: CreateSettlementBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: CreateSettlementRequestDto = {
      vendorId,
      periodStart: body.periodStart,
      periodEnd: body.periodEnd,
      grossAmount: body.grossAmount,
      commissionAmount: body.commissionAmount,
      netAmount: body.netAmount,
      currency: body.currency,
      orderCount: body.orderCount,
      orderIds: body.orderIds,
      idempotencyKey: body.idempotencyKey,
    };
    return this.commandBus.execute(new CreateSettlementCommand(dto, user.userId));
  }

  // ─── Admin: complete ───
  @Post(':settlementId/complete')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Complete a settlement (admin)' })
  async complete(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('settlementId', ParseUuidPipe) settlementId: string,
    @Body() body: CompleteSettlementBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: CompleteSettlementRequestDto = {
      settlementId,
      payoutId: body.payoutId,
      completedBy: user.userId,
    };
    return this.commandBus.execute(new CompleteSettlementCommand(dto, user.userId));
  }

  // ─── Read ───
  @Get()
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'List settlements for vendor' })
  async list(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new ListSettlementsByVendorQuery(vendorId));
  }

  @Get(':settlementId')
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Get settlement by id' })
  async getById(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('settlementId', ParseUuidPipe) settlementId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetSettlementQuery(settlementId));
  }
}
