/**
 * Barcode Generator — placeholder that validates input and returns a
 * structured result. Real rendering requires a library like `bwip-js`.
 * @module shared-utils/common/generator/barcode
 */

export interface BarcodeInput {
  data: string;
  format?: 'code128' | 'ean13' | 'upc';
}

export interface BarcodeResult {
  data: string;
  format: string;
  /** SVG or PNG data URL once a real library is wired in. */
  render?: string;
}

/**
 * Validates barcode input and returns a descriptor.
 * ⚠️ Does NOT render an image — integrate `bwip-js` for that.
 */
export const generateBarcode = (input: string | BarcodeInput): BarcodeResult => {
  const { data, format = 'code128' } =
    typeof input === 'string' ? { data: input, format: 'code128' as const } : input;

  if (!data || data.trim().length === 0) {
    throw new Error('Barcode data cannot be empty');
  }
  if (format === 'ean13' && !/^\d{13}$/.test(data)) {
    throw new Error('EAN-13 must be exactly 13 digits');
  }
  if (format === 'upc' && !/^\d{12}$/.test(data)) {
    throw new Error('UPC must be exactly 12 digits');
  }

  return { data, format };
};
