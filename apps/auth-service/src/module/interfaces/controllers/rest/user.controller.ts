import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, Patch, Post, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Permissions } from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { CreateUserCommand } from '../../../application/commands/user/create-user.command';
import { UpdateUserCommand } from '../../../application/commands/user/update-user.command';
import { DeleteUserCommand } from '../../../application/commands/user/delete-user.command';
import { GetUserQuery } from '../../../application/queries/user/get-user.query';
import { ListUsersQuery } from '../../../application/queries/user/list-users.query';
import {
  UserCreateRequestDTO,
  UserUpdateRequestDTO,
} from '../../dtos/requests/user.request.dto';
import { UserSwagger } from '../../swagger/user.swagger';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(PERMISSION.USER_CREATE)
  @UserSwagger.Create()
  async create(@Body() body: UserCreateRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new CreateUserCommand(
        body.email,
        body.password,
        body.acceptTerms,
        body.sendVerificationEmail ?? true,
        body.type,
        body.phone,
        body.role,
        body.firstName,
        body.lastName,
        body.username,
      ),
    );
  }

  @Get()
  @Permissions(PERMISSION.USER_VIEW)
  async list(): Promise<unknown> {
    return this.queryBus.execute(new ListUsersQuery());
  }

  // ⚠️ IMPORTANT: This route must be AFTER all static sub-routes
  @Get('id/:id')
  @Permissions(PERMISSION.USER_VIEW)
  @UserSwagger.Get()
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetUserQuery(id));
  }

  @Patch('id/:id')
  @Permissions(PERMISSION.USER_UPDATE)
  async update(
    @Param('id') id: string,
    @Body() body: UserUpdateRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateUserCommand(
        id,
        body.emailVerified,
        body.type,
        body.status,
        body.phone,
        body.isMfaEnabled,
        body.username,
        body.phoneVerified,
      ),
    );
  }

  @Delete('id/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.USER_DELETE)
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }
}
