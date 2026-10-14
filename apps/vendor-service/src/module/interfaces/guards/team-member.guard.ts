/**
 * TeamMemberGuard — checks user is a team member of the vendor
 * @module vendor-service/interfaces/guards
 */
import {
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { HTTP_STATUS, ROLE } from '@vubon/shared-constants/common';
import {
  VENDOR_TEAM_REPOSITORY,
  type VendorTeamRepository,
} from '../../domain/repositories/vendor-team.repository.interface.js';
import { UserIdVO } from '../../domain/value-objects/primitives/user-id.vo.js';
import {
  TEAM_MEMBER_META_KEY,
  type TeamMemberRequirement,
} from '../decorators/team-member.decorator.js';

@Injectable()
export class TeamMemberGuard extends BaseGuard {
  constructor(
    @Inject(VENDOR_TEAM_REPOSITORY)
    private readonly teamRepo: VendorTeamRepository,
    private readonly reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requirement = this.reflector.getAllAndOverride<TeamMemberRequirement>(
      TEAM_MEMBER_META_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requirement) return true;

    const req = context.switchToHttp().getRequest<{
      user?: { userId?: string; roles?: readonly string[] };
      vendor?: { vendorId?: string };
    }>();

    const user = req.user;
    if (!user?.userId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Authentication required',
      });
    }

    const isAdmin =
      user.roles?.includes(ROLE.ADMIN) ||
      user.roles?.includes(ROLE.SUPER_ADMIN);
    if (isAdmin) return true;

    const vendorId = req.vendor?.vendorId;
    if (!vendorId) return true;

    const member = await this.teamRepo.findByUserAndVendor(
      user.userId,
      vendorId,
    );
    if (!member || !member.isActive()) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'You are not an active team member of this vendor',
      });
    }

    if (requirement.roles && requirement.roles.length > 0) {
      const hasRole = requirement.roles.includes(member.role.value);
      if (!hasRole) {
        throw new ForbiddenException({
          statusCode: HTTP_STATUS.FORBIDDEN,
          message: `Requires one of roles: ${requirement.roles.join(', ')}`,
        });
      }
    }

    if (requirement.permissions && requirement.permissions.length > 0) {
      const hasAll = requirement.permissions.every((p) =>
        member.hasPermission(p),
      );
      if (!hasAll) {
        throw new ForbiddenException({
          statusCode: HTTP_STATUS.FORBIDDEN,
          message: `Missing permissions: ${requirement.permissions.join(', ')}`,
        });
      }
    }

    void UserIdVO;
    return true;
  }
}
