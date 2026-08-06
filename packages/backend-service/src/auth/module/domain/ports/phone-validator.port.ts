/**
 * Phone Validator Port
 * Defines the contract for phone number validation and normalization
 * The domain layer depends on this abstraction, not on concrete implementations
 * This follows the Dependency Inversion Principle (DIP)
 */
export interface IPhoneValidator {
  /**
   * Validate phone number format (Bangladeshi or international)
   * @param phone - The phone number string to validate
   * @returns True if the phone number format is valid, false otherwise
   */
  isValid(phone: string): boolean;

  /**
   * Normalize phone number to E.164 format
   * Example: 01712345678 -> +8801712345678
   * @param phone - The phone number to normalize
   * @returns The normalized phone number in E.164 format
   */
  normalize(phone: string): string;

  /**
   * Detect mobile network operator from phone number
   * Supports Bangladeshi operators: Grameenphone, Robi, Banglalink, Teletalk
   * @param phone - The phone number to detect operator from
   * @returns The operator name or null if not detected
   */
  getOperator(phone: string): string | null;

  /**
   * Check if the phone number is a Bangladeshi number
   * @param phone - The phone number to check
   * @returns True if the phone number is Bangladeshi, false otherwise
   */
  isBangladeshNumber(phone: string): boolean;
}
