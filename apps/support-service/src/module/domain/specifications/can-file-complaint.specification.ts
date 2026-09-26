/**
 * CanFileComplaintSpecification — complaint filing eligibility
 * @module support-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface CanFileComplaintContext {
  readonly userId: UserIdVO;
  readonly userHasActiveBlock: boolean;
  readonly description: string;
  readonly recentComplaintsCount: number;
  readonly maxRecentComplaints: number;
}

export class CanFileComplaintSpecification extends Specification<CanFileComplaintContext> {
  isSatisfiedBy(ctx: CanFileComplaintContext): boolean {
    if (!ctx.userId) return false;
    if (ctx.userHasActiveBlock) return false;
    if (typeof ctx.description !== 'string' || ctx.description.trim().length < 10) {
      return false;
    }
    if (ctx.recentComplaintsCount >= ctx.maxRecentComplaints) return false;
    return true;
  }
}
