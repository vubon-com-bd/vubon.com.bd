/**
 * UI gating helper — returns whether a UI element should be visible.
 * ⚠️ Hiding a button is NOT a security measure. Server MUST enforce.
 */
export function canShowUi(options: {
  readonly permissions: readonly string[];
  readonly required: string | readonly string[];
  readonly mode?: 'any' | 'all';
  readonly roles?: readonly string[];
  readonly requiredRoles?: readonly string[];
}): boolean {
  const { permissions, required, mode = 'all' } = options;
  return (function check(): boolean {
    const requiredList = Array.isArray(required) ? required : [required];
    if (requiredList.length === 0) return true;
    if (permissions.includes('*')) return true;
    const fn = (req: string): boolean =>
      permissions.some((owned) => {
        if (owned === req) return true;
        if (owned.endsWith(':*')) return req.startsWith(owned.slice(0, -1));
        return false;
      });
    return mode === 'all' ? requiredList.every(fn) : requiredList.some(fn);
  })();
}
