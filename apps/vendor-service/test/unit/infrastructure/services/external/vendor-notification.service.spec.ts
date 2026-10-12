import { VendorNotificationService } from '../../../../../src/module/infrastructure/services/external/vendor-notification.service.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('VendorNotificationService', () => {
  let service: VendorNotificationService;

  beforeEach(() => {
    service = new VendorNotificationService();
  });

  describe('send()', () => {
    it('sends without throwing', async () => {
      await expect(
        service.send({
          event: 'vendor.registered',
          vendorId: UUID,
          to: { email: 'a@b.com' },
        }),
      ).resolves.not.toThrow();
    });

    it('sends with multiple channels', async () => {
      await expect(
        service.send({
          event: 'vendor.suspended',
          vendorId: UUID,
          to: { email: 'a@b.com', phone: '+8801712345678' },
          channels: ['email', 'sms'],
        }),
      ).resolves.not.toThrow();
    });

    it('defaults to email when channels missing', async () => {
      await expect(
        service.send({
          event: 'vendor.approved',
          vendorId: UUID,
          to: { email: 'a@b.com' },
        }),
      ).resolves.not.toThrow();
    });
  });

  describe('sendBatch()', () => {
    it('sends multiple without throwing', async () => {
      await expect(
        service.sendBatch([
          { event: 'vendor.registered', vendorId: UUID, to: { email: 'a@b.com' } },
          { event: 'vendor.approved', vendorId: UUID, to: { email: 'a@b.com' } },
        ]),
      ).resolves.not.toThrow();
    });

    it('handles empty batch', async () => {
      await expect(service.sendBatch([])).resolves.not.toThrow();
    });
  });

  describe('helper methods', () => {
    it('notifyApproved works', async () => {
      await expect(service.notifyApproved(UUID, { email: 'a@b.com' })).resolves.not.toThrow();
    });

    it('notifyRejected works', async () => {
      await expect(
        service.notifyRejected(UUID, { email: 'a@b.com' }, 'incomplete'),
      ).resolves.not.toThrow();
    });

    it('notifySuspended works', async () => {
      await expect(
        service.notifySuspended(UUID, { email: 'a@b.com' }, 'policy', 30),
      ).resolves.not.toThrow();
    });

    it('notifyPayoutPaid works', async () => {
      await expect(
        service.notifyPayoutPaid(UUID, { email: 'a@b.com' }, 5000, 'BDT'),
      ).resolves.not.toThrow();
    });

    it('notifyTeamInvite works', async () => {
      await expect(
        service.notifyTeamInvite(UUID, { email: 'a@b.com' }, 'vendor_viewer', 'token-xyz'),
      ).resolves.not.toThrow();
    });
  });
});
