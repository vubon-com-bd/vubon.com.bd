/**
 * SplitPaymentController
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
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import { CreateSplitPaymentCommand } from '@application/commands/split/create-split-payment.command';
import { ListTransactionsQuery } from '@application/queries/transaction/list-transactions.query';

import type {
  CreateSplitPaymentRequestDTO,
} from '@application/dtos/requests/split/index';
import type {
  SplitHttpResponseDTO as SplitResponseDTO,
  SplitListHttpResponseDTO as SplitListResponseDTO,
} from '@interfaces/dtos/responses/split-response.dto';


@ApiTags('split-payments')
@ApiBearerAuth('bearer')
@Controller('split-payments')
@UseGuards(JwtAuthGuard)
export class SplitPaymentController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() body: CreateSplitPaymentRequestDTO,
  ): Promise<SplitResponseDTO> {
    return this.commandBus.execute(
      new CreateSplitPaymentCommand(body),
    );
  }

  @Get('payment/:paymentId')
  async listByPayment(
    @Param('paymentId') paymentId: string,
  ): Promise<SplitListResponseDTO> {
    void this.queryBus;
    // Placeholder — use proper query in production
    void paymentId;
    return {
      items: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    };
  }
}
