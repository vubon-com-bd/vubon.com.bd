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
import { RequestCancelCommand } from '../../../application/commands/cancel/request-cancel.command';
import { ApproveCancelCommand } from '../../../application/commands/cancel/approve-cancel.command';
import { RejectCancelCommand } from '../../../application/commands/cancel/reject-cancel.command';
import { CompleteCancelCommand } from '../../../application/commands/cancel/complete-cancel.command';
import { GetCancelByOrderQuery } from '../../../application/queries/cancel/get-cancel-by-order.query';
import {
  RequestCancelRequestDto,
  ApproveCancelRequestDto,
  RejectCancelRequestDto,
} from '../../dtos/requests/cancel.request.dto';
import { CancelSwagger } from '../../swagger/cancel.swagger';

@ApiTags('Cancel')
@Controller('order-cancels')
@UseGuards(JwtAuthGuard)
export class CancelController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @CancelSwagger.Request()
  async request(@Body() body: RequestCancelRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new RequestCancelCommand(body.orderId, body.reason),
    );
  }

  @Get('order/:orderId')
  async getByOrder(@Param('orderId') orderId: string): Promise<unknown> {
    return this.queryBus.execute(new GetCancelByOrderQuery(orderId));
  }

  @Post(':id/approve')
  @Permissions(PERMISSION.ADMIN_MANAGE)
  @CancelSwagger.Approve()
  async approve(
    @Param('id') id: string,
    @Body() body: ApproveCancelRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(new ApproveCancelCommand(id, body.approvedBy));
  }

  @Post(':id/reject')
  async reject(
    @Param('id') id: string,
    @Body() body: RejectCancelRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(new RejectCancelCommand(id, body.reason));
  }

  @Post(':id/complete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async complete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new CompleteCancelCommand(id));
  }
}
