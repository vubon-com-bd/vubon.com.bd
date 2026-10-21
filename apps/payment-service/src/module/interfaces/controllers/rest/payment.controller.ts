/**
 * PaymentController — REST endpoints for payments
 * @module payment-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { InitiatePaymentCommand } from '@application/commands/payment/initiate-payment.command';
import { ConfirmPaymentCommand } from '@application/commands/payment/confirm-payment.command';
import { CancelPaymentCommand } from '@application/commands/payment/cancel-payment.command';
import { RetryPaymentCommand } from '@application/commands/payment/retry-payment.command';
import { VerifyPaymentCommand } from '@application/commands/payment/verify-payment.command';

import { GetPaymentQuery } from '@application/queries/payment/get-payment.query';
import { ListPaymentsQuery } from '@application/queries/payment/list-payments.query';
import { GetPaymentByOrderQuery } from '@application/queries/payment/get-payment-by-order.query';
import { GetPaymentStatsQuery } from '@application/queries/payment/get-payment-stats.query';

import {
  InitiatePaymentHttpDTO,
  ConfirmPaymentHttpDTO,
  CancelPaymentHttpDTO,
  RetryPaymentHttpDTO,
  VerifyPaymentHttpDTO,
  ListPaymentsHttpQueryDTO,
} from '@interfaces/dtos/requests/payment.request.dto';
import type {
  PaymentHttpResponseDTO,
  PaymentInitiateHttpResponseDTO,
  PaymentListHttpResponseDTO,
  PaymentStatsHttpResponseDTO,
} from '@interfaces/dtos/responses/payment.response.dto';

import { PaymentControllerMapper } from '@interfaces/mappers/payment.controller.mapper';
import { OwnPaymentGuard } from '@interfaces/guards/own-payment.guard';
import { IdempotencyHeader } from '@interfaces/decorators/idempotency-key.decorator';
import { PaymentCacheInterceptor } from '@interfaces/interceptors/payment-cache.interceptor';
import {
  ApiPaymentTag,
  ApiPaymentInitiate,
  ApiPaymentConfirm,
  ApiPaymentGet,
  ApiPaymentList,
  ApiPaymentStats,
} from '@interfaces/swagger/payment.swagger';

@ApiPaymentTag()
@ApiBearerAuth('bearer')
@Controller('payments')
@UseGuards(JwtAuthGuard)
@UseInterceptors(PaymentCacheInterceptor)
export class PaymentController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiPaymentInitiate()
  async initiate(
    @Body() dto: InitiatePaymentHttpDTO,
    @CurrentUser() user: CurrentUserShape,
    @IdempotencyHeader() idempotencyKey?: string,
  ): Promise<PaymentInitiateHttpResponseDTO> {
    const appDto = PaymentControllerMapper.toInitiateAppDto(dto);
    return this.commandBus.execute(
      new InitiatePaymentCommand(
        { ...appDto, idempotencyKey: idempotencyKey ?? undefined },
        user.userId,
      ),
    );
  }

  @Post(':id/confirm')
  @HttpCode(HttpStatus.OK)
  @ApiPaymentConfirm()
  async confirm(
    @Param('id') id: string,
    @Body() body: ConfirmPaymentHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<PaymentHttpResponseDTO> {
    return this.commandBus.execute(
      new ConfirmPaymentCommand(
        {
          paymentId: id,
          gatewayReference: body.gatewayReference,
          gatewaySignature: body.gatewaySignature,
          gatewayData: body.gatewayData,
          confirmedAmount: body.confirmedAmount,
          currency: body.currency,
          confirmedBy: user.userId,
        },
        user.userId,
      ),
    );
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @UseGuards(OwnPaymentGuard)
  async cancel(
    @Param('id') id: string,
    @Body() body: CancelPaymentHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<PaymentHttpResponseDTO> {
    return this.commandBus.execute(
      new CancelPaymentCommand(
        {
          paymentId: id,
          reason: body.reason ?? 'Customer requested cancellation',
          cancelledBy: user.userId,
        },
        user.userId,
      ),
    );
  }

  @Post(':id/retry')
  @HttpCode(HttpStatus.OK)
  @UseGuards(OwnPaymentGuard)
  async retry(
    @Param('id') id: string,
    @Body() body: RetryPaymentHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<PaymentHttpResponseDTO> {
    return this.commandBus.execute(
      new RetryPaymentCommand(
        { paymentId: id, gateway: body.gateway, reason: body.reason },
        user.userId,
      ),
    );
  }

  @Post(':id/verify')
  @HttpCode(HttpStatus.OK)
  async verify(
    @Param('id') id: string,
    @Body() body: VerifyPaymentHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<PaymentHttpResponseDTO> {
    return this.commandBus.execute(
      new VerifyPaymentCommand(
        {
          paymentId: id,
          gatewaySignature: body.gatewaySignature,
          gatewayData: body.gatewayData,
        },
        user.userId,
      ),
    );
  }

  @Get()
  @ApiPaymentList()
  async list(
    @Query() q: ListPaymentsHttpQueryDTO,
  ): Promise<PaymentListHttpResponseDTO> {
    const options = PaymentControllerMapper.toListOptions(q);
    return this.queryBus.execute(new ListPaymentsQuery(
      options.page,
      options.limit,
      options.filter,
      options.sortBy,
      options.sortDir,
    ));
  }

  @Get('stats')
  @ApiPaymentStats()
  async stats(
    @Query('userId') userId?: string,
  ): Promise<PaymentStatsHttpResponseDTO> {
    return this.queryBus.execute(new GetPaymentStatsQuery(userId));
  }

  @Get('order/:orderId')
  async getByOrder(
    @Param('orderId') orderId: string,
  ): Promise<PaymentListHttpResponseDTO> {
    return this.queryBus.execute(new GetPaymentByOrderQuery(orderId));
  }

  @Get(':id')
  @UseGuards(OwnPaymentGuard)
  @ApiPaymentGet()
  async getById(
    @Param('id') id: string,
  ): Promise<PaymentHttpResponseDTO> {
    return this.queryBus.execute(new GetPaymentQuery(id));
  }
}
