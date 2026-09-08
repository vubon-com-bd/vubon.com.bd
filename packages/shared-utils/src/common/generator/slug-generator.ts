export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const generateUniqueSlug = (text: string, existingSlugs: string[]): string => {
  let slug = generateSlug(text);
  let counter = 1;
  while (existingSlugs.includes(slug)) {
    slug = `${generateSlug(text)}-${counter}`;
    counter++;
  }
  return slug;
};
