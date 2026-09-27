/**
 * UserSettingsController
 */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { UpdateSettingsCommand } from '@application/commands/settings/update-settings.command';
import { ResetSettingsCommand } from '@application/commands/settings/reset-settings.command';
import { GetSettingsQuery } from '@application/queries/settings/get-settings.query';
import { UpdateSettingsRequestDto } from '../../dtos/requests/settings.request.dto.js';

@ApiTags('user-settings')
@Controller('users/:userId/settings')
export class UserSettingsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async get(@Param('userId') userId: string): Promise<unknown> {
    return this.queryBus.execute(new GetSettingsQuery(userId));
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('userId') userId: string,
    @Body() body: UpdateSettingsRequestDto
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateSettingsCommand({ ...body, userId })
    );
  }

  @Post('reset')
  @UseGuards(JwtAuthGuard)
  async reset(@Param('userId') userId: string): Promise<unknown> {
    return this.commandBus.execute(new ResetSettingsCommand(userId));
  }
}
