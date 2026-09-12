export const renderNotificationTemplate = (
  template: string,
  data: Record<string, unknown>
): string => {
  let rendered = template;
  for (const [key, value] of Object.entries(data)) {
    rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
  }
  return rendered;
};

export const renderNotificationSubject = (
  subject: string,
  data: Record<string, unknown>
): string => {
  let rendered = subject;
  for (const [key, value] of Object.entries(data)) {
    rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
  }
  return rendered;
};
