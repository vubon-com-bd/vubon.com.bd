export const renderSmsTemplate = (template: string, data: Record<string, unknown>): string => {
  let rendered = template;
  for (const [key, value] of Object.entries(data)) {
    rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
  }
  return rendered;
};
