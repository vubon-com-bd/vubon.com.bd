/**
 * UserProfileController
 */
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { UpdateProfileCommand } from '@application/commands/profile/update-profile.command';
import { UpdateAvatarCommand } from '@application/commands/profile/update-avatar.command';
import { UpdateBioCommand } from '@application/commands/profile/update-bio.command';
import { UpdateVisibilityCommand } from '@application/commands/profile/update-visibility.command';
import { GetProfileQuery } from '@application/queries/profile/get-profile.query';
import {
  UpdateProfileRequestDto,
  UpdateAvatarRequestDto,
  UpdateBioRequestDto,
  UpdateVisibilityRequestDto,
} from '../../dtos/requests/profile.request.dto.js';
import { ProfileResponseDto } from '../../dtos/responses/profile.response.dto.js';
import { ProfileControllerMapper } from '../../mappers/profile.controller.mapper.js';
import {
  ApiGetProfile,
  ApiUpdateProfile,
  ApiUpdateAvatar,
  ApiUpdateBio,
  ApiUpdateVisibility,
} from '../../swagger/profile.swagger.js';

@ApiTags('user-profile')
@Controller('users/:userId/profile')
export class UserProfileController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiGetProfile()
  async get(@Param('userId') userId: string): Promise<ProfileResponseDto> {
    const appDto = await this.queryBus.execute(new GetProfileQuery(userId));
    return ProfileControllerMapper.toResponse(appDto);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiUpdateProfile()
  async update(
    @Param('userId') userId: string,
    @Body() body: UpdateProfileRequestDto
  ): Promise<ProfileResponseDto> {
    const appDto = ProfileControllerMapper.toUpdateAppDto(userId, body);
    const result = await this.commandBus.execute(new UpdateProfileCommand(userId, appDto));
    return ProfileControllerMapper.toResponse(result);
  }

  @Put('avatar')
  @UseGuards(JwtAuthGuard)
  @ApiUpdateAvatar()
  async updateAvatar(
    @Param('userId') userId: string,
    @Body() body: UpdateAvatarRequestDto
  ): Promise<ProfileResponseDto> {
    const result = await this.commandBus.execute(
      new UpdateAvatarCommand(userId, body.avatarUrl)
    );
    return ProfileControllerMapper.toResponse(result);
  }

  @Put('bio')
  @UseGuards(JwtAuthGuard)
  @ApiUpdateBio()
  async updateBio(
    @Param('userId') userId: string,
    @Body() body: UpdateBioRequestDto
  ): Promise<ProfileResponseDto> {
    const result = await this.commandBus.execute(
      new UpdateBioCommand(userId, body.bio)
    );
    return ProfileControllerMapper.toResponse(result);
  }

  @Put('visibility')
  @UseGuards(JwtAuthGuard)
  @ApiUpdateVisibility()
  async updateVisibility(
    @Param('userId') userId: string,
    @Body() body: UpdateVisibilityRequestDto
  ): Promise<ProfileResponseDto> {
    const result = await this.commandBus.execute(
      new UpdateVisibilityCommand(userId, body.visibility as never)
    );
    return ProfileControllerMapper.toResponse(result);
  }
}
