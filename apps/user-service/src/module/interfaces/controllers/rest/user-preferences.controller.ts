/**
 * UserPreferencesController
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
import { UpdatePreferencesCommand } from '@application/commands/preferences/update-preferences.command';
import { ResetPreferencesCommand } from '@application/commands/preferences/reset-preferences.command';
import { GetPreferencesQuery } from '@application/queries/preferences/get-preferences.query';
import { UpdatePreferencesRequestDto } from '../../dtos/requests/preferences.request.dto.js';

@ApiTags('user-preferences')
@Controller('users/:userId/preferences')
export class UserPreferencesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async get(@Param('userId') userId: string): Promise<unknown> {
    return this.queryBus.execute(new GetPreferencesQuery(userId));
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('userId') userId: string,
    @Body() body: UpdatePreferencesRequestDto
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdatePreferencesCommand({ ...body, userId })
    );
  }

  @Post('reset')
  @UseGuards(JwtAuthGuard)
  async reset(@Param('userId') userId: string): Promise<unknown> {
    return this.commandBus.execute(new ResetPreferencesCommand(userId));
  }
}
