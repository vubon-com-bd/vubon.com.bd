import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  JwtAuthGuard,
  Permissions,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { ListUsersQuery } from '../../../application/queries/user/list-users.query';

@ApiTags('Logs')
@Controller('users/logs')
@UseGuards(JwtAuthGuard)
export class UserLogController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @Permissions(PERMISSION.REPORT_VIEW)
  async list(@Query('limit') limit?: string): Promise<unknown> {
    const parsed = limit ? Number(limit) : 100;
    void parsed;
    return this.queryBus.execute(new ListUsersQuery(1, 100));
  }
}
