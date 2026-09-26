/**
 * CanTakeSurveySpecification — survey participation eligibility
 * @module support-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface CanTakeSurveyContext {
  readonly userId: UserIdVO;
  readonly surveyActive: boolean;
  readonly surveyClosed: boolean;
  readonly alreadyResponded: boolean;
  readonly userHasActiveBlock: boolean;
}

export class CanTakeSurveySpecification extends Specification<CanTakeSurveyContext> {
  isSatisfiedBy(ctx: CanTakeSurveyContext): boolean {
    if (!ctx.userId) return false;
    if (!ctx.surveyActive) return false;
    if (ctx.surveyClosed) return false;
    if (ctx.alreadyResponded) return false;
    if (ctx.userHasActiveBlock) return false;
    return true;
  }
}
