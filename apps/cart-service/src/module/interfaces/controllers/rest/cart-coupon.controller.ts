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
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { ApplyCouponCommand } from '../../../application/commands/coupon/apply-coupon.command';
import { RemoveCouponCommand } from '../../../application/commands/coupon/remove-coupon.command';
import { ValidateCouponCommand } from '../../../application/commands/coupon/validate-coupon.command';
import { ListCouponsQuery } from '../../../application/queries/coupon/list-coupons.query';
import {
  ApplyCouponRequestDto,
  RemoveCouponRequestDto,
  ValidateCouponRequestDto,
} from '../../dtos/requests/coupon.request.dto';
import { CouponSwagger } from '../../swagger/coupon.swagger';

@CouponSwagger.Tag()
@Controller('v1/cart/coupons')
@UseGuards(JwtAuthGuard)
export class CartCouponController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('apply')
  @HttpCode(HttpStatus.OK)
  @CouponSwagger.Apply()
  async apply(@Body() body: ApplyCouponRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new ApplyCouponCommand(body.cartId, body.code),
    );
  }

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  @CouponSwagger.Validate()
  async validate(@Body() body: ValidateCouponRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new ValidateCouponCommand(body.code, body.subtotal ?? 0, body.currency ?? 'BDT'),
    );
  }

  @Get(':cartId')
  async list(@Param('cartId') cartId: string): Promise<unknown> {
    return this.queryBus.execute(new ListCouponsQuery(cartId));
  }

  @Delete('remove')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Body() body: RemoveCouponRequestDto): Promise<void> {
    await this.commandBus.execute(
      new RemoveCouponCommand(body.cartId, body.code),
    );
  }
}
