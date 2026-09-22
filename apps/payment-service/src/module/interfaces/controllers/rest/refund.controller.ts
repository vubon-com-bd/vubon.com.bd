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
import { RequestRefundCommand } from '../../../application/commands/refund/request-refund.command';
import { ApproveRefundCommand } from '../../../application/commands/refund/approve-refund.command';
import { RejectRefundCommand } from '../../../application/commands/refund/reject-refund.command';
import { PartialRefundCommand } from '../../../application/commands/refund/partial-refund.command';
import { ListRefundsQuery } from '../../../application/queries/refund/list-refunds.query';
import {
  RequestRefundRequestDto,
  ApproveRefundRequestDto,
  RejectRefundRequestDto,
  PartialRefundRequestDto,
} from '../../dtos/requests/refund.request.dto';
import { RefundSwagger } from '../../swagger/refund.swagger';

@RefundSwagger.Tag()
@Controller('v1/refunds')
@UseGuards(JwtAuthGuard)
export class RefundController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @RefundSwagger.Request()
  async request(@Body() body: RequestRefundRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new RequestRefundCommand(
        body.paymentId,
        body.amount,
        body.reason,
        body.idempotencyKey,
      ),
    );
  }

  @Post('approve')
  @HttpCode(HttpStatus.OK)
  async approve(@Body() body: ApproveRefundRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new ApproveRefundCommand(body.refundId, body.amount, body.note),
    );
  }

  @Post('reject')
  @HttpCode(HttpStatus.OK)
  async reject(@Body() body: RejectRefundRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new RejectRefundCommand(body.refundId, body.reason),
    );
  }

  @Post('partial')
  @HttpCode(HttpStatus.OK)
  async partial(@Body() body: PartialRefundRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new PartialRefundCommand(
        body.paymentId,
        body.amount,
        body.reason,
      ),
    );
  }

  @Get('payment/:paymentId')
  @RefundSwagger.List()
  async listByPayment(@Param('paymentId') paymentId: string): Promise<unknown> {
    return this.queryBus.execute(new ListRefundsQuery(paymentId));
  }
}
