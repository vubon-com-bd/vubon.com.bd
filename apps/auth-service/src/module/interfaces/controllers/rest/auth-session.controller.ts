import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { ListAuthSessionsQuery } from '../../../application/queries/auth/list-auth-sessions.query';
import { GetAuthSessionQuery } from '../../../application/queries/auth/get-auth-session.query';

@ApiTags('Sessions')
@Controller('auth/sessions')
@UseGuards(JwtAuthGuard)
export class AuthSessionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new ListAuthSessionsQuery(user.userId));
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetAuthSessionQuery(id));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async revoke(@Param('id') id: string): Promise<void> {
    // Handled by LogoutCommand or SessionRevokeCommand
    void this.commandBus;
    void id;
  }
}
