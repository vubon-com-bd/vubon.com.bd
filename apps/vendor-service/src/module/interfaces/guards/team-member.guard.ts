import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';
import type { VendorTeamRepository } from '../../domain/repositories/vendor-team.repository.interface';
import { VendorIdVO } from '../../domain/value-objects/primitives/vendor-id.vo';

interface RequestWithUser {
  user?: { id?: string; userId?: string };
  params: { id?: string };
}

@Injectable()
export class TeamMemberGuard extends BaseGuard {
  constructor(private readonly teamRepo: VendorTeamRepository) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const vendorId = request.params.id;
    if (!vendorId) return true;

    const userId = request.user?.id ?? request.user?.userId;
    if (!userId) throw new ForbiddenException('User not authenticated');

    const members = await this.teamRepo.findByVendorId(VendorIdVO.create(vendorId));
    const isMember = members.some((m) => m.userId.value === userId);
    if (!isMember) {
      throw new ForbiddenException('Not a team member');
    }
    return true;
  }
}
