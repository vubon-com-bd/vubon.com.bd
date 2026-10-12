/**
 * UserProfileController — REST endpoints for user profile
 * @module identity-service/interfaces/controllers/rest
 */
import { Body, Controller, Get, HttpCode, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { UpdateProfileCommand } from '../../../application/commands/user/update-profile.command.js';
import { GetUserProfileQuery } from '../../../application/queries/user/get-user-profile.query.js';

import { UpdateProfileHttpDTO } from '../../dtos/requests/user/update-profile.request.dto.js';

import type { UserProfileHttpResponseDTO } from '../../dtos/responses/user-profile/user-profile.response.dto.js';

import { UserProfileControllerMapper } from '../../mappers/user-profile.controller.mapper.js';

@ApiTags('user-profile')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('users/profile')
export class UserProfileController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get current user profile' })
  async get(
    @CurrentUser() user: CurrentUserShape,
  ): Promise<UserProfileHttpResponseDTO | null> {
    const app = await this.queryBus.execute(new GetUserProfileQuery(user.userId));
    return app ? UserProfileControllerMapper.toHttpResponse(app) : null;
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update current user profile' })
  async update(
    @Body() dto: UpdateProfileHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<UserProfileHttpResponseDTO> {
    const appDto = UserProfileControllerMapper.toUpdateAppDto(dto);
    const app = await this.commandBus.execute(
      new UpdateProfileCommand(user.userId, appDto as never),
    );
    return UserProfileControllerMapper.toHttpResponse(app);
  }
}
