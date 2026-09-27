/**
 * UserController — REST endpoints for user CRUD
 * @module user-service/interfaces/controllers/rest
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
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { CreateUserCommand } from '@application/commands/user/create-user.command';
import { UpdateUserCommand } from '@application/commands/user/update-user.command';
import { DeleteUserCommand } from '@application/commands/user/delete-user.command';
import { ActivateUserCommand } from '@application/commands/user/activate-user.command';
import { SuspendUserCommand } from '@application/commands/user/suspend-user.command';
import { GetUserQuery } from '@application/queries/user/get-user.query';
import { ListUsersQuery } from '@application/queries/user/list-users.query';
import { SearchUsersQuery } from '@application/queries/user/search-users.query';
import { CreateUserRequestDto } from '../../dtos/requests/user.request.dto.js';
import { UpdateUserRequestDto, SuspendUserRequestDto } from '../../dtos/requests/user.request.dto.js';
import { UserResponseDto, UserListResponseDto } from '../../dtos/responses/user.response.dto.js';
import { UserControllerMapper } from '../../mappers/user.controller.mapper.js';
import {
  ApiGetUser,
  ApiListUsers,
  ApiSearchUsers,
  ApiCreateUser,
  ApiUpdateUser,
  ApiDeleteUser,
} from '../../swagger/user.swagger.js';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiGetUser()
  async findById(@Param('id') id: string): Promise<UserResponseDto> {
    const appDto = await this.queryBus.execute(new GetUserQuery(id));
    return UserControllerMapper.toResponse(appDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiListUsers()
  async list(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
    @Query('type') type?: string,
    @Query('search') search?: string
  ): Promise<UserListResponseDto> {
    const p = Number(page) || 1;
    const l = Number(limit) || 20;
    const result = await this.queryBus.execute(
      new ListUsersQuery(p, l, status, type, search)
    );
    return UserControllerMapper.toListResponse(
      result.items,
      result.total,
      result.page,
      result.limit,
      result.totalPages
    );
  }

  @Get('search/:term')
  @UseGuards(JwtAuthGuard)
  @ApiSearchUsers()
  async search(
    @Param('term') term: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ): Promise<UserListResponseDto> {
    const p = Number(page) || 1;
    const l = Number(limit) || 20;
    const result = await this.queryBus.execute(new SearchUsersQuery(term, p, l));
    return UserControllerMapper.toListResponse(
      result.items,
      result.total,
      result.page,
      result.limit,
      result.totalPages
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateUser()
  async create(@Body() body: CreateUserRequestDto): Promise<UserResponseDto> {
    const appDto = UserControllerMapper.toCreateAppDto(body);
    const result = await this.commandBus.execute(new CreateUserCommand(appDto));
    return UserControllerMapper.toResponse(result);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiUpdateUser()
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserRequestDto
  ): Promise<UserResponseDto> {
    const appDto = UserControllerMapper.toUpdateAppDto(body);
    const result = await this.commandBus.execute(new UpdateUserCommand(id, appDto));
    return UserControllerMapper.toResponse(result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiDeleteUser()
  async delete(@Param('id') id: string): Promise<void> {
    await this.commandBus.execute(new DeleteUserCommand(id));
  }

  @Post(':id/activate')
  @UseGuards(JwtAuthGuard)
  async activate(@Param('id') id: string): Promise<UserResponseDto> {
    const result = await this.commandBus.execute(new ActivateUserCommand(id));
    return UserControllerMapper.toResponse(result);
  }

  @Post(':id/suspend')
  @UseGuards(JwtAuthGuard)
  async suspend(
    @Param('id') id: string,
    @Body() body: SuspendUserRequestDto
  ): Promise<UserResponseDto> {
    const result = await this.commandBus.execute(
      new SuspendUserCommand(id, body.reason, body.suspendedUntil)
    );
    return UserControllerMapper.toResponse(result);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: CurrentUserShape): Promise<UserResponseDto> {
    const appDto = await this.queryBus.execute(new GetUserQuery(user.userId));
    return UserControllerMapper.toResponse(appDto);
  }
}
