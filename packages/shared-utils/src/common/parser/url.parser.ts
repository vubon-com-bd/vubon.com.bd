export const parseURL = (url: string): URL => {
  return new URL(url);
};

export const parseURLParams = (url: string): Record<string, string> => {
  const parsed = new URL(url);
  const params: Record<string, string> = {};
  parsed.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};
