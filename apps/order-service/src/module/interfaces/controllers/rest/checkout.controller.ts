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
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  Permissions,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { StartCheckoutCommand } from '../../../application/commands/checkout/start-checkout.command';
import { SelectAddressCommand } from '../../../application/commands/checkout/select-address.command';
import { SelectShippingCommand } from '../../../application/commands/checkout/select-shipping.command';
import { SelectPaymentCommand } from '../../../application/commands/checkout/select-payment.command';
import { ConfirmCheckoutCommand } from '../../../application/commands/checkout/confirm-checkout.command';
import { AbandonCheckoutCommand } from '../../../application/commands/checkout/abandon-checkout.command';
import { GetCheckoutQuery } from '../../../application/queries/checkout/get-checkout.query';
import {
  StartCheckoutRequestDto,
  SelectAddressRequestDto,
  SelectShippingRequestDto,
  SelectPaymentRequestDto,
  AbandonCheckoutRequestDto,
} from '../../dtos/requests/checkout.request.dto';
import { CheckoutSwagger } from '../../swagger/checkout.swagger';

@ApiTags('Checkout')
@Controller('checkouts')
@UseGuards(JwtAuthGuard)
export class CheckoutController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @CheckoutSwagger.Start()
  async start(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: StartCheckoutRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new StartCheckoutCommand(user.userId ?? body.customerId, body.cartId),
    );
  }

  @Get(':id')
  @CheckoutSwagger.Get()
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetCheckoutQuery(id));
  }

  @Post(':id/address')
  @Permissions(PERMISSION.ORDER_UPDATE)
  async selectAddress(
    @Param('id') id: string,
    @Body() body: SelectAddressRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(new SelectAddressCommand(id, body.addressId));
  }

  @Post(':id/shipping')
  async selectShipping(
    @Param('id') id: string,
    @Body() body: SelectShippingRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(new SelectShippingCommand(id, body.methodId));
  }

  @Post(':id/payment')
  async selectPayment(
    @Param('id') id: string,
    @Body() body: SelectPaymentRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new SelectPaymentCommand(id, body.paymentMethod),
    );
  }

  @Post(':id/confirm')
  async confirm(@Param('id') id: string): Promise<unknown> {
    return this.commandBus.execute(new ConfirmCheckoutCommand(id));
  }

  @Post(':id/abandon')
  @HttpCode(HttpStatus.NO_CONTENT)
  async abandon(
    @Param('id') id: string,
    @Body() body: AbandonCheckoutRequestDto,
  ): Promise<void> {
    return this.commandBus.execute(new AbandonCheckoutCommand(id, body.reason));
  }
}
