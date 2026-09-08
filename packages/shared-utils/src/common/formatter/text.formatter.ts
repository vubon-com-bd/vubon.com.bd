export const formatText = (text: string): string => {
  return text.replace(/\s+/g, ' ').trim();
};

export const formatHtmlText = (html: string): string => {
  return html.replace(/<[^>]*>/g, '').trim();
};
