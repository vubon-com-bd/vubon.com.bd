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
import { RegisterDriverCommand } from '../../../application/commands/driver/register-driver.command';
import { SetDriverStatusCommand } from '../../../application/commands/driver/set-driver-status.command';
import { GetDriverQuery } from '../../../application/queries/driver/get-driver.query';
import { ListDriversQuery } from '../../../application/queries/driver/list-drivers.query';
import type { RegisterDriverRequestDTO } from '../../dtos/requests/driver.request.dto';

@Controller('logistics/drivers')
@UseGuards(JwtAuthGuard)
export class DriverController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(LOGISTICS_PERMISSION.DRIVER_MANAGE)
  async register(@Body() body: RegisterDriverRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new RegisterDriverCommand(body.name, body.phone, body.licenseNo, body.type),
    );
  }

  @Get()
  @Permissions(LOGISTICS_PERMISSION.DRIVER_VIEW)
  async list(@Query('availableOnly') availableOnly?: string): Promise<unknown> {
    return this.queryBus.execute(new ListDriversQuery(availableOnly === 'true'));
  }

  @Get(':id')
  @Permissions(LOGISTICS_PERMISSION.DRIVER_VIEW)
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetDriverQuery(id));
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(LOGISTICS_PERMISSION.DRIVER_MANAGE)
  async setStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ): Promise<void> {
    await this.commandBus.execute(new SetDriverStatusCommand(id, body.status));
  }
}
