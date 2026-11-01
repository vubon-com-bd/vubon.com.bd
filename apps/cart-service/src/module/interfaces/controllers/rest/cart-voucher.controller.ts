/**
 * CartVoucherController — REST endpoints
 * @module cart-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { ApplyVoucherCommand } from '../../../application/commands/voucher/apply-voucher.command.js';
import { RemoveVoucherCommand } from '../../../application/commands/voucher/remove-voucher.command.js';

import {
  ApplyVoucherHttpDTO,
  RemoveVoucherHttpDTO,
} from '../../dtos/requests/coupon.request.dto.js';
import type { VoucherHttpResponseDTO } from '../../dtos/responses/coupon.response.dto.js';
import type { CartActionHttpResponseDTO } from '../../dtos/responses/cart.response.dto.js';

import { CouponControllerMapper } from '../../mappers/coupon.controller.mapper.js';
import { CartOwnerGuard } from '../../guards/cart-owner.guard.js';
import { CartLockInterceptor } from '../../interceptors/cart-lock.interceptor.js';
import { IdempotencyHeader } from '../../decorators/idempotency-key.decorator.js';
import { ApiApplyVoucher } from '../../swagger/coupon.swagger.js';

@Controller('carts/:cartId/voucher')
@UseGuards(JwtAuthGuard, CartOwnerGuard)
@UseInterceptors(CartLockInterceptor)
@ApiBearerAuth('bearer')
export class CartVoucherController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiApplyVoucher()
  async apply(
    @Param('cartId') cartId: string,
    @Body() dto: ApplyVoucherHttpDTO,
    @CurrentUser() user: CurrentUserShape,
    @IdempotencyHeader() idempotencyKey?: string,
  ): Promise<VoucherHttpResponseDTO> {
    const appDto = CouponControllerMapper.toApplyVoucherAppDto(
      cartId,
      dto,
      idempotencyKey,
    );
    return this.commandBus.execute(new ApplyVoucherCommand(appDto, user.userId));
  }

  @Delete()
  async remove(
    @Param('cartId') cartId: string,
    @Body() dto: RemoveVoucherHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CartActionHttpResponseDTO> {
    return this.commandBus.execute(
      new RemoveVoucherCommand({ cartId, code: dto.code }, user.userId),
    );
  }
}
