/**
 * CheckoutController
 * @module order-service/interfaces/controllers/rest
 */
import {
  Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { StartCheckoutCommand } from '../../../application/commands/checkout/start-checkout.command.js';
import { SelectAddressCommand } from '../../../application/commands/checkout/select-address.command.js';
import { SelectShippingCommand } from '../../../application/commands/checkout/select-shipping.command.js';
import { SelectPaymentCommand } from '../../../application/commands/checkout/select-payment.command.js';
import { ConfirmCheckoutCommand } from '../../../application/commands/checkout/confirm-checkout.command.js';
import { AbandonCheckoutCommand } from '../../../application/commands/checkout/abandon-checkout.command.js';
import { GetCheckoutQuery } from '../../../application/queries/checkout/get-checkout.query.js';

import type { CheckoutResponseDTO } from '../../../application/dtos/responses/checkout-response.dto.js';
import type {
  StartCheckoutRequestDTO,
  SelectAddressRequestDTO,
  SelectShippingRequestDTO,
  SelectPaymentRequestDTO,
  ConfirmCheckoutRequestDTO,
  AbandonCheckoutRequestDTO,
} from '../../../application/dtos/requests/checkout/index.js';

@ApiTags('checkouts')
@ApiBearerAuth('bearer')
@Controller('checkouts')
@UseGuards(JwtAuthGuard)
export class CheckoutController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { super(); }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Start a new checkout session' })
  async start(
    @Body() dto: StartCheckoutRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CheckoutResponseDTO> {
    return this.commandBus.execute(new StartCheckoutCommand(dto, user.userId));
  }

  @Get(':checkoutId')
  @ApiOperation({ summary: 'Get checkout' })
  async getById(@Param('checkoutId') checkoutId: string): Promise<CheckoutResponseDTO> {
    return this.queryBus.execute(new GetCheckoutQuery(checkoutId));
  }

  @Post(':checkoutId/address')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Select shipping/billing address' })
  async selectAddress(
    @Param('checkoutId') checkoutId: string,
    @Body() dto: Omit<SelectAddressRequestDTO, 'checkoutId'>,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CheckoutResponseDTO> {
    return this.commandBus.execute(
      new SelectAddressCommand({ ...dto, checkoutId } as SelectAddressRequestDTO, user.userId),
    );
  }

  @Post(':checkoutId/shipping')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Select shipping method' })
  async selectShipping(
    @Param('checkoutId') checkoutId: string,
    @Body() dto: Omit<SelectShippingRequestDTO, 'checkoutId'>,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CheckoutResponseDTO> {
    return this.commandBus.execute(
      new SelectShippingCommand({ ...dto, checkoutId } as SelectShippingRequestDTO, user.userId),
    );
  }

  @Post(':checkoutId/payment')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Select payment method' })
  async selectPayment(
    @Param('checkoutId') checkoutId: string,
    @Body() dto: Omit<SelectPaymentRequestDTO, 'checkoutId'>,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CheckoutResponseDTO> {
    return this.commandBus.execute(
      new SelectPaymentCommand({ ...dto, checkoutId } as SelectPaymentRequestDTO, user.userId),
    );
  }

  @Post(':checkoutId/confirm')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirm checkout and create order' })
  async confirm(
    @Param('checkoutId') checkoutId: string,
    @Body() body: { idempotencyKey?: string },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CheckoutResponseDTO> {
    const dto: ConfirmCheckoutRequestDTO = { checkoutId, idempotencyKey: body.idempotencyKey };
    return this.commandBus.execute(new ConfirmCheckoutCommand(dto, user.userId));
  }

  @Post(':checkoutId/abandon')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Abandon checkout' })
  async abandon(
    @Param('checkoutId') checkoutId: string,
    @Body() body: { reason?: string },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CheckoutResponseDTO> {
    const dto: AbandonCheckoutRequestDTO = { checkoutId, reason: body.reason };
    return this.commandBus.execute(new AbandonCheckoutCommand(dto, user.userId));
  }
}
