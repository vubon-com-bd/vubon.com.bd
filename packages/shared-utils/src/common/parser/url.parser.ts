/**
 * URL Parser.
 */
export const parseURL = (url: string): URL => {
  try {
    return new URL(url);
  } catch {
    throw new Error(`Invalid URL: ${url}`);
  }
};

export const parseURLParams = (url: string): Record<string, string> => {
  const parsed = parseURL(url);
  const params: Record<string, string> = {};
  parsed.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};

export const safeParseURL = (url: string): URL | null => {
  try {
    return new URL(url);
  } catch {
    return null;
  }
};

export const buildURL = (base: string, params: Record<string, unknown>): string => {
  const url = parseURL(base);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
};
