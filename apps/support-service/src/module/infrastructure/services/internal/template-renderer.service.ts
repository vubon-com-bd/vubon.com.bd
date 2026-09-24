import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplateRendererService {
  render(
    template: string,
    variables: Readonly<Record<string, string>>,
  ): string {
    return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key: string) => {
      return variables[key] ?? '';
    });
  }

  extractVariables(template: string): readonly string[] {
    const matches = template.matchAll(/\{\{\s*(\w+)\s*\}\}/g);
    const vars = new Set<string>();
    for (const m of matches) {
      if (m[1]) vars.add(m[1]);
    }
    return [...vars];
  }
}
