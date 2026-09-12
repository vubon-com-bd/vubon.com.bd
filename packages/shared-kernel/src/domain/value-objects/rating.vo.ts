import { ValueObject } from '../base/base.vo';

export class Rating extends ValueObject<number> {
  protected validate(): void {
    if (this._value < 0 || this._value > 5) {
      throw new Error('Rating must be between 0 and 5');
    }
  }

  get stars(): string {
    const full = Math.floor(this._value);
    const half = this._value % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
  }

  get percentage(): number {
    return (this._value / 5) * 100;
  }

  get label(): string {
    const percentage = this.percentage;
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 70) return 'Very Good';
    if (percentage >= 50) return 'Good';
    if (percentage >= 30) return 'Fair';
    return 'Poor';
  }

  isGreaterThan(rating: Rating): boolean {
    return this._value > rating._value;
  }

  isLessThan(rating: Rating): boolean {
    return this._value < rating._value;
  }

  isEqualTo(rating: Rating): boolean {
    return this._value === rating._value;
  }

  static fromNumber(value: number): Rating {
    return new Rating(value);
  }

  static fromPercentage(percentage: number): Rating {
    return new Rating((percentage / 100) * 5);
  }

  static average(ratings: Rating[]): Rating {
    if (ratings.length === 0) {
      return new Rating(0);
    }
    const sum = ratings.reduce((acc, r) => acc + r._value, 0);
    return new Rating(sum / ratings.length);
  }

  static zero(): Rating {
    return new Rating(0);
  }

  static perfect(): Rating {
    return new Rating(5);
  }
}
