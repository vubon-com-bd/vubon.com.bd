/**
 * AuthTokenController — REST endpoints for token list
 * @module identity-service/interfaces/controllers/rest
 */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { ListAuthTokensQuery } from '../../../application/queries/auth/list-auth-tokens.query.js';

import type { TokenListHttpResponseDTO } from '../../dtos/responses/token/token-list.response.dto.js';

import { AuthTokenControllerMapper } from '../../mappers/auth-token.controller.mapper.js';

@ApiTags('auth-token')
@UseGuards(JwtAuthGuard)
@Controller('auth/tokens')
export class AuthTokenController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async list(
    @CurrentUser() user: CurrentUserShape,
    @Query('limit') limit?: number,
  ): Promise<TokenListHttpResponseDTO> {
    const items = await this.queryBus.execute(
      new ListAuthTokensQuery(user.userId, limit),
    );
    return AuthTokenControllerMapper.toHttpList(items);
  }
}
