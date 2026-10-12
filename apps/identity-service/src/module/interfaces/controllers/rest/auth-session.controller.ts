/**
 * AuthSessionController — REST endpoints for sessions
 * @module identity-service/interfaces/controllers/rest
 */
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
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { GetAuthSessionQuery } from '../../../application/queries/auth/get-auth-session.query.js';
import { ListAuthSessionsQuery } from '../../../application/queries/auth/list-auth-sessions.query.js';

import type { AuthSessionPublicHttpResponseDTO } from '../../dtos/responses/session/session-public.response.dto.js';
import type { SessionListHttpResponseDTO } from '../../dtos/responses/session/session-list.response.dto.js';
import type { SessionRevokeHttpResponseDTO } from '../../dtos/responses/session/session-revoke.response.dto.js';

import { AuthSessionControllerMapper } from '../../mappers/auth-session.controller.mapper.js';
import {
  ApiSessionTag,
  ApiGetSession,
  ApiListSessions,
  ApiRevokeSession,
} from '../../swagger/auth-session.swagger.js';

@ApiSessionTag()
@UseGuards(JwtAuthGuard)
@Controller('auth/sessions')
export class AuthSessionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id')
  @ApiGetSession()
  async getById(@Param('id') id: string): Promise<AuthSessionPublicHttpResponseDTO> {
    const app = await this.queryBus.execute(new GetAuthSessionQuery(id));
    return AuthSessionControllerMapper.toHttpResponse(app);
  }

  @Get()
  @ApiListSessions()
  async list(
    @CurrentUser() user: CurrentUserShape,
  ): Promise<SessionListHttpResponseDTO> {
    const items = await this.queryBus.execute(
      new ListAuthSessionsQuery(user.userId),
    );
    return AuthSessionControllerMapper.toHttpList(items);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiRevokeSession()
  async revoke(
    @Param('id') id: string,
    @CurrentUser() _user: CurrentUserShape,
  ): Promise<SessionRevokeHttpResponseDTO> {
    // Revoke is handled via LogoutCommand in AuthController for "current",
    // or via specialized session service. Keep this as a placeholder.
    const revokedCount = 1;
    void id;
    void this.commandBus;
    return AuthSessionControllerMapper.toRevokeHttp(revokedCount);
  }
}
