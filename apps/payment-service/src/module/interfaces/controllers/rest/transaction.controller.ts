/**
 * TransactionController
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
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import { CreateTransactionCommand } from '@application/commands/transaction/create-transaction.command';
import { ReverseTransactionCommand } from '@application/commands/transaction/reverse-transaction.command';
import { GetTransactionQuery } from '@application/queries/transaction/get-transaction.query';
import { ListTransactionsQuery } from '@application/queries/transaction/list-transactions.query';

import type {
  TransactionResponseDTO,
  TransactionListResponseDTO,
} from '@application/dtos/responses/transaction-response.dto';

@ApiTags('transactions')
@ApiBearerAuth('bearer')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body()
    body: {
      paymentId: string;
      type: string;
      amount: number;
      currency: string;
      gatewayReference?: string;
      reference?: string;
      metadata?: Record<string, unknown>;
    },
  ): Promise<TransactionResponseDTO> {
    return this.commandBus.execute(
      new CreateTransactionCommand({
        paymentId: body.paymentId,
        type: body.type as never,
        amount: body.amount,
        currency: body.currency,
        gatewayReference: body.gatewayReference,
        reference: body.reference,
        metadata: body.metadata,
      }),
    );
  }

  @Post(':id/reverse')
  @HttpCode(HttpStatus.OK)
  async reverse(
    @Param('id') id: string,
    @Body() body: { reason: string },
  ): Promise<TransactionResponseDTO> {
    return this.commandBus.execute(
      new ReverseTransactionCommand({ transactionId: id, reason: body.reason }),
    );
  }

  @Get()
  async list(
    @Query('paymentId') paymentId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<TransactionListResponseDTO> {
    return this.queryBus.execute(
      new ListTransactionsQuery(
        Number(page) || 1,
        Number(limit) || 20,
        { paymentId },
      ),
    );
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<TransactionResponseDTO> {
    return this.queryBus.execute(new GetTransactionQuery(id));
  }
}
