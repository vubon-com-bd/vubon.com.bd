/**
 * Common Validator
 * কমন ভ্যালিডেটর
 */
export class CommonValidator {
  static validateEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  static validatePhone(phone: string): boolean {
    const regex = /^(?:\+880|880|0)?(?:1[3-9]\d{8})$/;
    return regex.test(phone);
  }

  static validateNID(nid: string): boolean {
    const regex = /^[0-9]{10,17}$/;
    return regex.test(nid);
  }

  static validatePassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  static validateUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static validateUUID(uuid: string): boolean {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return regex.test(uuid);
  }

  static validatePostalCode(code: string): boolean {
    const regex = /^[0-9]{4}$/;
    return regex.test(code);
  }

  static isRequired<T>(value: T | undefined | null): boolean {
    return value !== undefined && value !== null && value !== '';
  }

  static isPositiveNumber(value: number): boolean {
    return typeof value === 'number' && value > 0;
  }

  static isInRange(value: number, min: number, max: number): boolean {
    return typeof value === 'number' && value >= min && value <= max;
  }

  static isLengthValid(value: string, min: number, max: number): boolean {
    return typeof value === 'string' && value.length >= min && value.length <= max;
  }

  static isEnumValue<T extends Record<string, string>>(value: string, enumType: T): boolean {
    return Object.values(enumType).includes(value);
  }

  static sanitizeString(value: string): string {
    return value.trim().replace(/\s+/g, ' ');
  }

  static sanitizeSlug(value: string): string {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  static sanitizePhone(phone: string): string {
    return phone.replace(/\D/g, '');
  }

  static maskEmail(email: string): string {
    const [username, domain] = email.split('@');
    if (!username || !domain) return email;
    const masked =
      username.length <= 3
        ? username[0] + '***'
        : username.slice(0, 2) + '***' + username.slice(-2);
    return `${masked}@${domain}`;
  }

  static maskPhone(phone: string): string {
    const clean = phone.replace(/\D/g, '');
    if (clean.length < 4) return phone;
    const visible = clean.slice(-4);
    const masked = '*'.repeat(clean.length - 4);
    return `${masked}${visible}`;
  }
}
