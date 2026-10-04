import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { ApplyCouponCommand } from '../../../application/commands/coupon/apply-coupon.command.js';
import { RemoveCouponCommand } from '../../../application/commands/coupon/remove-coupon.command.js';
import { ValidateCouponCommand } from '../../../application/commands/coupon/validate-coupon.command.js';

import { ApplyCouponHttpDTO, RemoveCouponHttpDTO, ValidateCouponHttpDTO } from '../../dtos/requests/coupon.request.dto.js';

@ApiTags('cart-coupons')
@ApiBearerAuth('bearer')
@Controller('cart/:cartId/coupon')
@UseGuards(JwtAuthGuard)
export class CartCouponController extends BaseController {
  constructor(private readonly commandBus: CommandBus) { super(); }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Apply coupon to cart' })
  async apply(
    @Param('cartId') cartId: string,
    @Body() dto: ApplyCouponHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ) {
    return this.commandBus.execute(new ApplyCouponCommand({ cartId, code: dto.code, userId: user.userId }));
  }

  @Post('validate')
  @ApiOperation({ summary: 'Validate coupon (no state change)' })
  async validate(
    @Param('cartId') cartId: string,
    @Body() dto: ValidateCouponHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ) {
    return this.commandBus.execute(new ValidateCouponCommand({ cartId, code: dto.code, userId: user.userId }));
  }

  @Delete()
  @ApiOperation({ summary: 'Remove coupon' })
  async remove(
    @Param('cartId') cartId: string,
    @Body() dto: RemoveCouponHttpDTO,
  ) {
    return this.commandBus.execute(new RemoveCouponCommand({ cartId, reason: dto.reason }));
  }
}
