import {
  VENDOR_REPORT_EVENT_TYPE,
  VendorReportRequestedEvent,
  VendorReportGenerationStartedEvent,
  VendorReportReadyEvent,
  VendorReportFailedEvent,
  VendorReportExpiredEvent,
  VendorReportDownloadedEvent,
} from '../../../../src/module/domain/events/vendor-report.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';
const FUTURE = '2026-02-01T00:00:00.000Z';

describe('Vendor report events', () => {
  it('constants defined', () => {
    expect(VENDOR_REPORT_EVENT_TYPE.REQUESTED).toBe('vendor.report.requested');
    expect(VENDOR_REPORT_EVENT_TYPE.READY).toBe('vendor.report.ready');
  });

  it('VendorReportRequestedEvent', () => {
    const e = new VendorReportRequestedEvent({
      aggregateId: UUID,
      payload: {
        reportId: UUID, vendorId: UUID,
        type: 'sales', format: 'pdf',
        periodStart: NOW, periodEnd: FUTURE, requestedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.report.requested');
    expect(e.aggregateType).toBe('VendorReport');
  });

  it('VendorReportGenerationStartedEvent', () => {
    const e = new VendorReportGenerationStartedEvent({
      aggregateId: UUID,
      payload: { reportId: UUID, vendorId: UUID, startedAt: NOW },
    });
    expect(e.type).toBe('vendor.report.generation_started');
  });

  it('VendorReportReadyEvent', () => {
    const e = new VendorReportReadyEvent({
      aggregateId: UUID,
      payload: {
        reportId: UUID, vendorId: UUID,
        fileUrl: 'https://cdn.example.com/report.pdf',
        fileSize: 1024, expiresAt: FUTURE, readyAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.report.ready');
  });

  it('VendorReportFailedEvent', () => {
    const e = new VendorReportFailedEvent({
      aggregateId: UUID,
      payload: { reportId: UUID, vendorId: UUID, reason: 'db timeout', failedAt: NOW },
    });
    expect(e.type).toBe('vendor.report.failed');
  });

  it('VendorReportExpiredEvent', () => {
    const e = new VendorReportExpiredEvent({
      aggregateId: UUID,
      payload: { reportId: UUID, vendorId: UUID, expiredAt: NOW },
    });
    expect(e.type).toBe('vendor.report.expired');
  });

  it('VendorReportDownloadedEvent', () => {
    const e = new VendorReportDownloadedEvent({
      aggregateId: UUID,
      payload: {
        reportId: UUID, vendorId: UUID,
        downloadedBy: UUID, downloadedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.report.downloaded');
  });
});
