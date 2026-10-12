/**
 * Public Profile Controller — no auth required
 * @module identity-service/interfaces/controllers/rest
 */
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';

import { GetProfilePublicQuery } from '../../../application/queries/profile/get-profile-public.query.js';

import type { ProfileHttpResponseDTO } from '../../dtos/responses/profile.response.dto.js';

import { ProfileControllerMapper } from '../../mappers/profile.controller.mapper.js';

@ApiTags('public-profile')
@Controller('public/profiles')
export class PublicProfileController {
  constructor(private readonly queryBus: QueryBus) {}

  @Public()
  @Get(':userId')
  @ApiOperation({ summary: 'Get public profile' })
  async get(@Param('userId') userId: string): Promise<ProfileHttpResponseDTO> {
    const result = await this.queryBus.execute(new GetProfilePublicQuery(userId));
    if (!result) {
      throw new NotFoundException(`Profile not found for user "${userId}"`);
    }
    return ProfileControllerMapper.toHttpResponse(result);
  }
}
