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
import { CreateRecurringCommand } from '../../../application/commands/recurring/create-recurring.command';
import { PauseRecurringCommand } from '../../../application/commands/recurring/pause-recurring.command';
import { CancelRecurringCommand } from '../../../application/commands/recurring/cancel-recurring.command';
import { ListRecurringQuery } from '../../../application/queries/recurring/list-recurring.query';
import {
  CreateRecurringRequestDto,
  PauseRecurringRequestDto,
  CancelRecurringRequestDto,
} from '../../dtos/requests/recurring.request.dto';

@Controller('v1/recurring-payments')
@UseGuards(JwtAuthGuard)
export class RecurringPaymentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateRecurringRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new CreateRecurringCommand(
        body.paymentId,
        body.frequency,
        body.amount,
        body.currency,
        body.nextRunAt,
        body.maxCycles,
        body.metadata,
      ),
    );
  }

  @Post('pause')
  @HttpCode(HttpStatus.OK)
  async pause(@Body() body: PauseRecurringRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new PauseRecurringCommand(body.recurringId, body.reason),
    );
  }

  @Post('cancel')
  @HttpCode(HttpStatus.OK)
  async cancel(@Body() body: CancelRecurringRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new CancelRecurringCommand(body.recurringId, body.reason),
    );
  }

  @Get('payment/:paymentId')
  async listByPayment(@Param('paymentId') paymentId: string): Promise<unknown> {
    return this.queryBus.execute(new ListRecurringQuery(paymentId));
  }
}
