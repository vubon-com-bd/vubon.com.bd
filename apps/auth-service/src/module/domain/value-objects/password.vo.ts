/**
 * Password Value Object
 * Validates and encapsulates password
 */

import { BaseValueObject } from './base.vo.js';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_PATTERN,
} from '@vubon/auth-shared-constants';

export class Password extends BaseValueObject<string> {
  constructor(password: string) {
    // Validate password requirements
    if (!password || password.length === 0) {
      throw new Error('Password is required');
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
      throw new Error(`Password must be at least ${PASSWORD_MIN_LENGTH} characters long`);
    }

    if (password.length > PASSWORD_MAX_LENGTH) {
      throw new Error(`Password must not exceed ${PASSWORD_MAX_LENGTH} characters`);
    }

    if (!PASSWORD_PATTERN.test(password)) {
      throw new Error(
        'Password must contain at least one uppercase letter, ' +
          'one lowercase letter, one number, and one special character (@$!%*?&)'
      );
    }

    super(password);
  }

  /**
   * Get password strength score (0-100)
   */
  public getStrengthScore(): number {
    let score = 0;
    const password = this._value;

    // Length (max 40 points)
    if (password.length >= 12) score += 40;
    else if (password.length >= 10) score += 30;
    else if (password.length >= 8) score += 20;

    // Character variety (max 60 points)
    if (/[a-z]/.test(password)) score += 10;
    if (/[A-Z]/.test(password)) score += 10;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 15;
    if (password.length >= 12 && /[^A-Za-z0-9]/.test(password)) score += 10;

    return Math.min(score, 100);
  }

  /**
   * Get password strength label
   */
  public getStrengthLabel(): 'weak' | 'medium' | 'strong' | 'very-strong' {
    const score = this.getStrengthScore();
    if (score >= 80) return 'very-strong';
    if (score >= 60) return 'strong';
    if (score >= 40) return 'medium';
    return 'weak';
  }

  /**
   * Check if password is strong enough
   */
  public isStrong(): boolean {
    return this.getStrengthScore() >= 60;
  }

  /**
   * Check if password contains a common pattern
   */
  public isCommon(): boolean {
    const commonPasswords = [
      'password123',
      'admin123',
      'letmein',
      'welcome1',
      'iloveyou',
      '12345678',
      'qwerty123',
    ];
    return commonPasswords.some((common) => this._value.toLowerCase().includes(common));
  }

  /**
   * Get password complexity issues
   */
  public getComplexityIssues(): string[] {
    const issues: string[] = [];
    const password = this._value;

    if (password.length < 10) {
      issues.push('Password should be at least 10 characters long');
    }
    if (!/[a-z]/.test(password)) {
      issues.push('Password should contain lowercase letters');
    }
    if (!/[A-Z]/.test(password)) {
      issues.push('Password should contain uppercase letters');
    }
    if (!/[0-9]/.test(password)) {
      issues.push('Password should contain numbers');
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      issues.push('Password should contain special characters');
    }

    return issues;
  }
}
