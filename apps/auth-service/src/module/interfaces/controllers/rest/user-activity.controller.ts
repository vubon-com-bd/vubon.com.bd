/**
 * UserActivityController
 * @module auth-service/interfaces/controllers/rest
 */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import type { UserId } from '@vubon/shared-types/common';

import { ListUserActivitiesQuery } from '../../../application/queries/user/list-user-activities.query';
import { CurrentUser, type AuthenticatedUser } from '../../decorators/current-user.decorator';

@ApiTags('Users Activity')
@Controller('users/activity')
@UseGuards(JwtAuthGuard)
export class UserActivityController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async list(
    @CurrentUser() user: AuthenticatedUser,
    @Query('limit') limit?: string,
  ) {
    const parsed = limit ? Math.min(Number(limit) || 50, 200) : 50;
    return this.queryBus.execute(
      new ListUserActivitiesQuery(user.id as UserId, parsed),
    );
  }
}
