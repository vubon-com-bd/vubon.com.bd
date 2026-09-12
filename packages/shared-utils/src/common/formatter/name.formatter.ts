/**
 * Name Formatter.
 */
import type { Name } from '@vubon/shared-types';

interface NameLike {
  firstName?: string;
  middleName?: string;
  lastName?: string;
}

const extract = (n: Name | NameLike): NameLike => {
  if ('value' in n && n.value) return n.value as NameLike;
  return n as NameLike;
};

export const formatFullName = (name: Name | NameLike): string => {
  const n = extract(name);
  return [n.firstName, n.middleName, n.lastName].filter(Boolean).join(' ');
};

export const formatInitials = (name: Name | NameLike): string => {
  const n = extract(name);
  const first = n.firstName?.charAt(0)?.toUpperCase() ?? '';
  const last = n.lastName?.charAt(0)?.toUpperCase() ?? '';
  return `${first}${last}`;
};
