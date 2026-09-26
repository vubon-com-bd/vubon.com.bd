/**
 * AuthTokenController
 * @module auth-service/interfaces/controllers/rest
 */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';

import { ListAuthTokensQuery } from '../../../application/queries/auth/list-auth-tokens.query';
import { CurrentUser, type AuthenticatedUser } from '../../decorators/current-user.decorator';

@ApiTags('Auth Tokens')
@Controller('auth/tokens')
@UseGuards(JwtAuthGuard)
export class AuthTokenController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async listMine(@CurrentUser() user: AuthenticatedUser) {
    return this.queryBus.execute(
      new ListAuthTokensQuery(user.id, 'access'),
    );
  }
}
