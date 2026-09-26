/**
 * UserController — CRUD
 * @module auth-service/interfaces/controllers/rest
 */
import {
  Controller, Get, Post, Put, Delete, Body, Param, Query,
  HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import type { UserId } from '@vubon/shared-types/common';

import { CreateUserCommand } from '../../../application/commands/user/create-user.command';
import { UpdateUserCommand } from '../../../application/commands/user/update-user.command';
import { DeleteUserCommand } from '../../../application/commands/user/delete-user.command';
import { GetUserQuery } from '../../../application/queries/user/get-user.query';
import { ListUsersQuery } from '../../../application/queries/user/list-users.query';
import {
  CreateUserRequestDTO,
  UpdateUserRequestDTO,
  DeleteUserRequestDTO,
} from '../../dtos/requests/user.request.dto';
import { UserControllerMapper } from '../../mappers/user.controller.mapper';
import { UserSwagger } from '../../swagger/user.swagger';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly mapper: UserControllerMapper,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UserSwagger.Create()
  async create(@Body() body: CreateUserRequestDTO) {
    const result = await this.commandBus.execute(
      new CreateUserCommand(body as never),
    );
    return this.mapper.toResponse(result as never);
  }

  @Get()
  @UserSwagger.List()
  async list(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    const rows = await this.queryBus.execute(
      new ListUsersQuery(Number(limit) || 50, Number(offset) || 0),
    );
    return this.mapper.toResponseList(rows as never);
  }

  @Get(':id')
  @UserSwagger.Get()
  async get(@Param('id') id: string) {
    const result = await this.queryBus.execute(
      new GetUserQuery(id as UserId),
    );
    return this.mapper.toResponse(result as never);
  }

  @Put(':id')
  @UserSwagger.Update()
  async update(@Param('id') id: string, @Body() body: UpdateUserRequestDTO) {
    const result = await this.commandBus.execute(
      new UpdateUserCommand(id as UserId, body as never),
    );
    return this.mapper.toResponse(result as never);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UserSwagger.Delete()
  async remove(
    @Param('id') id: string,
    @Body() body: DeleteUserRequestDTO,
  ): Promise<void> {
    await this.commandBus.execute(
      new DeleteUserCommand(id as UserId, {
        reason: body.reason,
        hardDelete: body.hardDelete ?? false,
      }),
    );
  }
}
