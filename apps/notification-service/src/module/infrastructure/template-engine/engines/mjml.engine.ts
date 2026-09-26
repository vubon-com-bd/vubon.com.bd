import { Injectable } from '@nestjs/common';

@Injectable()
export class MjmlEngine {
  readonly name = 'mjml';

  render(mjmlSource: string, variables: Record<string, unknown>): string {
    // ⚠️ Actual MJML compile — external package
    // Simplified: wrap in basic HTML + interpolate
    const interpolated = mjmlSource.replace(
      /\{\{\s*(\w+)\s*\}\}/g,
      (_, key: string) => {
        const value = variables[key];
        return value === undefined || value === null ? '' : String(value);
      },
    );
    return `<html><body>${interpolated}</body></html>`;
  }
}
