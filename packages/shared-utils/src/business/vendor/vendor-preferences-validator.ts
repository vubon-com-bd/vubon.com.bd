export interface PreferencesInput {
  vendorId: string;
}

export const validateVendorPreferences = (
  prefs: Partial<PreferencesInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!prefs.vendorId) errors.push('Vendor ID is required');
  return { isValid: errors.length === 0, errors };
};
