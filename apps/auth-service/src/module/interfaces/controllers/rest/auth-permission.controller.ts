/**
 * AuthPermissionController
 * @module auth-service/interfaces/controllers/rest
 */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';

import { ListAuthPermissionsQuery } from '../../../application/queries/auth/list-auth-permissions.query';

@ApiTags('Auth Permissions')
@Controller('auth/permissions')
@UseGuards(JwtAuthGuard)
export class AuthPermissionController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async list(@Query('resource') resource?: string) {
    const query = Object.create(ListAuthPermissionsQuery.prototype) as ListAuthPermissionsQuery & { resource?: string };
    query.resource = resource;
    return this.queryBus.execute(query);
  }
}
