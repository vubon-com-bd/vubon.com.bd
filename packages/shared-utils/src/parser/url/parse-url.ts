/**
 * Parse URL into detailed parts (safe, returns null on invalid)
 * @module shared-utils/parser/url
 *
 * ⚠️ Note: নাম ParsedFullUrl এবং parseFullUrl,
 * কারণ common/url/parse-url.ts-এ ParsedUrl/parseUrl আছে (আরো simple)।
 */
export interface ParsedFullUrl {
  readonly protocol: string;
  readonly host: string;
  readonly hostname: string;
  readonly port: string;
  readonly pathname: string;
  readonly search: string;
  readonly hash: string;
  readonly origin: string;
  readonly query: Record<string, string | string[]>;
}

export function parseFullUrl(value: string): ParsedFullUrl | null {
  try {
    const url = new URL(value);
    const query: Record<string, string | string[]> = {};
    url.searchParams.forEach((v, k) => {
      const existing = query[k];
      if (existing === undefined) query[k] = v;
      else if (Array.isArray(existing)) existing.push(v);
      else query[k] = [existing, v];
    });

    return {
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
