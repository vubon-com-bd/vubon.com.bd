export const highlightText = (text: string, query: string, tag: string = 'mark'): string => {
  const words = query.split(' ').filter(Boolean);
  let highlighted = text;
  for (const word of words) {
    const regex = new RegExp(`(${word})`, 'gi');
    highlighted = highlighted.replace(regex, `<${tag}>$1</${tag}>`);
  }
  return highlighted;
};

export const highlightFields = (
  fields: Record<string, string>,
  query: string
): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(fields)) {
    result[key] = highlightText(value, query);
  }
  return result;
};
