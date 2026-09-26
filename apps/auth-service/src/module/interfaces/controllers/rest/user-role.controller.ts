/**
 * UserRoleController
 * @module auth-service/interfaces/controllers/rest
 */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import type { UserId } from '@vubon/shared-types/common';

import { ListUserRolesQuery } from '../../../application/queries/user/list-user-roles.query';

@ApiTags('Users Roles')
@Controller('users/roles')
@UseGuards(JwtAuthGuard)
export class UserRoleController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':userId')
  async list(@Param('userId') userId: string) {
    return this.queryBus.execute(new ListUserRolesQuery(userId as UserId));
  }
}
