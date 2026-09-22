import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { UpdatePreferencesCommand } from '../../../application/commands/preferences/update-preferences.command';
import { GetPreferencesQuery } from '../../../application/queries/preferences/get-preferences.query';
import { UpdatePreferencesRequestDto } from '../../dtos/requests/preferences.request.dto';

@ApiTags('Preferences')
@Controller('users/preferences')
@UseGuards(JwtAuthGuard)
export class UserPreferencesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async get(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetPreferencesQuery(user.userId));
  }

  @Patch()
  async update(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: UpdatePreferencesRequestDto,
  ): Promise<unknown> {
    const patch: Record<string, string> = {};
    if (body.newsletter !== undefined) patch.newsletter = String(body.newsletter);
    if (body.promotions !== undefined) patch.promotions = String(body.promotions);
    if (body.orderUpdates !== undefined) patch.orderUpdates = String(body.orderUpdates);
    if (body.productRecommendations !== undefined)
      patch.productRecommendations = String(body.productRecommendations);
    if (body.securityAlerts !== undefined)
      patch.securityAlerts = String(body.securityAlerts);
    return this.commandBus.execute(new UpdatePreferencesCommand(user.userId, patch));
  }
}
