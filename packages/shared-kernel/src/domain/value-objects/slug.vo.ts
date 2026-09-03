import { ValueObject } from '../base/base.vo';
import { REGEX } from '@vubon/shared-constants';

export class Slug extends ValueObject<string> {
  protected validate(): void {
    if (!this._value || this._value.length === 0) {
      throw new Error('Slug cannot be empty');
    }
    if (!REGEX.SLUG.test(this._value)) {
      throw new Error('Invalid slug format');
    }
  }

  get normalized(): string {
    return this._value.toLowerCase();
  }

  get words(): string[] {
    return this._value.split('-');
  }

  toTitle(): string {
    return this._value
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  isEqual(slug: Slug): boolean {
    return this._value === slug._value;
  }

  startsWith(prefix: string): boolean {
    return this._value.startsWith(prefix);
  }

  endsWith(suffix: string): boolean {
    return this._value.endsWith(suffix);
  }

  contains(substring: string): boolean {
    return this._value.includes(substring);
  }

  static fromString(text: string): Slug {
    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    return new Slug(slug);
  }

  static fromTitle(title: string): Slug {
    return Slug.fromString(title);
  }

  static generateUnique(base: string, existingSlugs: string[]): Slug {
    let slug = Slug.fromString(base);
    let unique = slug;
    let counter = 1;
    while (existingSlugs.includes(unique._value)) {
      unique = new Slug(`${slug._value}-${counter}`);
      counter++;
    }
    return unique;
  }
}
