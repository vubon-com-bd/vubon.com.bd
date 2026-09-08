import { Name } from '@vubon/shared-types';

export const formatFullName = (name: Name): string => {
  const parts = [name.value.firstName, name.value.middleName, name.value.lastName].filter(Boolean);
  return parts.join(' ');
};

export const formatInitials = (name: Name): string => {
  const first = name.value.firstName.charAt(0).toUpperCase();
  const last = name.value.lastName.charAt(0).toUpperCase();
  return `${first}${last}`;
};
