/**
 * AuthAccountLockController — REST endpoints for account lock
 * @module identity-service/interfaces/controllers/rest
 */
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { LockAccountCommand } from '../../../application/commands/auth/lock-account.command.js';
import { UnlockAccountCommand } from '../../../application/commands/auth/unlock-account.command.js';

import { GetAuthAccountLockStatusQuery } from '../../../application/queries/auth/get-auth-account-lock-status.query.js';

import { LockAccountHttpDTO } from '../../dtos/requests/auth/lock-account.request.dto.js';
import { UnlockAccountHttpDTO } from '../../dtos/requests/auth/unlock-account.request.dto.js';

import type { AccountLockHttpResponseDTO } from '../../dtos/responses/account-lock/account-lock.response.dto.js';

import { AuthAccountLockControllerMapper } from '../../mappers/auth-account-lock.controller.mapper.js';

@ApiTags('auth-account-lock')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('auth/account-lock')
export class AuthAccountLockController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('lock')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lock a user account (admin)' })
  async lock(@Body() dto: LockAccountHttpDTO): Promise<AccountLockHttpResponseDTO> {
    const result = await this.commandBus.execute(
      new LockAccountCommand(dto as never),
    );
    return AuthAccountLockControllerMapper.toHttpResponse(result);
  }

  @Post('unlock')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Unlock a user account' })
  async unlock(
    @Body() dto: UnlockAccountHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<{ success: true; unlocked: boolean }> {
    return this.commandBus.execute(new UnlockAccountCommand(dto as never, user.userId));
  }

  @Get('status/:userId')
  @ApiOperation({ summary: 'Get account lock status' })
  async getStatus(@Param('userId') userId: string): Promise<AccountLockHttpResponseDTO> {
    const result = await this.queryBus.execute(
      new GetAuthAccountLockStatusQuery(userId),
    );
    return AuthAccountLockControllerMapper.toHttpResponse(result);
  }
}
