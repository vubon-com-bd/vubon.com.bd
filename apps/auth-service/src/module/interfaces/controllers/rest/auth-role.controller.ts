/**
 * AuthRoleController
 * @module auth-service/interfaces/controllers/rest
 */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';

import { ListAuthRolesQuery } from '../../../application/queries/auth/list-auth-roles.query';

@ApiTags('Auth Roles')
@Controller('auth/roles')
@UseGuards(JwtAuthGuard)
export class AuthRoleController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async list() {
    // BaseQuery has a protected constructor; instantiate via cast.
    const query = Object.create(ListAuthRolesQuery.prototype) as ListAuthRolesQuery;
    return this.queryBus.execute(query);
  }
}
