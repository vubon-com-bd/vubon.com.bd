import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CurrentUser,
  JwtAuthGuard,
  Permissions,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { LOGISTICS_PERMISSION } from '@vubon/shared-constants/logistics';
import { CreateShipmentCommand } from '../../../application/commands/shipment/create-shipment.command';
import { UpdateShipmentCommand } from '../../../application/commands/shipment/update-shipment.command';
import { CancelShipmentCommand } from '../../../application/commands/shipment/cancel-shipment.command';
import { GetShipmentQuery } from '../../../application/queries/shipment/get-shipment.query';
import { ListShipmentsQuery } from '../../../application/queries/shipment/list-shipments.query';
import { ShipmentSwagger } from '../../swagger/shipment.swagger';
import type {
  CreateShipmentRequestDTO,
  UpdateShipmentRequestDTO,
} from '../../dtos/requests/shipment.request.dto';

@Controller('logistics/shipments')
@UseGuards(JwtAuthGuard)
@ShipmentSwagger.Tag()
export class ShipmentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(LOGISTICS_PERMISSION.SHIPMENT_CREATE)
  @ShipmentSwagger.Create()
  async create(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: CreateShipmentRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateShipmentCommand(
        body.orderId,
        user.userId,
        body.type,
        body.priority ?? 'normal',
      ),
    );
  }

  @Get()
  @Permissions(LOGISTICS_PERMISSION.SHIPMENT_VIEW)
  async list(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new ListShipmentsQuery(
        page ? Number(page) : 1,
        limit ? Number(limit) : 20,
      ),
    );
  }

  @Get(':id')
  @Permissions(LOGISTICS_PERMISSION.SHIPMENT_VIEW)
  @ShipmentSwagger.Get()
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetShipmentQuery(id));
  }

  @Patch(':id')
  @Permissions(LOGISTICS_PERMISSION.SHIPMENT_UPDATE)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateShipmentRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateShipmentCommand(id, undefined, body.priority, body.notes),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(LOGISTICS_PERMISSION.SHIPMENT_CANCEL)
  async cancel(
    @Param('id') id: string,
    @Body() body: { reason: string },
  ): Promise<void> {
    await this.commandBus.execute(new CancelShipmentCommand(id, body.reason));
  }
}
