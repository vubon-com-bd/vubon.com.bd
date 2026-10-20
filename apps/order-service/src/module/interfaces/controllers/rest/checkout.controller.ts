/**
 * CheckoutController
 * @module order-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import {
  CHECKOUT_SERVICE,
  type ICheckoutService,
} from '../../../application/services/interfaces/checkout.service.interface.js';
import {
  StartCheckoutHttpDTO,
  SelectAddressHttpDTO,
  SelectShippingHttpDTO,
  SelectPaymentHttpDTO,
  ConfirmCheckoutHttpDTO,
  AbandonCheckoutHttpDTO,
} from '../../dtos/requests/checkout.request.dto.js';
import type {
  CheckoutHttpResponseDTO,
  CheckoutConfirmHttpResponseDTO,
} from '../../dtos/responses/checkout.response.dto.js';
import { CheckoutControllerMapper } from '../../mappers/checkout.controller.mapper.js';
import { CheckoutTimeoutInterceptor } from '../../interceptors/checkout-timeout.interceptor.js';
import { IdempotencyHeader } from '../../decorators/idempotency-key.decorator.js';
import {
  ApiCheckoutTag,
  ApiStartCheckout,
  ApiConfirmCheckout,
  ApiAbandonCheckout,
} from '../../swagger/checkout.swagger.js';

@ApiCheckoutTag()
@ApiBearerAuth('bearer')
@Controller('checkouts')
@UseGuards(JwtAuthGuard)
@UseInterceptors(CheckoutTimeoutInterceptor)
export class CheckoutController extends BaseController {
  constructor(
    @Inject(CHECKOUT_SERVICE)
    private readonly service: ICheckoutService,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiStartCheckout()
  async start(
    @Body() dto: StartCheckoutHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CheckoutHttpResponseDTO> {
    const appDto = CheckoutControllerMapper.toStartAppDto(dto, user.userId);
    const app = await this.service.start(appDto, user.userId);
    return CheckoutControllerMapper.toHttpResponse(app);
  }

  @Post(':id/address')
  @HttpCode(HttpStatus.OK)
  async selectAddress(
    @Param('id') id: string,
    @Body() dto: SelectAddressHttpDTO,
  ): Promise<CheckoutHttpResponseDTO> {
    const appDto = CheckoutControllerMapper.toSelectAddressDto(id, dto);
    const app = await this.service.selectAddress(appDto);
    return CheckoutControllerMapper.toHttpResponse(app);
  }

  @Post(':id/shipping')
  @HttpCode(HttpStatus.OK)
  async selectShipping(
    @Param('id') id: string,
    @Body() dto: SelectShippingHttpDTO,
  ): Promise<CheckoutHttpResponseDTO> {
    const appDto = CheckoutControllerMapper.toSelectShippingDto(id, dto);
    const app = await this.service.selectShipping(appDto);
    return CheckoutControllerMapper.toHttpResponse(app);
  }

  @Post(':id/payment')
  @HttpCode(HttpStatus.OK)
  async selectPayment(
    @Param('id') id: string,
    @Body() dto: SelectPaymentHttpDTO,
  ): Promise<CheckoutHttpResponseDTO> {
    const appDto = CheckoutControllerMapper.toSelectPaymentDto(id, dto);
    const app = await this.service.selectPayment(appDto);
    return CheckoutControllerMapper.toHttpResponse(app);
  }

  @Post(':id/confirm')
  @HttpCode(HttpStatus.CREATED)
  @ApiConfirmCheckout()
  async confirm(
    @Param('id') id: string,
    @Body() dto: ConfirmCheckoutHttpDTO,
    @CurrentUser() user: CurrentUserShape,
    @IdempotencyHeader() idempotencyKey?: string,
  ): Promise<CheckoutConfirmHttpResponseDTO> {
    const appDto = CheckoutControllerMapper.toConfirmDto(
      id,
      { ...dto, idempotencyKey: idempotencyKey ?? dto.idempotencyKey },
      user.userId,
    );
    const app = await this.service.confirm(appDto);
    return CheckoutControllerMapper.toConfirmHttpResponse(app);
  }

  @Post(':id/abandon')
  @HttpCode(HttpStatus.OK)
  @ApiAbandonCheckout()
  async abandon(
    @Param('id') id: string,
    @Body() dto: AbandonCheckoutHttpDTO,
  ): Promise<CheckoutHttpResponseDTO> {
    const appDto = CheckoutControllerMapper.toAbandonDto(id, dto);
    const app = await this.service.abandon(appDto);
    return CheckoutControllerMapper.toHttpResponse(app);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<CheckoutHttpResponseDTO> {
    const app = await this.service.getById(id);
    return CheckoutControllerMapper.toHttpResponse(app);
  }
}
