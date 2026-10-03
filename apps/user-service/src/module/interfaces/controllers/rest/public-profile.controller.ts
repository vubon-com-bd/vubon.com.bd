/**
 * PublicProfileController — no auth, public read-only
 * @module user-service/interfaces/controllers/rest
 */
import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetPublicProfileQuery } from '@application/queries/profile/get-public-profile.query';
import { GetUserQuery } from '@application/queries/user/get-user.query';
import { PublicUserResponseDto } from '../../dtos/responses/public-user.response.dto.js';
import { ProfileResponseDto } from '../../dtos/responses/profile.response.dto.js';
import { UserControllerMapper } from '../../mappers/user.controller.mapper.js';
import { ProfileControllerMapper } from '../../mappers/profile.controller.mapper.js';

@ApiTags('public-profile')
@Controller('public/users')
export class PublicProfileController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get public user info (no auth)' })
  @ApiResponse({ status: 200, type: PublicUserResponseDto })
  async getPublicUser(@Param('id') id: string): Promise<PublicUserResponseDto> {
    const appDto = await this.queryBus.execute(new GetUserQuery(id));
    return UserControllerMapper.toPublicResponse({
      id: appDto.id,
      displayName: undefined,
      status: appDto.status,
      type: appDto.type,
    });
  }

  @Get(':id/profile')
  @ApiOperation({ summary: 'Get public profile (no auth)' })
  @ApiResponse({ status: 200, type: ProfileResponseDto })
  async getPublicProfile(@Param('id') id: string): Promise<ProfileResponseDto> {
    const appDto = await this.queryBus.execute(new GetPublicProfileQuery(id));
    return ProfileControllerMapper.toResponse(appDto);
  }
}
