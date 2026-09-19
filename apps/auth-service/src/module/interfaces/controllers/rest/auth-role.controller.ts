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
import {
  JwtAuthGuard,
  Permissions,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { ListAuthRolesQuery } from '../../../application/queries/auth/list-auth-roles.query';
import { AssignRoleCommand } from '../../../application/commands/user/assign-role.command';
import { RevokeRoleCommand } from '../../../application/commands/user/revoke-role.command';
import {
  RoleAssignRequestDTO,
  RoleRevokeRequestDTO,
} from '../../dtos/requests/role.request.dto';

@ApiTags('Roles')
@Controller('auth/roles')
@UseGuards(JwtAuthGuard)
export class AuthRoleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async listAll(): Promise<unknown> {
    return this.queryBus.execute(new ListAuthRolesQuery());
  }

  @Post('assign')
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async assign(@Body() body: RoleAssignRequestDTO): Promise<void> {
    return this.commandBus.execute(new AssignRoleCommand(body.userId, body.role));
  }

  @Post('revoke')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async revoke(@Body() body: RoleRevokeRequestDTO): Promise<void> {
    return this.commandBus.execute(new RevokeRoleCommand(body.userId, body.role));
  }
}
