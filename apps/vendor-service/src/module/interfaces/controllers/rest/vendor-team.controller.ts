import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param,
  Patch, Post, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { AddTeamMemberCommand } from '../../../application/commands/team';
import { UpdateTeamMemberCommand } from '../../../application/commands/team';
import { RemoveTeamMemberCommand } from '../../../application/commands/team';
import { AssignRoleCommand } from '../../../application/commands/team';
import { ListTeamMembersQuery } from '../../../application/queries/team';
import { GetTeamMemberQuery } from '../../../application/queries/team';
import {
  AddTeamMemberRequestDto,
  UpdateTeamMemberRequestDto,
} from '../../dtos/requests/team.request.dto';

@ApiTags('Vendor Team')
@ApiBearerAuth()
@Controller('vendors/team')
@UseGuards(JwtAuthGuard)
export class VendorTeamController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new ListTeamMembersQuery(user.userId));
  }

  @Get(':memberId')
  async get(@Param('memberId') memberId: string): Promise<unknown> {
    return this.queryBus.execute(new GetTeamMemberQuery(memberId));
  }

  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  async add(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: AddTeamMemberRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new AddTeamMemberCommand(user.userId, body.userId, body.role, body.permissions),
    );
  }

  @Patch('update')
  async update(@Body() body: UpdateTeamMemberRequestDto): Promise<void> {
    return this.commandBus.execute(
      new UpdateTeamMemberCommand(body.memberId, body.role, body.permissions),
    );
  }

  @Delete(':memberId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('memberId') memberId: string): Promise<void> {
    return this.commandBus.execute(new RemoveTeamMemberCommand(memberId));
  }

  @Post(':memberId/assign-role')
  @HttpCode(HttpStatus.OK)
  async assignRole(
    @Param('memberId') memberId: string,
    @Body() body: { role: string },
  ): Promise<void> {
    return this.commandBus.execute(new AssignRoleCommand(memberId, body.role));
  }
}
