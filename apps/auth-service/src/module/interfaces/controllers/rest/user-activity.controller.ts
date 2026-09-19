import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { ListUserActivitiesQuery } from '../../../application/queries/user/list-user-activities.query';

@ApiTags('Activity')
@Controller('users/activity')
@UseGuards(JwtAuthGuard)
export class UserActivityController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async list(
    @CurrentUser() user: CurrentUserShape,
    @Query('limit') limit?: string,
  ): Promise<unknown> {
    const parsed = limit ? Number(limit) : 50;
    return this.queryBus.execute(
      new ListUserActivitiesQuery(user.userId, Number.isFinite(parsed) ? parsed : 50),
    );
  }
}
