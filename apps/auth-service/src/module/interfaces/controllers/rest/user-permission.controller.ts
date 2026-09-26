/**
 * UserPermissionController
 * @module auth-service/interfaces/controllers/rest
 */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import type { UserId } from '@vubon/shared-types/common';

import { ListUserPermissionsQuery } from '../../../application/queries/user/list-user-permissions.query';

@ApiTags('Users Permissions')
@Controller('users/permissions')
@UseGuards(JwtAuthGuard)
export class UserPermissionController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':userId')
  async list(@Param('userId') userId: string) {
    return this.queryBus.execute(
      new ListUserPermissionsQuery(userId as UserId),
    );
  }
}
