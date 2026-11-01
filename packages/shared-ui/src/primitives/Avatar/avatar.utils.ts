const PALETTE = [
  'bg-blue-500',
  'bg-green-500',
  'bg-amber-500',
  'bg-red-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-cyan-500',
  'bg-indigo-500',
] as const;

/** Deterministic color from a string. */
export function colorFromString(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  return PALETTE[Math.abs(hash) % PALETTE.length] ?? 'bg-slate-500';
}

/** Initials from a name (max 2). */
export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) {
    return (parts[0] ?? '?').charAt(0).toUpperCase();
  }
  return ((parts[0]?.charAt(0) ?? '') + (parts[1]?.charAt(0) ?? '')).toUpperCase();
}
