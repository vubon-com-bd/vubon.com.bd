import { Injectable, type ExecutionContext, ForbiddenException } from '@nestjs/common';
import type { AuthContext } from '@vubon/shared-types/auth';
import { BaseGuard } from './base.guard';

interface RequestWithUser {
  user?: AuthContext;
  params?: Record<string, string>;
  body?: Record<string, unknown>;
  query?: Record<string, unknown>;
}

export interface OwnerGuardOptions {
  readonly paramName?: string;
  readonly userIdField?: string;
}

/**
 * Ensures the authenticated user "owns" the resource identified in
 * request params/body by `paramName`.
 *
 * Apps must override `resolveOwnerId` to look up the resource's owner.
 */
@Injectable()
export abstract class OwnerGuard extends BaseGuard {
  protected paramName = 'id';

  abstract resolveOwnerId(req: RequestWithUser): Promise<string | null>;

  override async check(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const user = req.user;
    if (!user) throw new ForbiddenException('No authenticated user');

    const ownerId = await this.resolveOwnerId(req);
    if (!ownerId || ownerId !== user.userId) {
      throw new ForbiddenException('Resource does not belong to user');
    }
    return true;
  }
}
