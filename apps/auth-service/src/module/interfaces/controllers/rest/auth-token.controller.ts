import { Controller, Get, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { ListAuthTokensQuery } from '../../../application/queries/auth/list-auth-tokens.query';

@ApiTags('Tokens')
@Controller('auth/tokens')
@UseGuards(JwtAuthGuard)
export class AuthTokenController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async list(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new ListAuthTokensQuery(user.userId));
  }
}
