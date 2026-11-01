/**
 * AuthPermissionController — REST endpoints for permissions
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

import { AssignPermissionCommand } from '../../../application/commands/user/assign-permission.command.js';
import { RevokePermissionCommand } from '../../../application/commands/user/revoke-permission.command.js';

import { ListAuthPermissionsQuery } from '../../../application/queries/auth/list-auth-permissions.query.js';

import { AssignPermissionHttpDTO } from '../../dtos/requests/user/assign-permission.request.dto.js';
import { RevokePermissionHttpDTO } from '../../dtos/requests/user/revoke-permission.request.dto.js';

import type { PermissionHttpResponseDTO } from '../../dtos/responses/permission/permission.response.dto.js';

import { AuthPermissionControllerMapper } from '../../mappers/auth-permission.controller.mapper.js';

@ApiTags('auth-permission')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('auth/permissions')
export class AuthPermissionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List all permissions' })
  async list(): Promise<readonly PermissionHttpResponseDTO[]> {
    const permissions = await this.queryBus.execute(new ListAuthPermissionsQuery());
    return AuthPermissionControllerMapper.toHttpList(permissions);
  }

  @Post('assign')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Grant permission to a user' })
  async assign(
    @Body() dto: AssignPermissionHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<{ success: true; granted: boolean }> {
    return this.commandBus.execute(new AssignPermissionCommand(dto as never, user.userId));
  }

  @Post('revoke')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Revoke permission from a user' })
  async revoke(
    @Body() dto: RevokePermissionHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<{ success: true; revoked: boolean }> {
    return this.commandBus.execute(new RevokePermissionCommand(dto as never, user.userId));
  }
}
