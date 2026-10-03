export type PermissionString = string;

export interface PermissionCheckContext {
  readonly permissions: readonly PermissionString[];
  readonly required: PermissionString | readonly PermissionString[];
  readonly mode?: 'any' | 'all';
}

export interface PermissionMatcher {
  readonly pattern: string;
  readonly matches: (permission: PermissionString) => boolean;
}
