import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  Permissions,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { CreateUserCommand } from '../../../application/commands/user/create-user.command';
import { UpdateUserCommand } from '../../../application/commands/user/update-user.command';
import { DeleteUserCommand } from '../../../application/commands/user/delete-user.command';
import { ActivateUserCommand } from '../../../application/commands/user/activate-user.command';
import { DeactivateUserCommand } from '../../../application/commands/user/deactivate-user.command';
import { SuspendUserCommand } from '../../../application/commands/user/suspend-user.command';
import { UnsuspendUserCommand } from '../../../application/commands/user/unsuspend-user.command';
import { GetUserQuery } from '../../../application/queries/user/get-user.query';
import { ListUsersQuery } from '../../../application/queries/user/list-users.query';
import {
  CreateUserRequestDto,
  UpdateUserRequestDto,
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
  async create(@Body() body: CreateUserRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new CreateUserCommand(
        body.email,
        body.password,
        body.acceptTerms,
        true,
        body.type ?? 'customer',
        body.phone,
        body.firstName,
        body.lastName,
      ),
    );
  }

  @Get()
  @Permissions(PERMISSION.USER_VIEW)
  async list(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<unknown> {
    const p = page ? Number(page) : 1;
    const l = limit ? Number(limit) : 20;
    return this.queryBus.execute(new ListUsersQuery(p, l));
  }

  @Get(':id')
  @Permissions(PERMISSION.USER_VIEW)
  @UserSwagger.Get()
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetUserQuery(id));
  }

  @Patch(':id')
  @Permissions(PERMISSION.USER_UPDATE)
  @UserSwagger.Update()
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateUserCommand(
        id,
        body.emailVerified,
        body.type,
        body.status,
        body.phone,
        body.username,
      ),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.USER_DELETE)
  @UserSwagger.Delete()
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }

  @Post(':id/activate')
  @Permissions(PERMISSION.USER_UPDATE)
  async activate(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new ActivateUserCommand(id));
  }

  @Post(':id/deactivate')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.USER_UPDATE)
  async deactivate(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeactivateUserCommand(id));
  }

  @Post(':id/suspend')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.USER_UPDATE)
  async suspend(
    @Param('id') id: string,
    @Body() body: { reason: string; until?: string },
  ): Promise<void> {
    return this.commandBus.execute(
      new SuspendUserCommand(id, body.reason, body.until),
    );
  }

  @Post(':id/unsuspend')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.USER_UPDATE)
  async unsuspend(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new UnsuspendUserCommand(id));
  }
}
