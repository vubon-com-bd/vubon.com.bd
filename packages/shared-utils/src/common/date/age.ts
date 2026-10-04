/**
 * Calculate age in years
 * @module shared-utils/common/date
 */
export function age(birthDate: Date, reference: Date = new Date()): number {
  let years = reference.getFullYear() - birthDate.getFullYear();
  const monthDiff = reference.getMonth() - birthDate.getMonth();
  const dayDiff = reference.getDate() - birthDate.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    years--;
  }
  return years;
}
