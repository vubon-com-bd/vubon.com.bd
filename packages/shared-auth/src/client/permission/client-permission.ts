/**
 * Client-side permission check — UI hint only.
 * ⚠️ NEVER use this for security. Server is authoritative.
 */
export function clientHasPermission(
  ownedPermissions: readonly string[],
  required: string | readonly string[],
  mode: 'any' | 'all' = 'all'
): boolean {
  const requiredList = Array.isArray(required) ? required : [required];
  if (requiredList.length === 0) return true;
  if (ownedPermissions.includes('*')) return true;

  const check = (req: string): boolean =>
    ownedPermissions.some((owned) => {
      if (owned === req) return true;
      if (owned.endsWith(':*')) {
        return req.startsWith(owned.slice(0, -1));
      }
      return false;
    });

  return mode === 'all' ? requiredList.every(check) : requiredList.some(check);
}
