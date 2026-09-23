import {
  Body,
  Controller,
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
import { JwtAuthGuard, Permissions } from '@vubon/shared-kernel/interfaces';
import { LOGISTICS_PERMISSION } from '@vubon/shared-constants/logistics';
import { RegisterCourierCommand } from '../../../application/commands/courier/register-courier.command';
import { SuspendCourierCommand } from '../../../application/commands/courier/suspend-courier.command';
import { ListCouriersQuery } from '../../../application/queries/courier/list-couriers.query';
import { GetCourierQuery } from '../../../application/queries/courier/get-courier.query';
import {
  RegisterCourierRequestSchema,
  type RegisterCourierRequestDTO,
} from '../../dtos/requests/courier.request.dto';

@Controller('logistics/couriers')
@UseGuards(JwtAuthGuard)
export class CourierController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(LOGISTICS_PERMISSION.COURIER_MANAGE)
  async register(@Body() body: RegisterCourierRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new RegisterCourierCommand(body.name, body.type, body.apiUrl, body.apiKey),
    );
  }

  @Get()
  @Permissions(LOGISTICS_PERMISSION.COURIER_VIEW)
  async list(@Query('activeOnly') activeOnly?: string): Promise<unknown> {
    return this.queryBus.execute(new ListCouriersQuery(activeOnly === 'true'));
  }

  @Get(':id')
  @Permissions(LOGISTICS_PERMISSION.COURIER_VIEW)
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetCourierQuery(id));
  }

  @Patch(':id/suspend')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(LOGISTICS_PERMISSION.COURIER_MANAGE)
  async suspend(
    @Param('id') id: string,
    @Body() body: { reason: string },
  ): Promise<void> {
    await this.commandBus.execute(new SuspendCourierCommand(id, body.reason));
  }
}
