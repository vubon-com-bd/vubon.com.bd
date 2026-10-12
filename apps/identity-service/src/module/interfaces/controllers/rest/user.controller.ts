/**
 * UserController — REST endpoints for users
 * @module identity-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { CreateUserCommand } from '../../../application/commands/user/create-user.command.js';
import { UpdateUserCommand } from '../../../application/commands/user/update-user.command.js';
import { DeleteUserCommand } from '../../../application/commands/user/delete-user.command.js';
import { ActivateUserCommand } from '../../../application/commands/user/activate-user.command.js';
import { DeactivateUserCommand } from '../../../application/commands/user/deactivate-user.command.js';
import { SuspendUserCommand } from '../../../application/commands/user/suspend-user.command.js';
import { UnsuspendUserCommand } from '../../../application/commands/user/unsuspend-user.command.js';

import { GetUserQuery } from '../../../application/queries/user/get-user.query.js';
import { ListUsersQuery } from '../../../application/queries/user/list-users.query.js';

import { CreateUserHttpDTO } from '../../dtos/requests/user/create-user.request.dto.js';
import { UpdateUserHttpDTO } from '../../dtos/requests/user/update-user.request.dto.js';
import { DeleteUserHttpDTO } from '../../dtos/requests/user/delete-user.request.dto.js';
import { ActivateUserHttpDTO } from '../../dtos/requests/user/activate-user.request.dto.js';
import { DeactivateUserHttpDTO } from '../../dtos/requests/user/deactivate-user.request.dto.js';
import { SuspendUserHttpDTO } from '../../dtos/requests/user/suspend-user.request.dto.js';
import { UnsuspendUserHttpDTO } from '../../dtos/requests/user/unsuspend-user.request.dto.js';

import type { UserHttpResponseDTO } from '../../dtos/responses/user/user.response.dto.js';
import type { UserListHttpResponseDTO } from '../../dtos/responses/user/user-list.response.dto.js';

import { UserControllerMapper } from '../../mappers/user.controller.mapper.js';
import {
  ApiUserTag,
  ApiCreateUser,
  ApiGetUser,
  ApiListUsers,
  ApiUpdateUser,
  ApiDeleteUser,
} from '../../swagger/user.swagger.js';

@ApiUserTag()
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateUser()
  async create(@Body() dto: CreateUserHttpDTO): Promise<UserHttpResponseDTO> {
    const appDto = UserControllerMapper.toCreateAppDto(dto);
    const app = await this.commandBus.execute(new CreateUserCommand(appDto as never));
    return UserControllerMapper.toHttpResponse(app);
  }

  @Get()
  @ApiListUsers()
  async list(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<UserListHttpResponseDTO> {
    const result = await this.queryBus.execute(
      new ListUsersQuery(page ?? 1, limit ?? 20),
    );
    return result as UserListHttpResponseDTO;
  }

  @Get(':id')
  @ApiGetUser()
  async getById(@Param('id') id: string): Promise<UserHttpResponseDTO> {
    const app = await this.queryBus.execute(new GetUserQuery(id));
    return UserControllerMapper.toHttpResponse(app);
  }

  @Put(':id')
  @ApiUpdateUser()
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<UserHttpResponseDTO> {
    const appDto = UserControllerMapper.toUpdateAppDto(dto);
    const app = await this.commandBus.execute(
      new UpdateUserCommand(id, appDto as never, user.userId),
    );
    return UserControllerMapper.toHttpResponse(app);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDeleteUser()
  async delete(
    @Param('id') id: string,
    @Body() dto: DeleteUserHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    const appDto = UserControllerMapper.toDeleteAppDto({ ...dto, userId: id });
    await this.commandBus.execute(new DeleteUserCommand(appDto as never, user.userId));
  }

  @Post(':id/activate')
  @HttpCode(HttpStatus.OK)
  async activate(
    @Param('id') id: string,
    @Body() dto: ActivateUserHttpDTO,
  ): Promise<{ success: true; activated: boolean }> {
    const appDto = UserControllerMapper.toActivateAppDto({ ...dto, userId: id });
    return this.commandBus.execute(new ActivateUserCommand(appDto as never));
  }

  @Post(':id/deactivate')
  @HttpCode(HttpStatus.OK)
  async deactivate(
    @Param('id') id: string,
    @Body() dto: DeactivateUserHttpDTO,
  ): Promise<{ success: true; deactivated: boolean }> {
    const appDto = UserControllerMapper.toDeactivateAppDto({ ...dto, userId: id });
    return this.commandBus.execute(new DeactivateUserCommand(appDto as never));
  }

  @Post(':id/suspend')
  @HttpCode(HttpStatus.OK)
  async suspend(
    @Param('id') id: string,
    @Body() dto: SuspendUserHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<{ success: true; suspended: boolean }> {
    const appDto = UserControllerMapper.toSuspendAppDto({ ...dto, userId: id });
    return this.commandBus.execute(new SuspendUserCommand(appDto as never, user.userId));
  }

  @Post(':id/unsuspend')
  @HttpCode(HttpStatus.OK)
  async unsuspend(
    @Param('id') id: string,
    @Body() dto: UnsuspendUserHttpDTO,
  ): Promise<{ success: true; unsuspended: boolean }> {
    const appDto = UserControllerMapper.toUnsuspendAppDto({ ...dto, userId: id });
    return this.commandBus.execute(new UnsuspendUserCommand(appDto as never));
  }
}
