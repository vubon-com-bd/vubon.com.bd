import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  JwtAuthGuard,
  Permissions,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { ListUserRolesQuery } from '../../../application/queries/user/list-user-roles.query';
import { AssignRoleCommand } from '../../../application/commands/user/assign-role.command';
import { RevokeRoleCommand } from '../../../application/commands/user/revoke-role.command';
import {
  RoleAssignRequestDTO,
  RoleRevokeRequestDTO,
} from '../../dtos/requests/role.request.dto';

@ApiTags('User Roles')
@Controller('user-roles/:userId')
@UseGuards(JwtAuthGuard)
export class UserRoleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(@Param('userId') userId: string): Promise<unknown> {
    return this.queryBus.execute(new ListUserRolesQuery(userId));
  }

  @Post('assign')
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async assign(
    @Param('userId') userId: string,
    @Body() body: RoleAssignRequestDTO,
  ): Promise<void> {
    return this.commandBus.execute(new AssignRoleCommand(userId, body.role));
  }

  @Post('revoke')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async revoke(
    @Param('userId') userId: string,
    @Body() body: RoleRevokeRequestDTO,
  ): Promise<void> {
    return this.commandBus.execute(new RevokeRoleCommand(userId, body.role));
  }
}
