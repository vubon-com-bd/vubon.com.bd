export const parseJSON = <T>(json: string): T | null => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
};

export const stringifyJSON = (obj: unknown): string | null => {
  try {
    return JSON.stringify(obj);
  } catch {
    return null;
  }
};
