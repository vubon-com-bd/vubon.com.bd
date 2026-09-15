export function sortRoles(roles: readonly string[]): readonly string[] {
  return [...roles].sort((a, b) => a.localeCompare(b));
}

export function roleIsAdmin(roles: readonly string[]): boolean {
  return roles.includes('admin') || roles.includes('super_admin');
}

export function formatRoles(roles: readonly string[]): string {
  return roles
    .map((r) =>
      r
        .split('_')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ')
    )
    .join(', ');
}
