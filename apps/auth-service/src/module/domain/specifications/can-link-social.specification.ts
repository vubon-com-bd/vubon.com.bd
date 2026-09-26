/**
 * CanLinkSocialSpecification
 * @module auth-service/domain/specifications
 */
import { UserEntity } from '../entities/user.entity';
import { SocialProviderVO } from '../value-objects/primitives/social-provider.vo';

export interface CanLinkSocialContext {
  readonly provider: SocialProviderVO;
  readonly alreadyLinkedForUser: boolean;
  readonly alreadyLinkedToAnotherUser: boolean;
  readonly providerAllowed: boolean;
}

export class CanLinkSocialSpecification {
  static isSatisfiedBy(
    user: UserEntity,
    ctx: CanLinkSocialContext,
  ): boolean {
    if (!user.isActive()) return false;
    if (!ctx.providerAllowed) return false;
    if (ctx.alreadyLinkedForUser) return false;
    if (ctx.alreadyLinkedToAnotherUser) return false;
    return true;
  }

  static explain(
    user: UserEntity,
    ctx: CanLinkSocialContext,
  ): readonly string[] {
    const reasons: string[] = [];
    if (!user.isActive()) reasons.push('user_not_active');
    if (!ctx.providerAllowed) reasons.push('provider_not_allowed');
    if (ctx.alreadyLinkedForUser) reasons.push('already_linked_to_user');
    if (ctx.alreadyLinkedToAnotherUser) reasons.push('linked_to_another_user');
    return reasons;
  }
}
