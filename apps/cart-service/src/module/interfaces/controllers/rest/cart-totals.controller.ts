/**
 * CartTotalsController — REST endpoints
 * @module cart-service/interfaces/controllers/rest
 */
import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import { GetTotalsQuery } from '../../../application/queries/totals/get-totals.query.js';
import type { CartTotalsHttpResponseDTO } from '../../dtos/responses/cart-totals.response.dto.js';
import { TotalsControllerMapper } from '../../mappers/totals.controller.mapper.js';
import { CartOwnerGuard } from '../../guards/cart-owner.guard.js';

@Controller('carts/:cartId/totals')
@UseGuards(JwtAuthGuard, CartOwnerGuard)
@ApiBearerAuth('bearer')
export class CartTotalsController extends BaseController {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  @Get()
  async get(
    @Param('cartId') cartId: string,
    @Query('taxRate') taxRate?: number,
    @Query('taxInclusive') taxInclusive?: boolean,
  ): Promise<CartTotalsHttpResponseDTO> {
    const app = await this.queryBus.execute(
      new GetTotalsQuery(cartId, taxRate, taxInclusive),
    );
    return TotalsControllerMapper.toTotalsHttp(app);
  }
}
