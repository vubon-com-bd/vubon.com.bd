/**
 * AuthLoginAttemptController
 * @module auth-service/interfaces/controllers/rest
 */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';

import { ListAuthLoginAttemptsQuery } from '../../../application/queries/auth/list-auth-login-attempts.query';
import type { UserId } from '@vubon/shared-types/common';
import { CurrentUser, type AuthenticatedUser } from '../../decorators/current-user.decorator';

@ApiTags('Auth Login Attempts')
@Controller('auth/login-attempts')
@UseGuards(JwtAuthGuard)
export class AuthLoginAttemptController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async list(
    @CurrentUser() user: AuthenticatedUser,
    @Query('limit') limit?: string,
  ) {
    const parsed = limit ? Math.min(Number(limit) || 20, 100) : 20;
    return this.queryBus.execute(
      new ListAuthLoginAttemptsQuery(user.id as UserId, parsed),
    );
  }
}
