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
import { JwtAuthGuard, Permissions } from '@vubon/shared-kernel/interfaces';
import { LOGISTICS_PERMISSION } from '@vubon/shared-constants/logistics';
import { RequestReturnCommand } from '../../../application/commands/return-shipment/request-return.command';
import { ApproveReturnCommand } from '../../../application/commands/return-shipment/approve-return.command';
import { CompleteReturnCommand } from '../../../application/commands/return-shipment/complete-return.command';
import { GetReturnQuery } from '../../../application/queries/return-shipment/get-return.query';
import { ListReturnsQuery } from '../../../application/queries/return-shipment/list-returns.query';
import type { RequestReturnRequestDTO } from '../../dtos/requests/return-shipment.request.dto';

@Controller('logistics/returns')
@UseGuards(JwtAuthGuard)
export class ReturnShipmentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(LOGISTICS_PERMISSION.RETURN_SHIPMENT_MANAGE)
  async request(@Body() body: RequestReturnRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new RequestReturnCommand(
        body.orderId,
        body.reason,
        body.type,
      ),
    );
  }

  @Get()
  @Permissions(LOGISTICS_PERMISSION.RETURN_SHIPMENT_VIEW)
  async list(@Query('status') status?: string): Promise<unknown> {
    return this.queryBus.execute(new ListReturnsQuery(status));
  }

  @Get(':id')
  @Permissions(LOGISTICS_PERMISSION.RETURN_SHIPMENT_VIEW)
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetReturnQuery(id));
  }

  @Post(':id/approve')
  @HttpCode(HttpStatus.OK)
  @Permissions(LOGISTICS_PERMISSION.RETURN_SHIPMENT_APPROVE)
  async approve(
    @Param('id') returnShipmentId: string,
    @Body() body: { notes?: string },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new ApproveReturnCommand(returnShipmentId, body.notes),
    );
  }

  @Post(':id/complete')
  @HttpCode(HttpStatus.OK)
  @Permissions(LOGISTICS_PERMISSION.RETURN_SHIPMENT_MANAGE)
  async complete(
    @Param('id') returnShipmentId: string,
    @Body() body: { receivedAt?: string },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CompleteReturnCommand(returnShipmentId, body.receivedAt),
    );
  }
}
