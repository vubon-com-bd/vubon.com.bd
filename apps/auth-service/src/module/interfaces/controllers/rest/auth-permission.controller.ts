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
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { ListAuthPermissionsQuery } from '../../../application/queries/auth/list-auth-permissions.query';
import { AssignPermissionCommand } from '../../../application/commands/user/assign-permission.command';
import { RevokePermissionCommand } from '../../../application/commands/user/revoke-permission.command';
import {
  PermissionAssignRequestDTO,
  PermissionRevokeRequestDTO,
} from '../../dtos/requests/permission.request.dto';

@ApiTags('Permissions')
@Controller('auth/permissions')
@UseGuards(JwtAuthGuard)
export class AuthPermissionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async listAll(): Promise<unknown> {
    return this.queryBus.execute(new ListAuthPermissionsQuery());
  }

  @Post('assign')
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async assign(@Body() body: PermissionAssignRequestDTO): Promise<void> {
    return this.commandBus.execute(
      new AssignPermissionCommand(body.userId, body.permission),
    );
  }

  @Post('revoke')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async revoke(@Body() body: PermissionRevokeRequestDTO): Promise<void> {
    return this.commandBus.execute(
      new RevokePermissionCommand(body.userId, body.permission),
    );
  }
}
