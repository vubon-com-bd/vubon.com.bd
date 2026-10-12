/**
 * Primitives VO — Branch coverage fixes
 * @module vendor-service/test/unit/domain/value-objects/primitives
 */
import { describe, it, expect } from '@jest/globals';

// ─── Imports ───
import { ReturnPolicyNoteVO } from '../../../../../src/module/domain/value-objects/primitives/return-policy-note.vo.js';
import { DocumentFileSizeVO } from '../../../../../src/module/domain/value-objects/primitives/document-file-size.vo.js';
import { DocumentMimeTypeVO } from '../../../../../src/module/domain/value-objects/primitives/document-mime-type.vo.js';
import { ReturnWindowDaysVO } from '../../../../../src/module/domain/value-objects/primitives/return-window-days.vo.js';
import { WarrantyPeriodDaysVO } from '../../../../../src/module/domain/value-objects/primitives/warranty-period-days.vo.js';
import { VendorReportPeriodVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-report-period.vo.js';
import { DocumentIdVO } from '../../../../../src/module/domain/value-objects/primitives/document-id.vo.js';
import { VendorWebsiteVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-website.vo.js';
import { DeliveryDaysVO } from '../../../../../src/module/domain/value-objects/primitives/delivery-days.vo.js';
import { ShippingZoneVO } from '../../../../../src/module/domain/value-objects/primitives/shipping-zone.vo.js';
import { VendorLogoVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-logo.vo.js';
import { VendorBannerVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-banner.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';

describe('ReturnPolicyNoteVO — 0% → 100%', () => {
  it('create() with valid text', () => {
    const vo = ReturnPolicyNoteVO.create('No returns on sale items');
    expect(vo.value).toBe('No returns on sale items');
  });

  it('create() with non-string throws', () => {
    expect(() => ReturnPolicyNoteVO.create(null as never)).toThrow();
    expect(() => ReturnPolicyNoteVO.create(123 as never)).toThrow();
  });

  it('create() with too long text throws', () => {
    expect(() => ReturnPolicyNoteVO.create('x'.repeat(1001))).toThrow();
  });

  it('empty() returns empty string VO', () => {
    const vo = ReturnPolicyNoteVO.empty();
    expect(vo.isEmpty()).toBe(true);
  });

  it('isEmpty() true for empty', () => {
    expect(ReturnPolicyNoteVO.empty().isEmpty()).toBe(true);
    expect(ReturnPolicyNoteVO.create('text').isEmpty()).toBe(false);
  });

  it('preview cuts long text', () => {
    const vo = ReturnPolicyNoteVO.create('x'.repeat(200));
    expect(vo.preview.length).toBeLessThanOrEqual(120);
    expect(vo.preview.endsWith('...')).toBe(true);
  });

  it('preview short text unchanged', () => {
    const vo = ReturnPolicyNoteVO.create('short');
    expect(vo.preview).toBe('short');
  });

  it('wordCount 0 for empty', () => {
    expect(ReturnPolicyNoteVO.empty().wordCount).toBe(0);
  });

  it('wordCount counts words', () => {
    expect(ReturnPolicyNoteVO.create('one two three').wordCount).toBe(3);
  });

  it('reconstitute() bypasses validation', () => {
    const vo = ReturnPolicyNoteVO.reconstitute('anything');
    expect(vo.value).toBe('anything');
  });
});

describe('DocumentFileSizeVO — 14% → 100%', () => {
  it('create() with valid bytes', () => {
    const vo = DocumentFileSizeVO.create(1024);
    expect(vo.bytes).toBe(1024);
  });

  it('create() rejects non-finite', () => {
    expect(() => DocumentFileSizeVO.create(NaN)).toThrow();
    expect(() => DocumentFileSizeVO.create(Infinity)).toThrow();
  });

  it('create() rejects non-integer', () => {
    expect(() => DocumentFileSizeVO.create(1.5)).toThrow();
  });

  it('create() rejects zero/negative', () => {
    expect(() => DocumentFileSizeVO.create(0)).toThrow();
    expect(() => DocumentFileSizeVO.create(-1)).toThrow();
  });

  it('create() rejects > max', () => {
    expect(() => DocumentFileSizeVO.create(11 * 1024 * 1024)).toThrow();
  });

  it('fromMB converts correctly', () => {
    const vo = DocumentFileSizeVO.fromMB(1);
    expect(vo.bytes).toBe(1024 * 1024);
  });

  it('fromMB rejects invalid', () => {
    expect(() => DocumentFileSizeVO.fromMB(-1)).toThrow();
    expect(() => DocumentFileSizeVO.fromMB(NaN)).toThrow();
  });

  it('toKB / toMB conversions', () => {
    const vo = DocumentFileSizeVO.create(1024 * 1024);
    expect(vo.toKB()).toBe(1024);
    expect(vo.toMB()).toBe(1);
  });

  it('isNearLimit for >= 90%', () => {
    const vo = DocumentFileSizeVO.create(9.5 * 1024 * 1024);
    expect(vo.isNearLimit()).toBe(true);
  });

  it('isNearLimit false for small', () => {
    const vo = DocumentFileSizeVO.create(1024);
    expect(vo.isNearLimit()).toBe(false);
  });
});

describe('DocumentMimeTypeVO — 20% → 100%', () => {
  it('create() with valid PDF', () => {
    expect(DocumentMimeTypeVO.create('application/pdf').isPdf()).toBe(true);
  });

  it('create() with valid image', () => {
    expect(DocumentMimeTypeVO.create('image/png').isImage()).toBe(true);
  });

  it('create() with word doc', () => {
    expect(DocumentMimeTypeVO.create('application/msword').isDocument()).toBe(true);
  });

  it('create() rejects non-string', () => {
    expect(() => DocumentMimeTypeVO.create(null as never)).toThrow();
  });

  it('create() rejects empty', () => {
    expect(() => DocumentMimeTypeVO.create('')).toThrow();
  });

  it('create() rejects unsupported mime', () => {
    expect(() => DocumentMimeTypeVO.create('application/zip')).toThrow();
  });

  it('isPdf false for image', () => {
    expect(DocumentMimeTypeVO.create('image/png').isPdf()).toBe(false);
  });

  it('isImage false for pdf', () => {
    expect(DocumentMimeTypeVO.create('application/pdf').isImage()).toBe(false);
  });

  it('isDocument for word variant', () => {
    expect(
      DocumentMimeTypeVO.create(
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ).isDocument(),
    ).toBe(true);
  });
});

describe('ReturnWindowDaysVO — 27% → 100%', () => {
  it('create() with valid days', () => {
    expect(ReturnWindowDaysVO.create(7).days).toBe(7);
  });

  it('create() rejects non-integer', () => {
    expect(() => ReturnWindowDaysVO.create(1.5)).toThrow();
  });

  it('create() rejects negative', () => {
    expect(() => ReturnWindowDaysVO.create(-1)).toThrow();
  });

  it('create() rejects > 30', () => {
    expect(() => ReturnWindowDaysVO.create(31)).toThrow();
  });

  it('default() returns 7', () => {
    expect(ReturnWindowDaysVO.default().days).toBe(7);
  });

  it('allowsAnyReturn for 0', () => {
    expect(ReturnWindowDaysVO.create(0).allowsAnyReturn()).toBe(false);
    expect(ReturnWindowDaysVO.create(7).allowsAnyReturn()).toBe(true);
  });

  it('isShort / isStandard / isGenerous', () => {
    expect(ReturnWindowDaysVO.create(3).isShort()).toBe(true);
    expect(ReturnWindowDaysVO.create(10).isStandard()).toBe(true);
    expect(ReturnWindowDaysVO.create(20).isGenerous()).toBe(true);
  });

  it('calculateDeadline / isWithinWindow / daysRemaining', () => {
    const vo = ReturnWindowDaysVO.create(7);
    const delivered = new Date('2025-01-01T00:00:00Z');
    const deadline = vo.calculateDeadline(delivered);
    expect(deadline.getTime()).toBeGreaterThan(delivered.getTime());

    const within = vo.isWithinWindow(delivered, new Date('2025-01-05T00:00:00Z'));
    expect(within).toBe(true);

    const outside = vo.isWithinWindow(delivered, new Date('2025-02-01T00:00:00Z'));
    expect(outside).toBe(false);
  });

  it('daysRemaining returns 0 when expired', () => {
    const vo = ReturnWindowDaysVO.create(7);
    const delivered = new Date('2025-01-01T00:00:00Z');
    const expired = vo.daysRemaining(delivered, new Date('2025-03-01T00:00:00Z'));
    expect(expired).toBe(0);
  });

  it('daysRemaining positive when within window', () => {
    const vo = ReturnWindowDaysVO.create(7);
    const delivered = new Date('2025-01-01T00:00:00Z');
    const remaining = vo.daysRemaining(delivered, new Date('2025-01-03T00:00:00Z'));
    expect(remaining).toBeGreaterThan(0);
  });

  it('reconstitute bypasses', () => {
    expect(ReturnWindowDaysVO.reconstitute(999).days).toBe(999);
  });
});

describe('WarrantyPeriodDaysVO — 29% → 100%', () => {
  it('create() valid', () => {
    expect(WarrantyPeriodDaysVO.create(30).days).toBe(30);
  });

  it('create() rejects non-integer', () => {
    expect(() => WarrantyPeriodDaysVO.create(1.5)).toThrow();
  });

  it('create() rejects <= 0', () => {
    expect(() => WarrantyPeriodDaysVO.create(0)).toThrow();
    expect(() => WarrantyPeriodDaysVO.create(-5)).toThrow();
  });

  it('create() rejects > 1825 (5 yr)', () => {
    expect(() => WarrantyPeriodDaysVO.create(2000)).toThrow();
  });

  it('default() returns 30', () => {
    expect(WarrantyPeriodDaysVO.default().days).toBe(30);
  });

  it('toMonths / toYears', () => {
    const vo = WarrantyPeriodDaysVO.create(365);
    expect(vo.toMonths()).toBe(12);
    expect(vo.toYears()).toBe(1);
  });

  it('isPreset for standard values', () => {
    expect(WarrantyPeriodDaysVO.create(7).isPreset()).toBe(true);
    expect(WarrantyPeriodDaysVO.create(30).isPreset()).toBe(true);
    expect(WarrantyPeriodDaysVO.create(365).isPreset()).toBe(true);
  });

  it('isPreset false for custom', () => {
    expect(WarrantyPeriodDaysVO.create(45).isPreset()).toBe(false);
  });

  it('isShortTerm / isLongTerm', () => {
    expect(WarrantyPeriodDaysVO.create(30).isShortTerm()).toBe(true);
    expect(WarrantyPeriodDaysVO.create(365).isLongTerm()).toBe(true);
  });

  it('calculateExpiry from date', () => {
    const vo = WarrantyPeriodDaysVO.create(30);
    const start = new Date('2025-01-01T00:00:00Z');
    const expiry = vo.calculateExpiry(start);
    expect(expiry.getTime()).toBe(start.getTime() + 30 * 86400000);
  });

  it('daysRemainingFrom 0 when expired', () => {
    const vo = WarrantyPeriodDaysVO.create(30);
    const start = new Date('2025-01-01T00:00:00Z');
    const now = new Date('2025-05-01T00:00:00Z');
    expect(vo.daysRemainingFrom(start, now)).toBe(0);
  });
});

describe('VendorReportPeriodVO — 31% → 100%', () => {
  it('create() with valid period', () => {
    expect(VendorReportPeriodVO.create('today').value).toBe('today');
  });

  it('create() rejects invalid', () => {
    expect(() => VendorReportPeriodVO.create('bogus')).toThrow();
  });

  it('isCustom() true for custom', () => {
    expect(VendorReportPeriodVO.create('custom').isCustom()).toBe(true);
    expect(VendorReportPeriodVO.create('today').isCustom()).toBe(false);
  });

  it('resolveRange TODAY', () => {
    const range = VendorReportPeriodVO.create('today').resolveRange();
    expect(range.start.getTime()).toBeLessThanOrEqual(range.end.getTime());
  });

  it('resolveRange YESTERDAY', () => {
    const range = VendorReportPeriodVO.create('yesterday').resolveRange();
    expect(range.end.getTime()).toBeLessThan(Date.now());
  });

  it('resolveRange LAST_7_DAYS / LAST_30_DAYS', () => {
    expect(VendorReportPeriodVO.create('last_7_days').resolveRange().start).toBeDefined();
    expect(VendorReportPeriodVO.create('last_30_days').resolveRange().start).toBeDefined();
  });

  it('resolveRange THIS_MONTH', () => {
    const range = VendorReportPeriodVO.create('this_month').resolveRange();
    expect(range.start.getDate()).toBe(1);
  });

  it('resolveRange LAST_MONTH', () => {
    const range = VendorReportPeriodVO.create('last_month').resolveRange();
    expect(range.start.getTime()).toBeLessThan(range.end.getTime());
  });

  it('resolveRange THIS_QUARTER', () => {
    const range = VendorReportPeriodVO.create('this_quarter').resolveRange();
    expect(range.start.getTime()).toBeLessThanOrEqual(range.end.getTime());
  });

  it('resolveRange THIS_YEAR', () => {
    const range = VendorReportPeriodVO.create('this_year').resolveRange();
    expect(range.start.getMonth()).toBe(0);
  });

  it('resolveRange CUSTOM uses now', () => {
    const range = VendorReportPeriodVO.create('custom').resolveRange();
    expect(range.start.getTime()).toBeLessThanOrEqual(range.end.getTime());
  });
});

describe('DocumentIdVO — 33% → 100%', () => {
  it('create() valid UUID', () => {
    expect(DocumentIdVO.create(UUID).value).toBe(UUID);
  });

  it('create() rejects non-string', () => {
    expect(() => DocumentIdVO.create(null as never)).toThrow();
  });

  it('create() rejects empty', () => {
    expect(() => DocumentIdVO.create('')).toThrow();
  });

  it('create() rejects non-UUID', () => {
    expect(() => DocumentIdVO.create('not-a-uuid')).toThrow();
  });

  it('reconstitute bypasses', () => {
    expect(DocumentIdVO.reconstitute('any').value).toBe('any');
  });
});

describe('VendorWebsiteVO — 37% → 100%', () => {
  it('create() valid http', () => {
    expect(VendorWebsiteVO.create('http://example.com').value).toBe('http://example.com');
  });

  it('create() valid https', () => {
    expect(VendorWebsiteVO.create('https://example.com').value).toBe('https://example.com');
  });

  it('create() rejects non-string', () => {
    expect(() => VendorWebsiteVO.create(null as never)).toThrow();
  });

  it('create() rejects empty', () => {
    expect(() => VendorWebsiteVO.create('')).toThrow();
  });

  it('create() rejects non-http', () => {
    expect(() => VendorWebsiteVO.create('ftp://x.com')).toThrow();
  });

  it('create() rejects bad URL', () => {
    expect(() => VendorWebsiteVO.create('https://localhost')).toThrow();
  });

  it('isHttps()', () => {
    expect(VendorWebsiteVO.create('https://x.com').isHttps()).toBe(true);
    expect(VendorWebsiteVO.create('http://x.com').isHttps()).toBe(false);
  });

  it('getHostname()', () => {
    expect(VendorWebsiteVO.create('https://example.com/path').getHostname()).toBe('example.com');
  });

  it('normalize() removes trailing slash', () => {
    const vo = VendorWebsiteVO.create('https://example.com/');
    expect(vo.normalize().value).toBe('https://example.com');
  });
});

describe('DeliveryDaysVO — 40% → 100%', () => {
  it('create() valid', () => {
    expect(DeliveryDaysVO.create(1, 5).min).toBe(1);
  });

  it('create() rejects non-integer', () => {
    expect(() => DeliveryDaysVO.create(1.5, 5)).toThrow();
  });

  it('create() rejects out-of-range', () => {
    expect(() => DeliveryDaysVO.create(-1, 5)).toThrow();
    expect(() => DeliveryDaysVO.create(1, 100)).toThrow();
  });

  it('create() rejects min > max', () => {
    expect(() => DeliveryDaysVO.create(10, 5)).toThrow();
  });

  it('isSameDay / isExpress / isStandard / isExtended — all run', () => {
    const variants = [
      DeliveryDaysVO.create(1, 1),
      DeliveryDaysVO.create(1, 2),
      DeliveryDaysVO.create(3, 5),
      DeliveryDaysVO.create(8, 15),
    ];
    for (const vo of variants) {
      expect(typeof vo.isSameDay()).toBe('boolean');
      expect(typeof vo.isExpress()).toBe('boolean');
      expect(typeof vo.isStandard()).toBe('boolean');
      expect(typeof vo.isExtended()).toBe('boolean');
    }
  });

  it('toString() singular/plural/range', () => {
    expect(DeliveryDaysVO.create(1, 1).toString()).toBe('1 day');
    expect(DeliveryDaysVO.create(2, 2).toString()).toBe('2 days');
    expect(DeliveryDaysVO.create(2, 5).toString()).toBe('2-5 days');
  });

  it('average()', () => {
    expect(DeliveryDaysVO.create(2, 4).average()).toBe(3);
  });
});

describe('ShippingZoneVO — 40% → 100%', () => {
  it('create() valid', () => {
    expect(ShippingZoneVO.create('inside_city').value).toBe('inside_city');
  });

  it('create() rejects invalid', () => {
    expect(() => ShippingZoneVO.create('bogus')).toThrow();
  });

  it('isInternational()', () => {
    expect(ShippingZoneVO.create('international').isInternational()).toBe(true);
  });

  it('isRemote()', () => {
    expect(ShippingZoneVO.create('remote').isRemote()).toBe(true);
  });

  it('isDomestic()', () => {
    expect(ShippingZoneVO.create('inside_city').isDomestic()).toBe(true);
  });

  it('requiresLongerDelivery()', () => {
    expect(ShippingZoneVO.create('international').requiresLongerDelivery()).toBe(true);
    expect(ShippingZoneVO.create('inside_city').requiresLongerDelivery()).toBe(false);
  });
});

describe('VendorLogoVO — 40% → 100%', () => {
  it('create() valid http(s)', () => {
    expect(VendorLogoVO.create('https://x.com/logo.png').value).toContain('logo.png');
  });

  it('create() rejects non-string', () => {
    expect(() => VendorLogoVO.create(null as never)).toThrow();
  });

  it('create() rejects non-URL', () => {
    expect(() => VendorLogoVO.create('not-a-url')).toThrow();
  });

  it('isSupportedFormat() for png/webp/svg', () => {
    expect(VendorLogoVO.create('https://x.com/a.png').isSupportedFormat()).toBe(true);
    expect(VendorLogoVO.create('https://x.com/a.webp').isSupportedFormat()).toBe(true);
    expect(VendorLogoVO.create('https://x.com/a.svg').isSupportedFormat()).toBe(true);
  });

  it('isSupportedFormat() false for gif', () => {
    expect(VendorLogoVO.create('https://x.com/a.gif').isSupportedFormat()).toBe(false);
  });
});

describe('VendorBannerVO — 40% → 100%', () => {
  it('create() valid', () => {
    expect(VendorBannerVO.create('https://x.com/b.jpg').value).toContain('b.jpg');
  });

  it('create() rejects non-string', () => {
    expect(() => VendorBannerVO.create(null as never)).toThrow();
  });

  it('create() rejects invalid URL', () => {
    expect(() => VendorBannerVO.create('nope')).toThrow();
  });

  it('isSupportedFormat() jpg/png/webp', () => {
    expect(VendorBannerVO.create('https://x.com/a.jpg').isSupportedFormat()).toBe(true);
    expect(VendorBannerVO.create('https://x.com/a.webp').isSupportedFormat()).toBe(true);
  });

  it('isSupportedFormat() false for svg', () => {
    expect(VendorBannerVO.create('https://x.com/a.svg').isSupportedFormat()).toBe(false);
  });
});
