/**
 * UI permission guard — hides/shows UI elements.
 * ⚠️ NOT a security boundary. Server is authoritative.
 */
export interface UiPermissionRule {
  readonly permission: string | readonly string[];
  readonly mode?: 'any' | 'all';
}

export function shouldRenderUi(
  ownedPermissions: readonly string[],
  rule: UiPermissionRule
): boolean {
  const required = Array.isArray(rule.permission) ? rule.permission : [rule.permission];
  if (required.length === 0) return true;
  if (ownedPermissions.includes('*')) return true;

  const check = (req: string): boolean =>
    ownedPermissions.some((p) => {
      if (p === req) return true;
      if (p.endsWith(':*')) return req.startsWith(p.slice(0, -1));
      return false;
    });

  const mode = rule.mode ?? 'all';
  return mode === 'all' ? required.every(check) : required.some(check);
}
