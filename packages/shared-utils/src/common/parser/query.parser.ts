export const parseQuery = (query: string): Record<string, string> => {
  const params: Record<string, string> = {};
  const pairs = query.split('&');
  pairs.forEach((pair) => {
    const [key, value] = pair.split('=');
    if (key) {
      params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
    }
  });
  return params;
};

export const stringifyQuery = (params: Record<string, unknown>): string => {
  return Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
};
