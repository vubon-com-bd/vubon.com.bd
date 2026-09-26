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
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { CreateTransactionCommand } from '../../../application/commands/transaction/create-transaction.command';
import { ReverseTransactionCommand } from '../../../application/commands/transaction/reverse-transaction.command';
import { ListTransactionsByPaymentQuery } from '../../../application/queries/transaction/list-transactions.query';
import { GetTransactionQuery } from '../../../application/queries/transaction/get-transaction.query';
import {
  CreateTransactionRequestDto,
  ReverseTransactionRequestDto,
} from '../../dtos/requests/transaction.request.dto';

@Controller('v1/transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateTransactionRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new CreateTransactionCommand(
        body.paymentId,
        body.type,
        body.amount,
        body.currency,
        body.gateway,
        body.reference,
        body.idempotencyKey,
        body.metadata,
      ),
    );
  }

  @Post('reverse')
  @HttpCode(HttpStatus.OK)
  async reverse(@Body() body: ReverseTransactionRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new ReverseTransactionCommand(body.transactionId, body.reason),
    );
  }

  @Get('payment/:paymentId')
  async listByPayment(@Param('paymentId') paymentId: string): Promise<unknown> {
    return this.queryBus.execute(new ListTransactionsByPaymentQuery(paymentId));
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetTransactionQuery(id));
  }
}
