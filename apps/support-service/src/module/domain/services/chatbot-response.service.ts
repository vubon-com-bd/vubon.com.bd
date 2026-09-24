export class ChatbotResponseService {
  render(template: string, variables: Readonly<Record<string, string>>): string {
    return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key: string) => {
      return variables[key] ?? '';
    });
  }
}
