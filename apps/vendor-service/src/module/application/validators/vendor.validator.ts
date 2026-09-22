export class VendorValidator {
  static validateRegister(input: unknown): void {
    const data = input as Record<string, unknown>;
    if (!data.businessName || typeof data.businessName !== 'string') {
      throw new Error('businessName is required');
    }
    if (!data.contactEmail || typeof data.contactEmail !== 'string') {
      throw new Error('contactEmail is required');
    }
  }

  static validateUpdate(input: unknown): void {
    if (!input || typeof input !== 'object') {
      throw new Error('Invalid update payload');
    }
  }
}
