/**
 * Auth Recovery Code Generator
 * প্রমীকরণ রিকোভারি কোড জেনারেটর
 */

import { idGenerator } from '../common/generator/id-generator';

export const AuthRecoveryCodeGenerator = {
  /**
   * Generate recovery codes
   * রিকোভারি কোড তৈরি করা
   */
  generate: (count: number = 10, length: number = 8): string[] => {
    const codes: string[] = [];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < count; i++) {
      let code = '';
      for (let j = 0; j < length; j++) {
        code += chars[Math.floor(Math.random() * chars.length)];
      }
      codes.push(code);
    }

    return codes;
  },

  /**
   * Generate formatted recovery codes
   * ফরম্যাটেড রিকোভারি কোড তৈরি করা
   */
  generateFormatted: (count: number = 10): { code: string; index: number }[] => {
    const codes = AuthRecoveryCodeGenerator.generate(count);
    return codes.map((code, index) => ({
      code: code.match(/.{4}/g)?.join('-') || code,
      index: index + 1,
    }));
  },

  /**
   * Generate recovery code with prefix
   * প্রিফিক্স সহ রিকোভারি কোড তৈরি করা
   */
  generateWithPrefix: (prefix: string = 'RC', count: number = 10, length: number = 6): string[] => {
    const codes: string[] = [];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < count; i++) {
      let random = '';
      for (let j = 0; j < length; j++) {
        random += chars[Math.floor(Math.random() * chars.length)];
      }
      codes.push(`${prefix}-${random}`);
    }

    return codes;
  },

  /**
   * Hash recovery code
   * রিকোভারি কোড হ্যাশ করা
   */
  hash: async (code: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(code);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  },

  /**
   * Verify recovery code
   * রিকোভারি কোড ভেরিফাই করা
   */
  verify: async (code: string, hash: string): Promise<boolean> => {
    const hashedCode = await AuthRecoveryCodeGenerator.hash(code);
    return hashedCode === hash;
  },

  /**
   * Generate recovery link
   * রিকোভারি লিংক তৈরি করা
   */
  generateLink: (
    userId: string,
    baseUrl: string,
    expiresIn: number = 3600
  ): { link: string; expiresAt: Date } => {
    const token = idGenerator.shortId(32);
    const expiresAt = new Date(Date.now() + expiresIn * 1000);
    const link = `${baseUrl}/recovery?token=${token}&userId=${userId}`;

    return { link, expiresAt };
  },
};
