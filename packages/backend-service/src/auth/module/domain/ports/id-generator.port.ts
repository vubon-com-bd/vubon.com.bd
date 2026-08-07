/**
 * ID Generator Port
 * Defines the contract for generating unique IDs (UUID, nano ID, etc.)
 * The domain layer depends on this abstraction, not on concrete implementations
 * This follows the Dependency Inversion Principle (DIP)
 */
export interface IIdGenerator {
  /**
   * Generate a new unique ID
   * @returns A unique ID string (UUID v7 or nano ID)
   */
  generate(): string;

  /**
   * Generate multiple unique IDs
   * @param count - The number of IDs to generate
   * @returns An array of unique ID strings
   * @throws {Error} If count is less than 1 or exceeds maximum allowed
   */
  generateBulk(count: number): string[];

  /**
   * Validate an ID format
   * @param id - The ID string to validate
   * @returns True if the ID format is valid, false otherwise
   */
  isValid(id: string): boolean;
}
