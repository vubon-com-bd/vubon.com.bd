/**
 * AuthRoleController — REST endpoints for roles
 * @module identity-service/interfaces/controllers/rest
 */
import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { AssignRoleCommand } from '../../../application/commands/user/assign-role.command.js';
import { RevokeRoleCommand } from '../../../application/commands/user/revoke-role.command.js';

import { ListAuthRolesQuery } from '../../../application/queries/auth/list-auth-roles.query.js';

import { AssignRoleHttpDTO } from '../../dtos/requests/user/assign-role.request.dto.js';
import { RevokeRoleHttpDTO } from '../../dtos/requests/user/revoke-role.request.dto.js';

import type { RoleHttpResponseDTO } from '../../dtos/responses/role/role.response.dto.js';

import { AuthRoleControllerMapper } from '../../mappers/auth-role.controller.mapper.js';

@ApiTags('auth-role')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('auth/roles')
export class AuthRoleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List all roles' })
  async list(): Promise<readonly RoleHttpResponseDTO[]> {
    const roles = await this.queryBus.execute(new ListAuthRolesQuery());
    return AuthRoleControllerMapper.toHttpList(roles);
  }

  @Post('assign')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Assign role to a user' })
  async assign(
    @Body() dto: AssignRoleHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<{ success: true; assigned: boolean }> {
    return this.commandBus.execute(new AssignRoleCommand(dto as never, user.userId));
  }

  @Post('revoke')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Revoke role from a user' })
  async revoke(
    @Body() dto: RevokeRoleHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<{ success: true; revoked: boolean }> {
    return this.commandBus.execute(new RevokeRoleCommand(dto as never, user.userId));
  }
}
