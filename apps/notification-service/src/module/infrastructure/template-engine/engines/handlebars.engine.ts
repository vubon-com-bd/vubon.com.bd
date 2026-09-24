import { Injectable } from '@nestjs/common';

@Injectable()
export class HandlebarsEngine {
  readonly name = 'handlebars';

  render(template: string, variables: Record<string, unknown>): string {
    return template.replace(/\{\{\s*(\w+(?:\.\w+)*)\s*\}\}/g, (_, key: string) => {
      const value = this.resolvePath(variables, key);
      return value === undefined || value === null ? '' : String(value);
    });
  }

  private resolvePath(obj: Record<string, unknown>, path: string): unknown {
    return path.split('.').reduce<unknown>((acc, key) => {
      if (acc && typeof acc === 'object' && key in acc) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj);
  }
}
