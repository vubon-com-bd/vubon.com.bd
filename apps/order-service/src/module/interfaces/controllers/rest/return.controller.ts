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
import { ApiTags } from '@nestjs/swagger';
import {
  JwtAuthGuard,
  Permissions,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { RequestReturnCommand } from '../../../application/commands/return/request-return.command';
import { ApproveReturnCommand } from '../../../application/commands/return/approve-return.command';
import { RejectReturnCommand } from '../../../application/commands/return/reject-return.command';
import { ReceiveReturnCommand } from '../../../application/commands/return/receive-return.command';
import { CompleteReturnCommand } from '../../../application/commands/return/complete-return.command';
import { GetReturnByOrderQuery } from '../../../application/queries/return/get-return-by-order.query';
import {
  RequestReturnRequestDto,
  ApproveReturnRequestDto,
  RejectReturnRequestDto,
  ReceiveReturnRequestDto,
} from '../../dtos/requests/return.request.dto';
import { ReturnSwagger } from '../../swagger/return.swagger';

@ApiTags('Return')
@Controller('order-returns')
@UseGuards(JwtAuthGuard)
export class ReturnController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ReturnSwagger.Request()
  async request(@Body() body: RequestReturnRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new RequestReturnCommand(body.orderId, body.reason, body.itemIds),
    );
  }

  @Get('order/:orderId')
  async getByOrder(@Param('orderId') orderId: string): Promise<unknown> {
    return this.queryBus.execute(new GetReturnByOrderQuery(orderId));
  }

  @Post(':id/approve')
  @Permissions(PERMISSION.ADMIN_MANAGE)
  @ReturnSwagger.Approve()
  async approve(
    @Param('id') id: string,
    @Body() body: ApproveReturnRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(new ApproveReturnCommand(id, body.approvedBy));
  }

  @Post(':id/reject')
  async reject(
    @Param('id') id: string,
    @Body() body: RejectReturnRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(new RejectReturnCommand(id, body.reason));
  }

  @Post(':id/receive')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async receive(
    @Param('id') id: string,
    @Body() body: ReceiveReturnRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(new ReceiveReturnCommand(id, body.receivedBy));
  }

  @Post(':id/complete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async complete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new CompleteReturnCommand(id));
  }
}
