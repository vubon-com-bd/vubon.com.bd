/**
 * User Activity Controller
 * @module identity-service/interfaces/controllers/rest
 */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { ListActivitiesQuery } from '../../../application/queries/activity/list-activities.query.js';

import type { ActivityHttpResponseDTO } from '../../dtos/responses/activity.response.dto.js';

import { ActivityControllerMapper } from '../../mappers/activity.controller.mapper.js';

@ApiTags('user-activity')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('users/activity')
export class UserActivityController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ summary: 'List user activities' })
  async list(
    @CurrentUser() user: CurrentUserShape,
    @Query('limit') limit?: number,
  ): Promise<readonly ActivityHttpResponseDTO[]> {
    const result = await this.queryBus.execute(
      new ListActivitiesQuery(user.userId, limit ?? 20),
    );
    return ActivityControllerMapper.toHttpList(result);
  }
}
