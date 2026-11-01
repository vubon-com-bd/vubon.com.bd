import { NextResponse, type NextRequest } from 'next/server';

export interface RedirectRule {
  readonly from: string;
  readonly to: string;
  readonly permanent?: boolean;
}

/** Simple redirect table. */
export function redirectMiddleware(req: NextRequest, rules: readonly RedirectRule[]): NextResponse {
  const { pathname } = req.nextUrl;
  const rule = rules.find((r) => pathname === r.from || pathname.startsWith(`${r.from}/`));
  if (!rule) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = rule.to;
  return NextResponse.redirect(url, rule.permanent ? 308 : 307);
}
