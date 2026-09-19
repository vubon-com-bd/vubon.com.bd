import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { PERMISSION } from '@vubon/shared-constants/common';
import {
  CurrentUser,
  JwtAuthGuard,
  Permissions,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { LockAccountCommand } from '../../../application/commands/auth/lock-account.command';
import { UnlockAccountCommand } from '../../../application/commands/auth/unlock-account.command';
import { GetAuthAccountLockStatusQuery } from '../../../application/queries/auth/get-auth-account-lock-status.query';

interface LockRequest {
  userId: string;
  reason: string;
  durationMs: number;
}

interface UnlockRequest {
  userId: string;
  reason: string;
}

@ApiTags('Account Lock')
@Controller('auth/account-lock')
@UseGuards(JwtAuthGuard)
export class AuthAccountLockController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('lock')
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async lock(@Body() body: LockRequest): Promise<unknown> {
    return this.commandBus.execute(
      new LockAccountCommand(body.userId, body.reason, body.durationMs),
    );
  }

  @Post('unlock')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async unlock(@Body() body: UnlockRequest): Promise<void> {
    return this.commandBus.execute(
      new UnlockAccountCommand(body.userId, body.reason),
    );
  }

  @Get('status')
  async status(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetAuthAccountLockStatusQuery(user.userId));
  }
}
