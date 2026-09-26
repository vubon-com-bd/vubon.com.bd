/**
 * AuthAccountLockController
 * @module auth-service/interfaces/controllers/rest
 */
import {
  Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';

import { LockAccountCommand } from '../../../application/commands/auth/lock-account.command';
import { UnlockAccountCommand } from '../../../application/commands/auth/unlock-account.command';
import { GetAuthAccountLockStatusQuery } from '../../../application/queries/auth/get-auth-account-lock-status.query';
import type { UserId } from '@vubon/shared-types/common';

import {
  LockAccountRequestDTO,
  UnlockAccountRequestDTO,
} from '../../dtos/requests/lock.request.dto';
import { CurrentUser, type AuthenticatedUser } from '../../decorators/current-user.decorator';

@ApiTags('Auth Account Lock')
@Controller('auth/account-lock')
@UseGuards(JwtAuthGuard)
export class AuthAccountLockController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('lock')
  @HttpCode(HttpStatus.OK)
  async lock(@Body() body: LockAccountRequestDTO) {
    return this.commandBus.execute(
      new LockAccountCommand({
        userId: body.userId,
        reason: body.reason as never,
        durationMinutes: body.durationMinutes,
        note: body.note,
      }),
    );
  }

  @Post('unlock')
  @HttpCode(HttpStatus.OK)
  async unlock(@Body() body: UnlockAccountRequestDTO) {
    return this.commandBus.execute(
      new UnlockAccountCommand({
        userId: body.userId,
        note: body.note,
      }),
    );
  }

  @Get('me')
  async myLockStatus(@CurrentUser() user: AuthenticatedUser) {
    return this.queryBus.execute(
      new GetAuthAccountLockStatusQuery(user.id as UserId),
    );
  }
}
