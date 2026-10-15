/**
 * CartCouponController — REST endpoints
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
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { ApplyCouponCommand } from '../../../application/commands/coupon/apply-coupon.command.js';
import { RemoveCouponCommand } from '../../../application/commands/coupon/remove-coupon.command.js';
import { ValidateCouponCommand } from '../../../application/commands/coupon/validate-coupon.command.js';

import {
  ApplyCouponHttpDTO,
  RemoveCouponHttpDTO,
  ValidateCouponHttpDTO,
} from '../../dtos/requests/coupon.request.dto.js';
import type {
  CouponHttpResponseDTO,
  CouponValidationHttpResponseDTO,
} from '../../dtos/responses/coupon.response.dto.js';
import type { CartActionHttpResponseDTO } from '../../dtos/responses/cart.response.dto.js';

import { CouponControllerMapper } from '../../mappers/coupon.controller.mapper.js';
import { CartOwnerGuard } from '../../guards/cart-owner.guard.js';
import { CartLockInterceptor } from '../../interceptors/cart-lock.interceptor.js';
import { IdempotencyHeader } from '../../decorators/idempotency-key.decorator.js';
import {
  ApiApplyCoupon,
  ApiRemoveCoupon,
  ApiValidateCoupon,
} from '../../swagger/coupon.swagger.js';
import { UseInterceptors } from '@nestjs/common';

@Controller('carts/:cartId/coupon')
@UseGuards(JwtAuthGuard, CartOwnerGuard)
@UseInterceptors(CartLockInterceptor)
@ApiBearerAuth('bearer')
export class CartCouponController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiApplyCoupon()
  async apply(
    @Param('cartId') cartId: string,
    @Body() dto: ApplyCouponHttpDTO,
    @CurrentUser() user: CurrentUserShape,
    @IdempotencyHeader() idempotencyKey?: string,
  ): Promise<CouponHttpResponseDTO> {
    const appDto = CouponControllerMapper.toApplyAppDto(cartId, dto, idempotencyKey);
    return this.commandBus.execute(new ApplyCouponCommand(appDto, user.userId));
  }

  @Delete()
  @ApiRemoveCoupon()
  async remove(
    @Param('cartId') cartId: string,
    @Body() dto: RemoveCouponHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CartActionHttpResponseDTO> {
    return this.commandBus.execute(
      new RemoveCouponCommand({ cartId, code: dto.code }, user.userId),
    );
  }

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  @ApiValidateCoupon()
  async validate(
    @Param('cartId') cartId: string,
    @Body() dto: ValidateCouponHttpDTO,
  ): Promise<CouponValidationHttpResponseDTO> {
    const appDto = CouponControllerMapper.toValidateAppDto(cartId, dto);
    return this.commandBus.execute(new ValidateCouponCommand(appDto));
  }
}
