/**
 * VendorTeamController — team member + invite management
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
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { CurrentUser, Public } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { ParseUuidPipe } from '@vubon/shared-kernel/interfaces/pipes';

import { VENDOR_SWAGGER_TAGS, VENDOR_BEARER_AUTH } from '../../swagger/index.js';
import { VendorOwnerGuard } from '../../guards/vendor-owner.guard.js';
import { VendorOwner } from '../../decorators/vendor-owner.decorator.js';
import { VendorControllerMapper } from '../../mappers/vendor.controller.mapper.js';

import { InviteTeamMemberCommand } from '../../../application/commands/team/invite-team-member.command.js';
import { AcceptTeamInviteCommand } from '../../../application/commands/team/accept-team-invite.command.js';
import { RemoveTeamMemberCommand } from '../../../application/commands/team/remove-team-member.command.js';
import { ChangeTeamMemberRoleCommand } from '../../../application/commands/team/change-team-member-role.command.js';
import { SuspendTeamMemberCommand } from '../../../application/commands/team/suspend-team-member.command.js';

import { ListTeamMembersQuery } from '../../../application/queries/team/list-team-members.query.js';
import { GetTeamMemberQuery } from '../../../application/queries/team/get-team-member.query.js';

import type {
  InviteTeamMemberHttpDTO,
  AcceptTeamInviteHttpDTO,
  ChangeTeamMemberRoleHttpDTO,
} from '../../dtos/requests/vendor.http-dto.js';

@ApiTags(VENDOR_SWAGGER_TAGS.VENDOR_TEAM)
@ApiBearerAuth(VENDOR_BEARER_AUTH)
@Controller('vendors/:vendorId/team')
export class VendorTeamController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  // ─── Invite ───
  @Post('invite')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Invite a team member' })
  async invite(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() dto: InviteTeamMemberHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = VendorControllerMapper.toInviteTeamAppDto(vendorId, dto, user.userId);
    return this.commandBus.execute(new InviteTeamMemberCommand(appDto, user.userId));
  }

  // ─── Accept invite (public, no auth) ───
  @Post('accept-invite')
  @HttpCode(HttpStatus.OK)
  @Public()
  @ApiOperation({ summary: 'Accept a team invite' })
  async acceptInvite(
    @Body() dto: AcceptTeamInviteHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = VendorControllerMapper.toAcceptTeamInviteAppDto(dto, user.userId);
    return this.commandBus.execute(new AcceptTeamInviteCommand(appDto, user.userId));
  }

  // ─── Read ───
  @Get()
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'List team members' })
  async list(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new ListTeamMembersQuery(vendorId));
  }

  @Get(':memberId')
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Get team member' })
  async getMember(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Param('memberId', ParseUuidPipe) memberId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetTeamMemberQuery(vendorId, memberId));
  }

  // ─── Change role ───
  @Patch(':memberId/role')
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Change team member role' })
  async changeRole(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Param('memberId', ParseUuidPipe) memberId: string,
    @Body() dto: ChangeTeamMemberRoleHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const args = VendorControllerMapper.toRoleChangeArgs(dto);
    return this.commandBus.execute(
      new ChangeTeamMemberRoleCommand(vendorId, memberId, args.newRole, user.userId),
    );
  }

  // ─── Suspend member ───
  @Post(':memberId/suspend')
  @HttpCode(HttpStatus.OK)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Suspend a team member' })
  async suspend(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Param('memberId', ParseUuidPipe) memberId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new SuspendTeamMemberCommand(vendorId, memberId, user.userId),
    );
  }

  // ─── Remove member ───
  @Delete(':memberId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Remove a team member' })
  async remove(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Param('memberId', ParseUuidPipe) memberId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    return this.commandBus.execute(
      new RemoveTeamMemberCommand(vendorId, memberId, user.userId),
    );
  }
}
