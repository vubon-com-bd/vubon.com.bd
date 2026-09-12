export interface SettingsInput {
  vendorId: string;
  key: string;
  value: unknown;
}

export const validateVendorSettings = (
  settings: Partial<SettingsInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!settings.vendorId) errors.push('Vendor ID is required');
  if (settings.key && !settings.value) {
    errors.push('Value is required when key is provided');
  }
  return { isValid: errors.length === 0, errors };
};
