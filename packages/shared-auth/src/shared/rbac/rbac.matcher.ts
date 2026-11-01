import { matchesRule, type RbacCheckContext } from './rbac.utils';
import type { RbacRule } from './rbac.types';

export interface RbacDecision {
  readonly allowed: boolean;
  readonly matchedRule?: RbacRule;
  readonly reason?: string;
}

/** Evaluate a list of rules; ANY matching rule grants access. */
export function evaluateRules(rules: readonly RbacRule[], ctx: RbacCheckContext): RbacDecision {
  if (rules.length === 0) return { allowed: false, reason: 'no-rules' };
  for (const rule of rules) {
    if (matchesRule(rule, ctx)) return { allowed: true, matchedRule: rule };
  }
  return { allowed: false, reason: 'no-match' };
}
