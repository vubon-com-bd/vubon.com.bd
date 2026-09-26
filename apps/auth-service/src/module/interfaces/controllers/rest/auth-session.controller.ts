/**
 * AuthSessionController
 * @module auth-service/interfaces/controllers/rest
 */
import {
  Controller,
  Get,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';

import { GetAuthSessionQuery } from '../../../application/queries/auth/get-auth-session.query';
import { ListAuthSessionsQuery } from '../../../application/queries/auth/list-auth-sessions.query';
import type { AuthSessionResponseDTO } from '../../../application/dtos/responses/auth-session-response.dto';
import { SessionControllerMapper } from '../../mappers/session.controller.mapper';
import { SessionSwagger } from '../../swagger/session.swagger';
import { CurrentUser, type AuthenticatedUser } from '../../decorators/current-user.decorator';

@ApiTags('Auth Sessions')
@Controller('auth/sessions')
@UseGuards(JwtAuthGuard)
export class AuthSessionController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly mapper: SessionControllerMapper,
  ) {}

  @Get('me')
  @SessionSwagger.List()
  async listMine(@CurrentUser() user: AuthenticatedUser) {
    const rows = await this.queryBus.execute<
      ListAuthSessionsQuery,
      readonly AuthSessionResponseDTO[]
    >(new ListAuthSessionsQuery(user.id as never));
    return this.mapper.toResponseList(rows);
  }

  @Get(':id')
  @SessionSwagger.Get()
  async getOne(@Param('id') id: string) {
    const row = await this.queryBus.execute<
      GetAuthSessionQuery,
      AuthSessionResponseDTO
    >(new GetAuthSessionQuery(id));
    return this.mapper.toResponse(row);
  }

  @Delete(':id')
  @SessionSwagger.Revoke()
  async revoke(@Param('id') id: string): Promise<void> {
    // Session revocation is done through AuthService, not a command.
    await this.commandBus.execute({
      type: 'auth.session.revoke',
      payload: { sessionId: id },
    } as never);
  }
}
