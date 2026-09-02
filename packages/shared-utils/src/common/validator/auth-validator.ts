import { REGEX } from '@vubon/shared-constants';

/**
 * Auth Validator
 * অথেনটিকেশন ভ্যালিডেটর
 */
export const authValidator = {
  /**
   * Validate password strength
   * পাসওয়ার্ড শক্তি ভ্যালিডেট করা
   */
  validatePassword: (
    password: string
  ): {
    isValid: boolean;
    errors: string[];
    strength: 'weak' | 'medium' | 'strong';
  } => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    // Calculate strength
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    let strength: 'weak' | 'medium' | 'strong' = 'weak';
    if (score >= 5) strength = 'strong';
    else if (score >= 3) strength = 'medium';

    return {
      isValid: errors.length === 0,
      errors,
      strength,
    };
  },

  /**
   * Validate phone number (Bangladesh)
   * ফোন নম্বর ভ্যালিডেট করা (বাংলাদেশ)
   */
  validatePhone: (
    phone: string
  ): {
    isValid: boolean;
    formatted: string;
    operator: 'gp' | 'robi' | 'airtel' | 'banglaLink' | 'teletalk' | 'unknown';
  } => {
    const cleanPhone = phone.replace(/\D/g, '');
    const isValid = REGEX.PHONE.test(cleanPhone);

    let operator: 'gp' | 'robi' | 'airtel' | 'banglaLink' | 'teletalk' | 'unknown' = 'unknown';

    if (isValid) {
      const prefix = cleanPhone.slice(-11, -8);
      switch (prefix) {
        case '017':
          operator = 'gp';
          break;
        case '018':
          operator = 'robi';
          break;
        case '019':
          operator = 'banglaLink';
          break;
        case '016':
          operator = 'airtel';
          break;
        case '015':
          operator = 'teletalk';
          break;
        default:
          operator = 'unknown';
      }
    }

    // Format phone
    let formatted = phone;
    if (isValid && cleanPhone.length === 11) {
      formatted = `+880 ${cleanPhone.slice(0, 3)}-${cleanPhone.slice(3, 7)}-${cleanPhone.slice(7)}`;
    }

    return {
      isValid,
      formatted,
      operator,
    };
  },

  /**
   * Validate NID (National ID)
   * এনআইডি ভ্যালিডেট করা
   */
  validateNID: (
    nid: string
  ): {
    isValid: boolean;
    formatted: string;
    type: 'smart' | 'old' | 'invalid';
  } => {
    const cleanNID = nid.replace(/\D/g, '');
    const isValid = REGEX.NID.test(cleanNID);

    let type: 'smart' | 'old' | 'invalid' = 'invalid';
    if (isValid) {
      type = cleanNID.length === 17 ? 'smart' : 'old';
    }

    // Format NID
    let formatted = cleanNID;
    if (isValid && cleanNID.length === 17) {
      formatted = `${cleanNID.slice(0, 6)}-${cleanNID.slice(6, 13)}-${cleanNID.slice(13)}`;
    } else if (isValid && cleanNID.length === 10) {
      formatted = `${cleanNID.slice(0, 3)}-${cleanNID.slice(3, 6)}-${cleanNID.slice(6)}`;
    }

    return {
      isValid,
      formatted,
      type,
    };
  },

  /**
   * Validate birth registration
   * জন্ম নিবন্ধন ভ্যালিডেট করা
   */
  validateBirthRegistration: (
    birthReg: string
  ): {
    isValid: boolean;
    formatted: string;
  } => {
    const cleanBirthReg = birthReg.replace(/\D/g, '');
    const isValid = REGEX.BIRTH_REG.test(cleanBirthReg);

    let formatted = cleanBirthReg;
    if (isValid && cleanBirthReg.length === 17) {
      formatted = `${cleanBirthReg.slice(0, 4)}-${cleanBirthReg.slice(4, 8)}-${cleanBirthReg.slice(8, 13)}-${cleanBirthReg.slice(13)}`;
    }

    return {
      isValid,
      formatted,
    };
  },

  /**
   * Validate OTP
   * ওটিপি ভ্যালিডেট করা
   */
  validateOTP: (
    otp: string,
    length: number = 6
  ): {
    isValid: boolean;
    code: string;
  } => {
    const cleanOTP = otp.replace(/\D/g, '');
    const isValid = cleanOTP.length === length && /^\d+$/.test(cleanOTP);

    return {
      isValid,
      code: cleanOTP,
    };
  },

  /**
   * Validate token
   * টোকেন ভ্যালিডেট করা
   */
  validateToken: (
    token: string
  ): {
    isValid: boolean;
    type: 'jwt' | 'uuid' | 'base64' | 'unknown';
  } => {
    // Check if JWT
    const jwtPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
    if (jwtPattern.test(token)) {
      return { isValid: true, type: 'jwt' };
    }

    // Check if UUID
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidPattern.test(token)) {
      return { isValid: true, type: 'uuid' };
    }

    // Check if Base64
    const base64Pattern = /^[A-Za-z0-9+/]*={0,2}$/;
    if (base64Pattern.test(token)) {
      return { isValid: true, type: 'base64' };
    }

    return { isValid: false, type: 'unknown' };
  },
};
