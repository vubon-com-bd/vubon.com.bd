import { REGEX } from '@vubon/shared-constants';

/**
 * Validate Email
 * ইমেইল ভেরিফাই করা
 */
export const isValidEmail = (email: string): boolean => {
  return REGEX.EMAIL.test(email);
};

/**
 * Validate Phone
 * ফোন নম্বর ভেরিফাই করা
 */
export const isValidPhone = (phone: string): boolean => {
  return REGEX.PHONE.test(phone);
};

/**
 * Validate Password
 * পাসওয়ার্ড ভেরিফাই করা
 */
export const isValidPassword = (password: string): boolean => {
  return REGEX.PASSWORD.test(password);
};

/**
 * Validate Slug
 * স্লাগ ভেরিফাই করা
 */
export const isValidSlug = (slug: string): boolean => {
  return REGEX.SLUG.test(slug);
};

/**
 * Validate NID
 * এনআইডি ভেরিফাই করা
 */
export const isValidNID = (nid: string): boolean => {
  return REGEX.NID.test(nid);
};

/**
 * Validate Birth Registration
 * জন্ম নিবন্ধন ভেরিফাই করা
 */
export const isValidBirthRegistration = (birthReg: string): boolean => {
  return REGEX.BIRTH_REG.test(birthReg);
};

/**
 * Validate bKash Number
 * বিকাশ নম্বর ভেরিফাই করা
 */
export const isValidBkashNumber = (number: string): boolean => {
  return REGEX.BKASH_NUMBER.test(number);
};

/**
 * Validate Nagad Number
 * নগদ নম্বর ভেরিফাই করা
 */
export const isValidNagadNumber = (number: string): boolean => {
  return REGEX.NAGAD_NUMBER.test(number);
};

/**
 * Validate Rocket Number
 * রকেট নম্বর ভেরিফাই করা
 */
export const isValidRocketNumber = (number: string): boolean => {
  return REGEX.ROCKET_NUMBER.test(number);
};

/**
 * Validate Postal Code
 * পোস্টাল কোড ভেরিফাই করা
 */
export const isValidPostalCode = (code: string): boolean => {
  return REGEX.POSTAL_CODE.test(code);
};

/**
 * Validate URL
 * ইউআরএল ভেরিফাই করা
 */
export const isValidURL = (url: string): boolean => {
  return REGEX.URL.test(url);
};

/**
 * Validate UUID
 * ইউইউআইডি ভেরিফাই করা
 */
export const isValidUUID = (uuid: string): boolean => {
  return REGEX.UUID.test(uuid);
};

/**
 * Validate Only Numbers
 * শুধু সংখ্যা ভেরিফাই করা
 */
export const isValidOnlyNumbers = (value: string): boolean => {
  return REGEX.ONLY_NUMBERS.test(value);
};

/**
 * Validate Only Letters
 * শুধু অক্ষর ভেরিফাই করা
 */
export const isValidOnlyLetters = (value: string): boolean => {
  return REGEX.ONLY_LETTERS.test(value);
};

/**
 * Validate Bangladesh Phone Number (All Operators)
 * বাংলাদেশের সব অপারেটরের ফোন নম্বর ভেরিফাই করা
 */
export const isValidBDPhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '');
  return /^(?:\+880|880|0)?(?:1[3-9]\d{8})$/.test(cleanPhone);
};

/**
 * Validate Email or Phone
 * ইমেইল অথবা ফোন ভেরিফাই করা
 */
export const isValidEmailOrPhone = (value: string): boolean => {
  return isValidEmail(value) || isValidPhone(value);
};

/**
 * Validate Strong Password
 * শক্তিশালী পাসওয়ার্ড ভেরিফাই করা
 */
export const isValidStrongPassword = (password: string): boolean => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasMinLength = password.length >= 8;

  return hasUppercase && hasLowercase && hasNumber && hasSpecial && hasMinLength;
};
