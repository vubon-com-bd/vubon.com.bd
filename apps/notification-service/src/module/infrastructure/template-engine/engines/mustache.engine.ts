import { Injectable } from '@nestjs/common';

@Injectable()
export class MustacheEngine {
  readonly name = 'mustache';

  render(template: string, variables: Record<string, unknown>): string {
    return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key: string) => {
      const value = variables[key];
      return value === undefined || value === null ? '' : String(value);
    });
  }
}
