/**
 * VendorCommissionController — commission configuration
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

import { ConfigureCommissionCommand } from '../../../application/commands/commission/configure-commission.command.js';
import { CalculateCommissionCommand } from '../../../application/commands/commission/calculate-commission.command.js';

import { GetActiveCommissionQuery } from '../../../application/queries/commission/get-active-commission.query.js';

import type { ConfigureCommissionRequestDto } from '../../../application/dtos/requests/configure-commission.dto.js';
import type { CalculateCommissionRequestDto } from '../../../application/dtos/requests/calculate-commission.dto.js';

interface ConfigureCommissionBody {
  readonly type: string;
  readonly percent: number;
  readonly fixedAmount?: number;
  readonly currency: string;
  readonly applyOnShipping: boolean;
  readonly applyOnTax: boolean;
  readonly effectiveFrom?: string;
  readonly effectiveTo?: string;
  readonly idempotencyKey?: string;
}

interface CalculateCommissionBody {
  readonly orderAmount: number;
  readonly currency: string;
  readonly shippingAmount?: number;
  readonly taxAmount?: number;
}

@ApiTags(VENDOR_SWAGGER_TAGS.VENDOR_COMMISSION)
@ApiBearerAuth(VENDOR_BEARER_AUTH)
@Controller('vendors/:vendorId/commission')
export class VendorCommissionController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Configure commission (admin)' })
  async configure(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: ConfigureCommissionBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: ConfigureCommissionRequestDto = {
      vendorId,
      type: body.type as never,
      percent: body.percent,
      fixedAmount: body.fixedAmount,
      currency: body.currency,
      applyOnShipping: body.applyOnShipping,
      applyOnTax: body.applyOnTax,
      effectiveFrom: body.effectiveFrom,
      effectiveTo: body.effectiveTo,
      idempotencyKey: body.idempotencyKey,
    };
    return this.commandBus.execute(new ConfigureCommissionCommand(dto, user.userId));
  }

  @Post('calculate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Preview commission calculation' })
  async calculate(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: CalculateCommissionBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: CalculateCommissionRequestDto = {
      vendorId,
      orderAmount: body.orderAmount,
      currency: body.currency,
      shippingAmount: body.shippingAmount,
      taxAmount: body.taxAmount,
    };
    return this.commandBus.execute(new CalculateCommissionCommand(dto, user.userId));
  }

  @Get('active')
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Get active commission config' })
  async getActive(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetActiveCommissionQuery(vendorId));
  }
}
