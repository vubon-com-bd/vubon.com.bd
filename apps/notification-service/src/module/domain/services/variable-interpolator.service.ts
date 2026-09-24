export class VariableInterpolatorService {
  interpolate(
    source: string,
    variables: Readonly<Record<string, string | number | boolean>>,
  ): string {
    return source.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key: string) => {
      const value = variables[key];
      return value === undefined ? '' : String(value);
    });
  }

  extractVariables(source: string): readonly string[] {
    const matches = source.matchAll(/\{\{\s*(\w+)\s*\}\}/g);
    const found = new Set<string>();
    for (const match of matches) {
      if (match[1]) found.add(match[1]);
    }
    return Object.freeze([...found]);
  }
}
