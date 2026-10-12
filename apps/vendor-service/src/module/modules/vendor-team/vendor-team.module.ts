/**
 * VendorTeamModule — team member + invite management
 * @module vendor-service/modules/vendor-team
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// ─── Controller ───
import { VendorTeamController } from '../../interfaces/controllers/rest/vendor-team.controller.js';

// ─── Service ───
import { VendorTeamService } from '../../application/services/impl/vendor-team.service.js';
import { VENDOR_TEAM_SERVICE } from '../../application/services/interfaces/vendor-team.service.interface.js';

// ─── Guards (reuse) ───
import { VendorOwnerGuard } from '../../interfaces/guards/vendor-owner.guard.js';

// ─── Command handlers ───
import {
  InviteTeamMemberHandler,
  AcceptTeamInviteHandler,
  RemoveTeamMemberHandler,
  ChangeTeamMemberRoleHandler,
  SuspendTeamMemberHandler,
} from '../../application/commands/team/index.js';

// ─── Query handlers ───
import {
  ListTeamMembersHandler,
  GetTeamMemberHandler,
} from '../../application/queries/team/index.js';

const SERVICES = [
  VendorTeamService,
  { provide: VENDOR_TEAM_SERVICE, useExisting: VendorTeamService },
];

const COMMAND_HANDLERS = [
  InviteTeamMemberHandler,
  AcceptTeamInviteHandler,
  RemoveTeamMemberHandler,
  ChangeTeamMemberRoleHandler,
  SuspendTeamMemberHandler,
];

const QUERY_HANDLERS = [
  ListTeamMembersHandler,
  GetTeamMemberHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [VendorTeamController],
  providers: [
    ...SERVICES,
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
    VendorOwnerGuard,
  ],
  exports: [
    VendorTeamService,
    VENDOR_TEAM_SERVICE,
  ],
})
export class VendorTeamModule {}
