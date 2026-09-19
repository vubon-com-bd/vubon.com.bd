import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { GetUserPreferencesQuery } from '../../../application/queries/user/get-user-preferences.query';
import { UpdatePreferencesCommand } from '../../../application/commands/user/update-preferences.command';

interface UpdateAuthPreferencesBody {
  newsletter?: boolean;
  promotions?: boolean;
  orderUpdates?: boolean;
  productRecommendations?: boolean;
  securityAlerts?: boolean;
}

@ApiTags('Auth Preferences')
@Controller('auth/preferences')
@UseGuards(JwtAuthGuard)
export class AuthPreferencesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async get(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetUserPreferencesQuery(user.userId));
  }

  @Patch()
  async update(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: UpdateAuthPreferencesBody,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdatePreferencesCommand(
        user.userId,
        body.newsletter,
        body.promotions,
        body.orderUpdates,
        body.productRecommendations,
        body.securityAlerts,
      ),
    );
  }
}
