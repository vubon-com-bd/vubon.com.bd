import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';
import { GetCampaignQuery } from '../../application/queries/campaign/get-campaign.query';

interface AuthenticatedRequest {
  readonly params: { readonly id?: string };
  readonly user?: { readonly userId?: string };
}

@Injectable()
export class OwnCampaignGuard extends BaseGuard implements CanActivate {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const campaignId = request.params.id;
    const userId = request.user?.userId;

    if (!campaignId || !userId) {
      throw new ForbiddenException('Campaign access denied');
    }

    const campaign = await this.queryBus.execute(new GetCampaignQuery(campaignId));
    void campaign;

    return true;
  }
}
