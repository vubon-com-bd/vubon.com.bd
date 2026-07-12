/**
 * Password Validator Port - Domain Layer Interface
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module domain/ports/password-validator.port
 *
 * @description
 * Port (interface) for password validation and strength checking.
 * Defines the contract that infrastructure adapters must implement.
 * This keeps the domain layer clean and infrastructure-agnostic.
 *
 * Enterprise Rules:
 * ✅ Domain layer defines the interface (Port)
 * ✅ Infrastructure layer implements the interface (Adapter)
 * ✅ No external dependencies in domain layer
 * ✅ Follows Dependency Inversion Principle (DIP)
 * ✅ Easy to mock for unit testing
 */

// ============================================================
// Types (Domain-Specific)
// ============================================================

/**
 * Password strength levels (Domain-specific)
 */
export enum PasswordStrength {
  VERY_WEAK = 'very_weak',
  WEAK = 'weak',
  MEDIUM = 'medium',
  STRONG = 'strong',
  VERY_STRONG = 'very_strong',
}

/**
 * Password validation result
 */
export interface PasswordValidationResult {
  /** Whether the password is valid */
  isValid: boolean;
  /** Password strength level */
  strength: PasswordStrength;
  /** Password entropy in bits */
  entropy: number;
  /** List of validation errors (if any) */
  errors: string[];
  /** List of warnings (if any) */
  warnings: string[];
  /** List of suggestions for improvement */
  suggestions: string[];
  /** Character set analysis */
  characterSet?: {
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumbers: boolean;
    hasSpecial: boolean;
  };
  /** Password length */
  length: number;
}

/**
 * Password entropy result
 */
export interface EntropyResult {
  /** Entropy in bits */
  bits: number;
  /** Strength level */
  strength: PasswordStrength;
  /** Estimated crack time (human-readable) */
  estimatedCrackTime: string;
}

// ============================================================
// Port Interface (Domain Contract)
// ============================================================

/**
 * Password Validator Port Interface
 * Defines the contract for password operations in the domain layer.
 */
export interface IPasswordValidator {
  /**
   * Validate a password and return detailed results
   *
   * @param password - Plain text password
   * @param options - Optional validation options
   * @returns Detailed validation result
   */
  validate(
    password: string,
    options?: {
      /** Minimum required strength (default: MEDIUM) */
      minStrength?: PasswordStrength;
      /** Additional words to check against (e.g., user's name) */
      additionalCommonWords?: string[];
      /** Whether to check against common password list (default: true) */
      checkCommonPasswords?: boolean;
      /** Whether to check for personal info (default: false) */
      checkPersonalInfo?: boolean;
    }
  ): PasswordValidationResult;

  /**
   * Check if password meets minimum requirements
   *
   * @param password - Plain text password
   * @param minStrength - Minimum strength required (default: MEDIUM)
   * @returns True if password meets requirements
   */
  isStrongEnough(password: string, minStrength?: PasswordStrength): boolean;

  /**
   * Calculate password entropy
   *
   * @param password - Plain text password
   * @returns Entropy result with bits, strength, and crack time
   */
  calculateEntropy(password: string): EntropyResult;

  /**
   * Check if password is commonly used (on breach lists)
   *
   * @param password - Plain text password
   * @returns True if password is common
   */
  isCommonPassword(password: string): boolean;

  /**
   * Check if password contains personal information
   *
   * @param password - Plain text password
   * @param personalInfo - Personal information to check against
   * @returns True if password contains personal info
   */
  containsPersonalInfo(
    password: string,
    personalInfo: {
      email?: string;
      name?: string;
      phone?: string;
      username?: string;
      birthdate?: string;
    }
  ): boolean;

  /**
   * Generate a cryptographically secure random password
   *
   * @param length - Desired password length (default: 16)
   * @param options - Generation options
   * @returns Secure password string
   */
  generateSecurePassword(
    length?: number,
    options?: {
      includeLowercase?: boolean;
      includeUppercase?: boolean;
      includeNumbers?: boolean;
      includeSpecial?: boolean;
      excludeAmbiguous?: boolean;
    }
  ): string;

  /**
   * Get password strength description
   *
   * @param strength - PasswordStrength enum
   * @returns Human-readable description
   */
  getStrengthDescription(strength: PasswordStrength): string;

  /**
   * Get the recommended minimum length for a strength level
   *
   * @param strength - PasswordStrength enum
   * @returns Recommended minimum length
   */
  getRecommendedLength(strength: PasswordStrength): number;

  /**
   * Get password requirements for UI display
   *
   * @param password - The password to check requirements against
   * @param minStrength - Minimum strength required (default: MEDIUM)
   * @returns List of requirements with their status
   */
  getRequirements(
    password: string,
    minStrength?: PasswordStrength
  ): Array<{
    key: string;
    label: string;
    labelBn?: string;
    met: boolean;
  }>;
}

// ============================================================
// Utility Types for Testing
// ============================================================

/**
 * Mock password validator for testing
 * Can be used in unit tests to avoid external dependencies
 */
export class MockPasswordValidator implements IPasswordValidator {
  constructor(
    private readonly isValidResult: boolean = true,
    private readonly strength: PasswordStrength = PasswordStrength.STRONG,
    private readonly entropy: number = 70
  ) {}

  validate(
    password: string,
    options?: {
      minStrength?: PasswordStrength;
      additionalCommonWords?: string[];
      checkCommonPasswords?: boolean;
      checkPersonalInfo?: boolean;
    }
  ): PasswordValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Check if password is empty
    if (!password || password.length === 0) {
      errors.push('Password cannot be empty');
      suggestions.push('Please enter a password');
      return {
        isValid: false,
        strength: PasswordStrength.VERY_WEAK,
        entropy: 0,
        errors,
        warnings,
        suggestions,
        characterSet: {
          hasUppercase: false,
          hasLowercase: false,
          hasNumbers: false,
          hasSpecial: false,
        },
        length: 0,
      };
    }

    // Use options to determine validation behavior
    const minStrength = options?.minStrength || PasswordStrength.MEDIUM;
    const checkCommon = options?.checkCommonPasswords !== false;
    const checkPersonal = options?.checkPersonalInfo || false;

    // Check password strength based on length and complexity
    const length = password.length;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    
    let calculatedStrength = PasswordStrength.VERY_WEAK;
    let calculatedEntropy = 0;

    // Simple entropy calculation based on character set
    let charsetSize = 0;
    if (hasLowercase) charsetSize += 26;
    if (hasUppercase) charsetSize += 26;
    if (hasNumbers) charsetSize += 10;
    if (hasSpecial) charsetSize += 33;

    if (charsetSize > 0) {
      calculatedEntropy = length * Math.log2(charsetSize);
    }

    // Determine strength based on entropy
    if (calculatedEntropy >= 80) calculatedStrength = PasswordStrength.VERY_STRONG;
    else if (calculatedEntropy >= 60) calculatedStrength = PasswordStrength.STRONG;
    else if (calculatedEntropy >= 40) calculatedStrength = PasswordStrength.MEDIUM;
    else if (calculatedEntropy >= 20) calculatedStrength = PasswordStrength.WEAK;
    else calculatedStrength = PasswordStrength.VERY_WEAK;

    // Check minimum requirements
    if (length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!hasUppercase) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!hasLowercase) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!hasNumbers) {
      errors.push('Password must contain at least one number');
    }
    if (!hasSpecial) {
      warnings.push('Password should contain at least one special character');
      suggestions.push('Add a special character like !@#$%^&*()');
    }

    // Check common passwords
    if (checkCommon && this.isCommonPassword(password)) {
      errors.push('Password is too common or easily guessable');
      suggestions.push('Use a more unique password not found in common password lists');
    }

    // Check personal info
    if (checkPersonal && options?.additionalCommonWords) {
      const words = options.additionalCommonWords;
      for (const word of words) {
        if (password.toLowerCase().includes(word.toLowerCase())) {
          errors.push(`Password contains personal information: "${word}"`);
          suggestions.push(`Avoid using personal information like "${word}" in your password`);
        }
      }
    }

    // Check minimum strength requirement
    const strengthOrder: Record<PasswordStrength, number> = {
      [PasswordStrength.VERY_WEAK]: 0,
      [PasswordStrength.WEAK]: 1,
      [PasswordStrength.MEDIUM]: 2,
      [PasswordStrength.STRONG]: 3,
      [PasswordStrength.VERY_STRONG]: 4,
    };

    if (strengthOrder[calculatedStrength] < strengthOrder[minStrength]) {
      errors.push(`Password strength (${calculatedStrength}) is below minimum requirement (${minStrength})`);
      suggestions.push(`Use a stronger password with more characters and complexity`);
    }

    const isValid = errors.length === 0;

    return {
      isValid: isValid || this.isValidResult,
      strength: isValid ? calculatedStrength : this.strength,
      entropy: isValid ? calculatedEntropy : this.entropy,
      errors: isValid ? [] : errors,
      warnings,
      suggestions,
      characterSet: {
        hasUppercase,
        hasLowercase,
        hasNumbers,
        hasSpecial,
      },
      length,
    };
  }

  isStrongEnough(password: string, minStrength?: PasswordStrength): boolean {
    // Now using the parameters to avoid the 'unused' warning
    const minLength = this.getRecommendedLength(minStrength || PasswordStrength.MEDIUM);
    const hasMinLength = password.length >= minLength;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    
    const complexityScore = [hasUppercase, hasLowercase, hasNumbers, hasSpecial].filter(Boolean).length;
    const isComplex = complexityScore >= 3;
    const isNotCommon = !this.isCommonPassword(password);
    
    // Return based on mock validity but also consider the parameters
    return this.isValidResult && hasMinLength && isComplex && isNotCommon;
  }

  calculateEntropy(password: string): EntropyResult {
    // Use the password parameter to calculate a mock entropy
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    
    // Calculate actual entropy based on character set
    let charsetSize = 0;
    if (hasLowercase) charsetSize += 26;
    if (hasUppercase) charsetSize += 26;
    if (hasNumbers) charsetSize += 10;
    if (hasSpecial) charsetSize += 33;
    
    const entropyBits = charsetSize > 0 ? password.length * Math.log2(charsetSize) : 0;
    
    // Determine strength based on entropy
    let strength: PasswordStrength;
    if (entropyBits >= 80) strength = PasswordStrength.VERY_STRONG;
    else if (entropyBits >= 60) strength = PasswordStrength.STRONG;
    else if (entropyBits >= 40) strength = PasswordStrength.MEDIUM;
    else if (entropyBits >= 20) strength = PasswordStrength.WEAK;
    else strength = PasswordStrength.VERY_WEAK;
    
    // Estimate crack time
    let estimatedCrackTime: string;
    if (entropyBits >= 80) estimatedCrackTime = 'centuries';
    else if (entropyBits >= 60) estimatedCrackTime = 'years';
    else if (entropyBits >= 40) estimatedCrackTime = 'months';
    else if (entropyBits >= 28) estimatedCrackTime = 'days';
    else if (entropyBits >= 20) estimatedCrackTime = 'hours';
    else estimatedCrackTime = 'seconds';
    
    return {
      bits: Math.round(entropyBits * 10) / 10,
      strength,
      estimatedCrackTime,
    };
  }

  isCommonPassword(password: string): boolean {
    // Check against a mock common password list
    const commonPasswords = [
      'password', '123456', 'password123', 'admin', 'welcome',
      'qwerty', 'abc123', 'letmein', 'monkey', 'dragon',
      'master', 'hello', 'freedom', 'whatever', 'trustno1',
      '123456789', '12345678', '12345', '1234567', '123123'
    ];
    return commonPasswords.includes(password.toLowerCase());
  }

  containsPersonalInfo(
  password: string,
  personalInfo: {
    email?: string;
    name?: string;
    phone?: string;
    username?: string;
    birthdate?: string;
  }
): boolean {
  // Check if password contains any personal info
  const lowerPassword = password.toLowerCase();
  
  // Check email - সম্পূর্ণ TypeScript-safe
  if (personalInfo.email) {
    const emailParts = personalInfo.email.split('@');
    // নিশ্চিত করা যে array-তে কমপক্ষে একটি এলিমেন্ট আছে এবং সেটি খালি নয়
    const localPart = emailParts[0];
    if (localPart && localPart.length > 2) {
      const emailPart = localPart.toLowerCase();
      if (lowerPassword.includes(emailPart)) return true;
    }
  }
  
  // Check name
  if (personalInfo.name) {
    const nameParts = personalInfo.name.toLowerCase().split(' ');
    for (const part of nameParts) {
      if (part.length > 2 && lowerPassword.includes(part)) return true;
    }
  }
  
  // Check phone
  if (personalInfo.phone) {
    const phoneDigits = personalInfo.phone.replace(/\D/g, '');
    if (phoneDigits.length >= 4 && password.includes(phoneDigits)) return true;
  }
  
  // Check username
  if (personalInfo.username && personalInfo.username.length > 2) {
    if (lowerPassword.includes(personalInfo.username.toLowerCase())) return true;
  }
  
  // Check birthdate
  if (personalInfo.birthdate) {
    const dateStr = personalInfo.birthdate.replace(/-/g, '');
    if (password.includes(dateStr)) return true;
  }
  
  return false;
}

  generateSecurePassword(
    length: number = 16,
    options?: {
      includeLowercase?: boolean;
      includeUppercase?: boolean;
      includeNumbers?: boolean;
      includeSpecial?: boolean;
      excludeAmbiguous?: boolean;
    }
  ): string {
    // Generate a mock secure password
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specials = '!@#$%^&*()_+-=';
    const ambiguous = 'il1Lo0O';
    
    let chars = '';
    if (options?.includeLowercase !== false) chars += lowercase;
    if (options?.includeUppercase !== false) chars += uppercase;
    if (options?.includeNumbers !== false) chars += numbers;
    if (options?.includeSpecial !== false) chars += specials;
    
    if (chars.length === 0) chars = lowercase + uppercase + numbers;
    
    if (options?.excludeAmbiguous) {
      for (const char of ambiguous) {
        chars = chars.replace(char, '');
      }
    }
    
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    
    return result;
  }

  getStrengthDescription(strength: PasswordStrength): string {
    const descriptions: Record<PasswordStrength, string> = {
      [PasswordStrength.VERY_WEAK]: 'Very Weak - Easily guessable',
      [PasswordStrength.WEAK]: 'Weak - Could be cracked quickly',
      [PasswordStrength.MEDIUM]: 'Medium - Acceptable for most uses',
      [PasswordStrength.STRONG]: 'Strong - Good password with high security',
      [PasswordStrength.VERY_STRONG]: 'Very Strong - Excellent password security',
    };
    return descriptions[strength] || 'Unknown';
  }

  getRecommendedLength(strength: PasswordStrength): number {
    const lengths: Record<PasswordStrength, number> = {
      [PasswordStrength.VERY_WEAK]: 6,
      [PasswordStrength.WEAK]: 8,
      [PasswordStrength.MEDIUM]: 10,
      [PasswordStrength.STRONG]: 12,
      [PasswordStrength.VERY_STRONG]: 16,
    };
    return lengths[strength] || 8;
  }

  getRequirements(
    password: string,
    minStrength: PasswordStrength = PasswordStrength.MEDIUM
  ): Array<{ key: string; label: string; labelBn?: string; met: boolean }> {
    const minLength = this.getRecommendedLength(minStrength);
    
    // Use the password parameter to check requirements
    const requirements = [
      {
        key: 'length',
        label: `At least ${minLength} characters`,
        labelBn: `কমপক্ষে ${minLength}টি অক্ষর`,
        met: password.length >= minLength,
      },
      {
        key: 'uppercase',
        label: 'At least one uppercase letter',
        labelBn: 'কমপক্ষে একটি বড় হাতের অক্ষর',
        met: /[A-Z]/.test(password),
      },
      {
        key: 'lowercase',
        label: 'At least one lowercase letter',
        labelBn: 'কমপক্ষে একটি ছোট হাতের অক্ষর',
        met: /[a-z]/.test(password),
      },
      {
        key: 'number',
        label: 'At least one number',
        labelBn: 'কমপক্ষে একটি সংখ্যা',
        met: /[0-9]/.test(password),
      },
      {
        key: 'special',
        label: 'At least one special character',
        labelBn: 'কমপক্ষে একটি বিশেষ অক্ষর',
        met: /[^A-Za-z0-9]/.test(password),
      },
    ];

    // If mock says valid, mark all as met
    if (this.isValidResult) {
      requirements.forEach(req => (req.met = true));
    }

    return requirements;
  }
}
