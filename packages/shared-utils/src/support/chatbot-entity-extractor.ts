export interface EntityData {
  name: string;
  pattern?: string;
}

export const extractEntities = (
  message: string,
  entities: EntityData[]
): Record<string, string> => {
  const extracted: Record<string, string> = {};
  for (const entity of entities) {
    if (entity.pattern) {
      const regex = new RegExp(entity.pattern, 'i');
      const match = message.match(regex);
      if (match) {
        extracted[entity.name] = match[0];
      }
    }
  }
  return extracted;
};
