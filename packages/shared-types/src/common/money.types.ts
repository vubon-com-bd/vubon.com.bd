import { BaseValueObject } from './base.types';
import { CURRENCY, NUMBER_FORMAT } from '@vubon/shared-constants';

export interface MoneyData {
  amount: number;
  currency: keyof typeof CURRENCY;
}

export class Money implements BaseValueObject<MoneyData> {
  private _data: MoneyData;

  constructor(amount: number, currency: string) {
    this._data = {
      amount: amount,
      currency: currency as keyof typeof CURRENCY,
    };
  }

  // BaseValueObject এর জন্য value প্রপার্টি
  get value(): MoneyData {
    return { ...this._data };
  }

  // প্রয়োজনীয় অন্যান্য গেটার
  get amount(): number {
    return this._data.amount;
  }
  get currency(): keyof typeof CURRENCY {
    return this._data.currency;
  }

  isValid(): boolean {
    return this._data.amount >= 0 && !!this._data.currency;
  }

  equals(other: Money): boolean {
    return this._data.amount === other._data.amount && this._data.currency === other._data.currency;
  }

  add(other: Money): Money {
    if (this._data.currency !== other._data.currency) {
      throw new Error('Currency mismatch');
    }
    return new Money(this._data.amount + other._data.amount, this._data.currency);
  }

  subtract(other: Money): Money {
    if (this._data.currency !== other._data.currency) {
      throw new Error('Currency mismatch');
    }
    return new Money(this._data.amount - other._data.amount, this._data.currency);
  }

  multiply(factor: number): Money {
    return new Money(this._data.amount * factor, this._data.currency);
  }

  divide(factor: number): Money {
    if (factor === 0) {
      throw new Error('Cannot divide by zero');
    }
    return new Money(this._data.amount / factor, this._data.currency);
  }

  // NUMBER_FORMAT ব্যবহার করে ফরম্যাট করা
  getFormattedAmount(): string {
    const currencyConfig =
      NUMBER_FORMAT.CURRENCY[this._data.currency as keyof typeof NUMBER_FORMAT.CURRENCY];
    const decimalPlaces =
      currencyConfig?.decimalPlaces || NUMBER_FORMAT.DEFAULT.DECIMAL_PLACES || 2;
    const decimalSeparator =
      currencyConfig?.decimalSeparator || NUMBER_FORMAT.DEFAULT.DECIMAL_SEPARATOR || '.';
    const thousandSeparator =
      currencyConfig?.thousandSeparator || NUMBER_FORMAT.DEFAULT.THOUSAND_SEPARATOR || ',';
    const symbol = currencyConfig?.symbol || NUMBER_FORMAT.DEFAULT.CURRENCY_SYMBOL || '৳';

    // সংখ্যা ফরম্যাট করা
    const formattedNumber = this.formatNumber(
      this._data.amount,
      decimalPlaces,
      decimalSeparator,
      thousandSeparator
    );

    return `${symbol}${formattedNumber}`;
  }

  // NUMBER_FORMAT ব্যবহার করে সংখ্যা ফরম্যাট করা
  private formatNumber(
    value: number,
    decimalPlaces: number,
    decimalSeparator: string,
    thousandSeparator: string
  ): string {
    // দশমিক স্থান ঠিক করা
    const fixed = value.toFixed(decimalPlaces);
    const parts = fixed.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1] || '';

    // হাজার বিভাজক যোগ করা
    const withThousandSeparator = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

    // দশমিক অংশ যোগ করা
    return decimalPart
      ? `${withThousandSeparator}${decimalSeparator}${decimalPart}`
      : withThousandSeparator;
  }

  // NUMBER_FORMAT ব্যবহার করে বিনিময় হার ফরম্যাট
  getExchangeRate(targetCurrency: keyof typeof CURRENCY): string {
    const rate = this.getExchangeRateValue(targetCurrency);
    const currencyConfig =
      NUMBER_FORMAT.CURRENCY[targetCurrency as keyof typeof NUMBER_FORMAT.CURRENCY];
    const decimalPlaces =
      currencyConfig?.decimalPlaces || NUMBER_FORMAT.DEFAULT.DECIMAL_PLACES || 2;
    const decimalSeparator =
      currencyConfig?.decimalSeparator || NUMBER_FORMAT.DEFAULT.DECIMAL_SEPARATOR || '.';
    const thousandSeparator =
      currencyConfig?.thousandSeparator || NUMBER_FORMAT.DEFAULT.THOUSAND_SEPARATOR || ',';

    return this.formatNumber(rate, decimalPlaces, decimalSeparator, thousandSeparator);
  }

  // বিনিময় হার গণনা (সিম্পল)
  private getExchangeRateValue(targetCurrency: keyof typeof CURRENCY): number {
    // সিম্পল রেট - প্রকৃত অ্যাপ্লিকেশনে API থেকে নিতে হবে
    const rates: Record<string, number> = {
      BDT: 1,
      USD: 0.009,
      EUR: 0.0085,
      GBP: 0.0073,
    };
    const fromRate = rates[this._data.currency] || 1;
    const toRate = rates[targetCurrency] || 1;
    return toRate / fromRate;
  }

  // NUMBER_FORMAT ব্যবহার করে রাউন্ডিং
  round(decimals?: number): Money {
    const decimalPlaces = decimals || NUMBER_FORMAT.DEFAULT.DECIMAL_PLACES || 2;
    const factor = Math.pow(10, decimalPlaces);
    const rounded = Math.round(this._data.amount * factor) / factor;
    return new Money(rounded, this._data.currency);
  }

  // NUMBER_FORMAT ব্যবহার করে সিম্বল পাওয়া
  getCurrencySymbol(): string {
    const currencyConfig =
      NUMBER_FORMAT.CURRENCY[this._data.currency as keyof typeof NUMBER_FORMAT.CURRENCY];
    return currencyConfig?.symbol || NUMBER_FORMAT.DEFAULT.CURRENCY_SYMBOL || '৳';
  }

  // NUMBER_FORMAT ব্যবহার করে দশমিক স্থান পাওয়া
  getDecimalPlaces(): number {
    const currencyConfig =
      NUMBER_FORMAT.CURRENCY[this._data.currency as keyof typeof NUMBER_FORMAT.CURRENCY];
    return currencyConfig?.decimalPlaces || NUMBER_FORMAT.DEFAULT.DECIMAL_PLACES || 2;
  }

  // NUMBER_FORMAT ব্যবহার করে থাউজেন্ড সেপারেটর পাওয়া
  getThousandSeparator(): string {
    const currencyConfig =
      NUMBER_FORMAT.CURRENCY[this._data.currency as keyof typeof NUMBER_FORMAT.CURRENCY];
    return currencyConfig?.thousandSeparator || NUMBER_FORMAT.DEFAULT.THOUSAND_SEPARATOR || ',';
  }

  // NUMBER_FORMAT ব্যবহার করে ডেসিমাল সেপারেটর পাওয়া
  getDecimalSeparator(): string {
    const currencyConfig =
      NUMBER_FORMAT.CURRENCY[this._data.currency as keyof typeof NUMBER_FORMAT.CURRENCY];
    return currencyConfig?.decimalSeparator || NUMBER_FORMAT.DEFAULT.DECIMAL_SEPARATOR || '.';
  }

  // NUMBER_FORMAT ব্যবহার করে ফরম্যাট অপশন পাওয়া
  getFormatOptions(): {
    symbol: string;
    decimalPlaces: number;
    decimalSeparator: string;
    thousandSeparator: string;
  } {
    const currencyConfig =
      NUMBER_FORMAT.CURRENCY[this._data.currency as keyof typeof NUMBER_FORMAT.CURRENCY];
    return {
      symbol: currencyConfig?.symbol || NUMBER_FORMAT.DEFAULT.CURRENCY_SYMBOL || '৳',
      decimalPlaces: currencyConfig?.decimalPlaces || NUMBER_FORMAT.DEFAULT.DECIMAL_PLACES || 2,
      decimalSeparator:
        currencyConfig?.decimalSeparator || NUMBER_FORMAT.DEFAULT.DECIMAL_SEPARATOR || '.',
      thousandSeparator:
        currencyConfig?.thousandSeparator || NUMBER_FORMAT.DEFAULT.THOUSAND_SEPARATOR || ',',
    };
  }

  toString(): string {
    return this.getFormattedAmount();
  }

  toJSON(): MoneyData & { formatted: string; symbol: string } {
    return {
      ...this._data,
      formatted: this.getFormattedAmount(),
      symbol: this.getCurrencySymbol(),
    };
  }
}

export type MoneyAmount = number;

// NUMBER_FORMAT থেকে টাইপ
export type CurrencyFormat = typeof NUMBER_FORMAT.CURRENCY;
export type CurrencySymbol = string;
export type DecimalSeparator =
  (typeof NUMBER_FORMAT.DECIMAL_SEPARATOR)[keyof typeof NUMBER_FORMAT.DECIMAL_SEPARATOR];
export type ThousandSeparator =
  (typeof NUMBER_FORMAT.THOUSAND_SEPARATOR)[keyof typeof NUMBER_FORMAT.THOUSAND_SEPARATOR];

// মানি অপশন
export interface MoneyOptions {
  decimalPlaces?: number;
  symbol?: string;
  decimalSeparator?: string;
  thousandSeparator?: string;
}

// মানি রেঞ্জ
export interface MoneyRange {
  min: Money;
  max: Money;
  contains(money: Money): boolean;
  clamp(money: Money): Money;
}

// মানি ক্যালকুলেটর
export interface MoneyCalculator {
  add(a: Money, b: Money): Money;
  subtract(a: Money, b: Money): Money;
  multiply(money: Money, factor: number): Money;
  divide(money: Money, factor: number): Money;
  percentage(money: Money, percent: number): Money;
  tax(money: Money, rate: number): Money;
  discount(money: Money, rate: number): Money;
}
