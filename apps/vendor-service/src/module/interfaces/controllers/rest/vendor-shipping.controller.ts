/**
 * VendorShippingController
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
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { CurrentUser, Public } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { ParseUuidPipe } from '@vubon/shared-kernel/interfaces/pipes';

import { VENDOR_SWAGGER_TAGS, VENDOR_BEARER_AUTH } from '../../swagger/index.js';
import { VendorOwnerGuard } from '../../guards/vendor-owner.guard.js';
import { VendorOwner } from '../../decorators/vendor-owner.decorator.js';

import { InitializeShippingCommand } from '../../../application/commands/shipping/initialize-shipping.command.js';
import { AddShippingRateCommand } from '../../../application/commands/shipping/add-shipping-rate.command.js';
import { RemoveShippingRateCommand } from '../../../application/commands/shipping/remove-shipping-rate.command.js';
import { SetFreeShippingThresholdCommand } from '../../../application/commands/shipping/set-free-shipping-threshold.command.js';

import { GetVendorShippingQuery } from '../../../application/queries/shipping/get-vendor-shipping.query.js';
import { CalculateShippingQuery } from '../../../application/queries/shipping/calculate-shipping.query.js';

interface InitializeBody {
  readonly defaultMethod: string;
}

interface AddRateBody {
  readonly method: string;
  readonly zone: string;
  readonly cost: number;
  readonly currency: string;
  readonly minDeliveryDays: number;
  readonly maxDeliveryDays: number;
}

interface SetThresholdBody {
  readonly amount?: number;
}

@ApiTags(VENDOR_SWAGGER_TAGS.VENDOR_SHIPPING)
@ApiBearerAuth(VENDOR_BEARER_AUTH)
@Controller('vendors/:vendorId/shipping')
export class VendorShippingController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post('initialize')
  @HttpCode(HttpStatus.OK)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Initialize shipping config' })
  async initialize(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: InitializeBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new InitializeShippingCommand(vendorId, body.defaultMethod, user.userId),
    );
  }

  @Post('rates')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Add shipping rate' })
  async addRate(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: AddRateBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new AddShippingRateCommand({
        vendorId,
        method: body.method,
        zone: body.zone,
        cost: body.cost,
        currency: body.currency,
        minDeliveryDays: body.minDeliveryDays,
        maxDeliveryDays: body.maxDeliveryDays,
      }, user.userId),
    );
  }

  @Delete('rates/:method/:zone')
  @HttpCode(HttpStatus.OK)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Remove shipping rate' })
  async removeRate(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Param('method') method: string,
    @Param('zone') zone: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new RemoveShippingRateCommand(vendorId, method, zone, user.userId),
    );
  }

  @Post('free-threshold')
  @HttpCode(HttpStatus.OK)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Set free-shipping threshold' })
  async setThreshold(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: SetThresholdBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new SetFreeShippingThresholdCommand(vendorId, body.amount, user.userId),
    );
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get shipping config (public)' })
  async get(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetVendorShippingQuery(vendorId));
  }

  @Get('calculate')
  @Public()
  @ApiOperation({ summary: 'Calculate shipping for zone + total' })
  async calculate(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Query('zone') zone: string,
    @Query('total') total: string,
    @Query('method') method?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new CalculateShippingQuery(vendorId, zone, Number(total), method),
    );
  }
}
