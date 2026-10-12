import {
  VENDOR_DOCUMENT_EVENT_TYPE,
  VendorDocumentUploadedEvent,
  VendorDocumentVerifiedEvent,
  VendorDocumentRejectedEvent,
  VendorDocumentResubmittedEvent,
  VendorDocumentExpiredEvent,
  VendorDocumentDeletedEvent,
} from '../../../../src/module/domain/events/vendor-document.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

describe('Vendor document events', () => {
  it('VENDOR_DOCUMENT_EVENT_TYPE constants defined', () => {
    expect(VENDOR_DOCUMENT_EVENT_TYPE.UPLOADED).toBe('vendor.document.uploaded');
    expect(VENDOR_DOCUMENT_EVENT_TYPE.VERIFIED).toBe('vendor.document.verified');
  });

  it('VendorDocumentUploadedEvent', () => {
    const e = new VendorDocumentUploadedEvent({
      aggregateId: UUID,
      payload: {
        documentId: UUID, vendorId: UUID, type: 'business_license',
        fileName: 'license.pdf', mimeType: 'application/pdf',
        fileSize: 1024, uploadedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.document.uploaded');
    expect(e.aggregateType).toBe('VendorDocument');
  });

  it('VendorDocumentVerifiedEvent', () => {
    const e = new VendorDocumentVerifiedEvent({
      aggregateId: UUID,
      payload: { documentId: UUID, vendorId: UUID, verifiedBy: UUID, verifiedAt: NOW },
    });
    expect(e.type).toBe('vendor.document.verified');
  });

  it('VendorDocumentRejectedEvent', () => {
    const e = new VendorDocumentRejectedEvent({
      aggregateId: UUID,
      payload: { documentId: UUID, vendorId: UUID, reason: 'illegible', rejectedAt: NOW },
    });
    expect(e.type).toBe('vendor.document.rejected');
  });

  it('VendorDocumentResubmittedEvent', () => {
    const e = new VendorDocumentResubmittedEvent({
      aggregateId: UUID,
      payload: { documentId: UUID, vendorId: UUID, fileUrl: 'https://x.com/new.pdf', resubmittedAt: NOW },
    });
    expect(e.type).toBe('vendor.document.resubmitted');
  });

  it('VendorDocumentExpiredEvent', () => {
    const e = new VendorDocumentExpiredEvent({
      aggregateId: UUID,
      payload: { documentId: UUID, vendorId: UUID, expiredAt: NOW },
    });
    expect(e.type).toBe('vendor.document.expired');
  });

  it('VendorDocumentDeletedEvent', () => {
    const e = new VendorDocumentDeletedEvent({
      aggregateId: UUID,
      payload: { documentId: UUID, vendorId: UUID, deletedBy: UUID, deletedAt: NOW },
    });
    expect(e.type).toBe('vendor.document.deleted');
  });
});
