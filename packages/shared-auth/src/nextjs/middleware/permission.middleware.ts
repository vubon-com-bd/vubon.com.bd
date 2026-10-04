import { NextResponse, type NextRequest } from 'next/server';

export interface PermissionRule {
  readonly path: string;
  readonly permissions: readonly string[];
  readonly mode?: 'any' | 'all';
}

export interface PermissionMiddlewareOptions {
  readonly rules: readonly PermissionRule[];
  readonly forbiddenPath?: string;
}

/**
 * Permission-based route guard for Next.js middleware.
 * Assumes `permissions` come from a server-verified token.
 */
export function permissionMiddleware(
  req: NextRequest,
  resolvePermissions: (req: NextRequest) => readonly string[] | null,
  options: PermissionMiddlewareOptions
): NextResponse {
  const { pathname } = req.nextUrl;
  const rule = options.rules.find((r) => pathname === r.path || pathname.startsWith(`${r.path}/`));
  if (!rule) return NextResponse.next();

  const perms = resolvePermissions(req);
  if (!perms) return NextResponse.next();

  const mode = rule.mode ?? 'all';
  const check = (req: string): boolean =>
    perms.includes('*') ||
    perms.some((p) => {
      if (p === req) return true;
      if (p.endsWith(':*')) return req.startsWith(p.slice(0, -1));
      return false;
    });

  const ok = mode === 'all' ? rule.permissions.every(check) : rule.permissions.some(check);
  if (ok) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = options.forbiddenPath ?? '/403';
  return NextResponse.redirect(url);
}
