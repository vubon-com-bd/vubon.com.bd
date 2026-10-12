import {
  VENDOR_STATS_EVENT_TYPE,
  VendorStatsSnapshotCreatedEvent,
  VendorStatsOrderRecordedEvent,
  VendorStatsRefundRecordedEvent,
  VendorStatsCancellationRecordedEvent,
  VendorStatsPayoutRecordedEvent,
} from '../../../../src/module/domain/events/vendor-stats.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';
const END = '2026-01-31T00:00:00.000Z';

describe('Vendor stats events', () => {
  it('constants defined', () => {
    expect(VENDOR_STATS_EVENT_TYPE.SNAPSHOT_CREATED).toBe('vendor.stats.snapshot_created');
    expect(VENDOR_STATS_EVENT_TYPE.ORDER_RECORDED).toBe('vendor.stats.order_recorded');
  });

  it('VendorStatsSnapshotCreatedEvent', () => {
    const e = new VendorStatsSnapshotCreatedEvent({
      aggregateId: UUID,
      payload: {
        statsId: UUID, vendorId: UUID,
        periodStart: NOW, periodEnd: END, currency: 'BDT', createdAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.stats.snapshot_created');
    expect(e.aggregateType).toBe('VendorStats');
  });

  it('VendorStatsOrderRecordedEvent', () => {
    const e = new VendorStatsOrderRecordedEvent({
      aggregateId: UUID,
      payload: {
        statsId: UUID, vendorId: UUID,
        amount: 1000, totalOrders: 1, totalRevenue: 1000, recordedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.stats.order_recorded');
  });

  it('VendorStatsRefundRecordedEvent', () => {
    const e = new VendorStatsRefundRecordedEvent({
      aggregateId: UUID,
      payload: {
        statsId: UUID, vendorId: UUID,
        amount: 100, totalRefunds: 100, recordedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.stats.refund_recorded');
  });

  it('VendorStatsCancellationRecordedEvent', () => {
    const e = new VendorStatsCancellationRecordedEvent({
      aggregateId: UUID,
      payload: {
        statsId: UUID, vendorId: UUID,
        totalCancelled: 1, recordedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.stats.cancellation_recorded');
  });

  it('VendorStatsPayoutRecordedEvent', () => {
    const e = new VendorStatsPayoutRecordedEvent({
      aggregateId: UUID,
      payload: {
        statsId: UUID, vendorId: UUID,
        amount: 700, totalPayouts: 700, recordedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.stats.payout_recorded');
  });
});
