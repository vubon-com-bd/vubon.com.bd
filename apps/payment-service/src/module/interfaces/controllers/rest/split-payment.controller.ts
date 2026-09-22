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
import { CreateSplitPaymentCommand } from '../../../application/commands/split/create-split-payment.command';
import { ListSplitPaymentsQuery } from '../../../application/queries/split/list-split-payments.query';
import { CreateSplitPaymentRequestDto } from '../../dtos/requests/split.request.dto';

@Controller('v1/split-payments')
@UseGuards(JwtAuthGuard)
export class SplitPaymentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateSplitPaymentRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new CreateSplitPaymentCommand(
        body.paymentId,
        body.splitType,
        body.shares,
        body.currency,
        body.metadata,
      ),
    );
  }

  @Get('payment/:paymentId')
  async listByPayment(@Param('paymentId') paymentId: string): Promise<unknown> {
    return this.queryBus.execute(new ListSplitPaymentsQuery(paymentId));
  }
}
