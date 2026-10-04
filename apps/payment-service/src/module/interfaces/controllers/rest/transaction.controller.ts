/**
 * TransactionController — REST endpoints for transactions
 * @module payment-service/interfaces/controllers/rest
 */
import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import { GetTransactionQuery } from '../../../application/queries/transaction/get-transaction.query.js';
import { ListTransactionsQuery } from '../../../application/queries/transaction/list-transactions.query.js';
import { ListTransactionsByPaymentQuery } from '../../../application/queries/transaction/list-transactions-by-payment.query.js';
import { ListTransactionsByOrderQuery } from '../../../application/queries/transaction/list-transactions-by-order.query.js';

import { ListTransactionsHttpQueryDTO } from '../../dtos/requests/transaction.request.dto.js';
import { TransactionControllerMapper } from '../../mappers/transaction.controller.mapper.js';

@ApiTags('transactions')
@ApiBearerAuth('bearer')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController extends BaseController {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  @Get()
  @ApiOperation({ summary: 'List transactions (paginated)' })
  async list(@Query() q: ListTransactionsHttpQueryDTO): Promise<unknown> {
    const appDto = TransactionControllerMapper.toListAppDto(q);
    return this.queryBus.execute(new ListTransactionsQuery(appDto));
  }

  @Get('payment/:paymentId')
  @ApiOperation({ summary: 'List transactions by payment' })
  async listByPayment(@Param('paymentId') paymentId: string): Promise<unknown> {
    return this.queryBus.execute(new ListTransactionsByPaymentQuery(paymentId));
  }

  @Get('order/:orderId')
  @ApiOperation({ summary: 'List transactions by order' })
  async listByOrder(@Param('orderId') orderId: string): Promise<unknown> {
    return this.queryBus.execute(new ListTransactionsByOrderQuery(orderId));
  }

  @Get(':transactionId')
  @ApiOperation({ summary: 'Get transaction by id' })
  async getById(@Param('transactionId') transactionId: string): Promise<unknown> {
    return this.queryBus.execute(new GetTransactionQuery(transactionId));
  }
}
