/**
 * VendorTeamController — REST endpoints for team members
 * @module vendor-service/interfaces/controllers/rest
 */
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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser, type CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { AddTeamMemberCommand } from '../../../application/commands/team/add-team-member.command.js';
import { UpdateTeamMemberCommand } from '../../../application/commands/team/update-team-member.command.js';
import { RemoveTeamMemberCommand } from '../../../application/commands/team/remove-team-member.command.js';
import { AssignRoleCommand } from '../../../application/commands/team/assign-role.command.js';

import { ListTeamMembersQuery } from '../../../application/queries/team/list-team-members.query.js';
import { GetTeamMemberQuery } from '../../../application/queries/team/get-team-member.query.js';

import {
  AddTeamMemberHttpDTO,
  UpdateTeamMemberHttpDTO,
  RemoveTeamMemberHttpDTO,
  AssignRoleHttpDTO,
} from '../../dtos/requests/team.request.dto.js';
import type {
  TeamMemberHttpResponseDTO,
  TeamInviteHttpResponseDTO,
  TeamListHttpResponseDTO,
} from '../../dtos/responses/team.response.dto.js';

import { TeamControllerMapper } from '../../mappers/team.controller.mapper.js';
import { IdempotencyHeader } from '../../decorators/idempotency-key.decorator.js';

@ApiTags('vendor-team')
@ApiBearerAuth('bearer')
@Controller('vendors/:vendorId/team')
@UseGuards(JwtAuthGuard)
export class VendorTeamController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Invite a team member' })
  async invite(
    @Param('vendorId') vendorId: string,
    @Body() dto: AddTeamMemberHttpDTO,
    @CurrentUser() user: CurrentUserShape,
    @IdempotencyHeader() idempotencyKey?: string,
  ): Promise<TeamInviteHttpResponseDTO> {
    const appDto = { ...TeamControllerMapper.toAddAppDto(dto), vendorId };
    return this.commandBus.execute(
      new AddTeamMemberCommand(
        idempotencyKey ? { ...appDto, idempotencyKey } : appDto,
        user.userId,
      ),
    );
  }

  @Patch(':memberId')
  @ApiOperation({ summary: 'Update a team member' })
  async update(
    @Param('memberId') memberId: string,
    @Body() dto: UpdateTeamMemberHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<TeamMemberHttpResponseDTO> {
    return this.commandBus.execute(
      new UpdateTeamMemberCommand(TeamControllerMapper.toUpdateAppDto(memberId, dto), user.userId),
    );
  }

  @Delete(':memberId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a team member' })
  async remove(
    @Param('memberId') memberId: string,
    @Body() dto: RemoveTeamMemberHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    await this.commandBus.execute(
      new RemoveTeamMemberCommand(TeamControllerMapper.toRemoveAppDto(memberId, dto), user.userId),
    );
  }

  @Post(':memberId/role')
  @ApiOperation({ summary: 'Assign a role to a team member' })
  async assignRole(
    @Param('memberId') memberId: string,
    @Body() dto: AssignRoleHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<TeamMemberHttpResponseDTO> {
    return this.commandBus.execute(
      new AssignRoleCommand(TeamControllerMapper.toAssignRoleAppDto(memberId, dto), user.userId),
    );
  }

  @Get()
  @ApiOperation({ summary: 'List team members' })
  async list(
    @Param('vendorId') vendorId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<TeamListHttpResponseDTO> {
    return this.queryBus.execute(
      new ListTeamMembersQuery(vendorId, {
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 20,
      }),
    );
  }

  @Get(':memberId')
  @ApiOperation({ summary: 'Get team member by ID' })
  async getById(
    @Param('memberId') memberId: string,
  ): Promise<TeamMemberHttpResponseDTO> {
    return this.queryBus.execute(new GetTeamMemberQuery(memberId));
  }
}
