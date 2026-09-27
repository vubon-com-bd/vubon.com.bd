/**
 * UserActivityController
 */
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { ListActivitiesQuery } from '@application/queries/activity/list-activities.query';
import { GetUserStatsQuery } from '@application/queries/activity/get-user-stats.query';
import { ListActivityQueryDto } from '../../dtos/requests/activity.request.dto.js';

@ApiTags('user-activity')
@Controller('users/:userId/activities')
export class UserActivityController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(
    @Param('userId') userId: string,
    @Query() query: ListActivityQueryDto
  ): Promise<unknown> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    return this.queryBus.execute(
      new ListActivitiesQuery(userId, page, limit, query.type)
    );
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  async stats(@Param('userId') userId: string): Promise<unknown> {
    return this.queryBus.execute(new GetUserStatsQuery(userId));
  }
}
