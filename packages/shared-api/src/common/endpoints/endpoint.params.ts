/** Extract `:param` names from a template. */
export function extractParamNames(template: string): readonly string[] {
  const matches = template.matchAll(/:([A-Za-z0-9_]+)/g);
  const names: string[] = [];
  for (const m of matches) {
    if (m[1]) names.push(m[1]);
  }
  return names;
}

/** Check if all required params are provided. */
export function hasAllParams(template: string, params: Record<string, unknown>): boolean {
  return extractParamNames(template).every(
    (name) => params[name] !== undefined && params[name] !== null
  );
}
