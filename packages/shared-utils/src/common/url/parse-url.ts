/**
 * Parse URL into parts (safe, returns null on invalid)
 * @module shared-utils/common/url
 */
export interface ParsedUrl {
  readonly href: string;
  readonly protocol: string;
  readonly host: string;
  readonly hostname: string;
  readonly port: string;
  readonly pathname: string;
  readonly search: string;
  readonly hash: string;
  readonly origin: string;
  readonly query: Readonly<Record<string, string>>;
}

export function parseUrl(value: string): ParsedUrl | null {
  try {
    const url = new URL(value);
    const query: Record<string, string> = {};
    url.searchParams.forEach((v, k) => {
      query[k] = v;
    });
    return {
      href: url.href,
      protocol: url.protocol,
      host: url.host,
      hostname: url.hostname,
      port: url.port,
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
      origin: url.origin,
      query,
    };
  } catch {
    return null;
  }
}
