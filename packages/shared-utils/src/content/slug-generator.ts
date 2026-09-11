export const generateContentSlugFromText = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const generateUniqueContentSlug = (text: string, existingSlugs: string[]): string => {
  const baseSlug = generateContentSlugFromText(text);
  if (!existingSlugs.includes(baseSlug)) return baseSlug;
  let counter = 1;
  let uniqueSlug = `${baseSlug}-${counter}`;
  while (existingSlugs.includes(uniqueSlug)) {
    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }
  return uniqueSlug;
};
