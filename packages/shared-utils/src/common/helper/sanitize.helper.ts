export const sanitize = (input: string): string => {
  return input.replace(/[<>]/g, '');
};

export const sanitizeHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};
