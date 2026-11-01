/**
 * AuthLoginAttemptController — REST endpoints for login attempts
 * @module identity-service/interfaces/controllers/rest
 */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import { ListAuthLoginAttemptsQuery } from '../../../application/queries/auth/list-auth-login-attempts.query.js';

import type { LoginAttemptHttpResponseDTO } from '../../dtos/responses/login-attempt/login-attempt.response.dto.js';

import { AuthLoginAttemptControllerMapper } from '../../mappers/auth-login-attempt.controller.mapper.js';

@ApiTags('auth-login-attempt')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('auth/login-attempts')
export class AuthLoginAttemptController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ summary: 'List recent login attempts for an identifier' })
  async list(
    @Query('identifier') identifier: string,
    @Query('windowSeconds') windowSeconds?: number,
  ): Promise<readonly LoginAttemptHttpResponseDTO[]> {
    const items = await this.queryBus.execute(
      new ListAuthLoginAttemptsQuery(identifier, windowSeconds ?? 300),
    );
    return AuthLoginAttemptControllerMapper.toHttpList(items);
  }
}
