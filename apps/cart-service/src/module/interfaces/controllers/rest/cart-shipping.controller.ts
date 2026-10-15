/**
 * CartShippingController — REST endpoints
 * @module cart-service/interfaces/controllers/rest
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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { SetShippingMethodCommand } from '../../../application/commands/shipping/set-shipping-method.command.js';
import { CalculateShippingCommand } from '../../../application/commands/shipping/calculate-shipping.command.js';
import { GetTotalsQuery } from '../../../application/queries/totals/get-totals.query.js';

import { SetShippingMethodHttpDTO } from '../../dtos/requests/shipping.request.dto.js';
import type {
  CartTotalsHttpResponseDTO,
  ShippingCalculationHttpResponseDTO,
} from '../../dtos/responses/cart-totals.response.dto.js';

import { TotalsControllerMapper } from '../../mappers/totals.controller.mapper.js';
import { CartOwnerGuard } from '../../guards/cart-owner.guard.js';
import { CartLockInterceptor } from '../../interceptors/cart-lock.interceptor.js';

@Controller('carts/:cartId/shipping')
@UseGuards(JwtAuthGuard, CartOwnerGuard)
@UseInterceptors(CartLockInterceptor)
@ApiBearerAuth('bearer')
export class CartShippingController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async setMethod(
    @Param('cartId') cartId: string,
    @Body() dto: SetShippingMethodHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CartTotalsHttpResponseDTO> {
    const appDto = TotalsControllerMapper.toSetShippingAppDto(cartId, dto);
    return this.commandBus.execute(new SetShippingMethodCommand(appDto, user.userId));
  }

  @Post('calculate')
  @HttpCode(HttpStatus.OK)
  async calculate(
    @Param('cartId') cartId: string,
    @Body() dto: SetShippingMethodHttpDTO,
  ): Promise<ShippingCalculationHttpResponseDTO> {
    const appDto = TotalsControllerMapper.toSetShippingAppDto(cartId, dto);
    return this.commandBus.execute(new CalculateShippingCommand(appDto));
  }

  @Delete()
  async clear(
    @Param('cartId') cartId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CartTotalsHttpResponseDTO> {
    const totals = await this.queryBus.execute(new GetTotalsQuery(cartId));
    void user;
    return CartShippingController._map(totals);
  }

  @Get('totals')
  async totals(
    @Param('cartId') cartId: string,
  ): Promise<CartTotalsHttpResponseDTO> {
    const app = await this.queryBus.execute(new GetTotalsQuery(cartId));
    return TotalsControllerMapper.toTotalsHttp(app);
  }

  private static _map(totals: unknown): CartTotalsHttpResponseDTO {
    return TotalsControllerMapper.toTotalsHttp(totals as never);
  }
}
