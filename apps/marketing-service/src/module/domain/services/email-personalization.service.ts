export class EmailPersonalizationService {
  personalize(template: string, variables: Readonly<Record<string, string>>): string {
    return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key: string) => {
      return variables[key] ?? '';
    });
  }
}
