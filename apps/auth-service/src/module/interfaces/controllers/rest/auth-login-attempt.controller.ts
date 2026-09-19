import { Controller, Get, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { ListAuthLoginAttemptsQuery } from '../../../application/queries/auth/list-auth-login-attempts.query';

@ApiTags('Login Attempts')
@Controller('auth/login-attempts')
@UseGuards(JwtAuthGuard)
export class AuthLoginAttemptController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async list(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new ListAuthLoginAttemptsQuery(user.userId));
  }
}
