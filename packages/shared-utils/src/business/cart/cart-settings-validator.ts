export interface CartSettingsInput {
  maxItems?: number;
  cartExpiryHours?: number;
}

export const validateCartSettings = (
  settings: Partial<CartSettingsInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (settings.maxItems !== undefined && settings.maxItems < 1) {
    errors.push('Max items must be at least 1');
  }
  if (settings.cartExpiryHours !== undefined && settings.cartExpiryHours < 1) {
    errors.push('Cart expiry hours must be at least 1');
  }
  return { isValid: errors.length === 0, errors };
};
