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
import { ListUserPermissionsQuery } from '../../../application/queries/user/list-user-permissions.query';
import { AssignPermissionCommand } from '../../../application/commands/user/assign-permission.command';
import { RevokePermissionCommand } from '../../../application/commands/user/revoke-permission.command';
import {
  PermissionAssignRequestDTO,
  PermissionRevokeRequestDTO,
} from '../../dtos/requests/permission.request.dto';

@ApiTags('User Permissions')
@Controller('user-permissions/:userId')
@UseGuards(JwtAuthGuard)
export class UserPermissionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(@Param('userId') userId: string): Promise<unknown> {
    return this.queryBus.execute(new ListUserPermissionsQuery(userId));
  }

  @Post('assign')
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async assign(
    @Param('userId') userId: string,
    @Body() body: PermissionAssignRequestDTO,
  ): Promise<void> {
    return this.commandBus.execute(
      new AssignPermissionCommand(userId, body.permission),
    );
  }

  @Post('revoke')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async revoke(
    @Param('userId') userId: string,
    @Body() body: PermissionRevokeRequestDTO,
  ): Promise<void> {
    return this.commandBus.execute(
      new RevokePermissionCommand(userId, body.permission),
    );
  }
}
