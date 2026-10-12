/**
 * Saga commands — unit tests
 */
import {
  InitializeVendorSettingsSagaCommand,
  InitializeVendorShippingSagaCommand,
  InitializeVendorReturnPolicySagaCommand,
  InitializeVendorWarrantySagaCommand,
  InitializeVendorRatingSagaCommand,
} from '../../../../../src/module/application/sagas/commands/vendor-registration.saga-commands.js';
import {
  NotifyVendorPayoutApprovedSagaCommand,
  RecordPayoutStatsSagaCommand,
} from '../../../../../src/module/application/sagas/commands/vendor-payout.saga-commands.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('Saga commands', () => {
  it('InitializeVendorSettingsSagaCommand', () => {
    const c = new InitializeVendorSettingsSagaCommand(UUID, 'BDT', UUID);
    expect(c.vendorId).toBe(UUID);
    expect(c.currency).toBe('BDT');
    expect(c.sagaId).toBe(UUID);
    expect(c.type).toBe('vendor.saga.initialize_settings');
  });

  it('InitializeVendorShippingSagaCommand', () => {
    const c = new InitializeVendorShippingSagaCommand(UUID, UUID);
    expect(c.type).toBe('vendor.saga.initialize_shipping');
  });

  it('InitializeVendorReturnPolicySagaCommand', () => {
    const c = new InitializeVendorReturnPolicySagaCommand(UUID, UUID);
    expect(c.type).toBe('vendor.saga.initialize_return_policy');
  });

  it('InitializeVendorWarrantySagaCommand', () => {
    const c = new InitializeVendorWarrantySagaCommand(UUID, UUID);
    expect(c.type).toBe('vendor.saga.initialize_warranty');
  });

  it('InitializeVendorRatingSagaCommand', () => {
    const c = new InitializeVendorRatingSagaCommand(UUID, UUID);
    expect(c.type).toBe('vendor.saga.initialize_rating');
  });

  it('NotifyVendorPayoutApprovedSagaCommand', () => {
    const c = new NotifyVendorPayoutApprovedSagaCommand(UUID, UUID, UUID);
    expect(c.type).toBe('vendor.saga.notify_payout_approved');
  });

  it('RecordPayoutStatsSagaCommand', () => {
    const c = new RecordPayoutStatsSagaCommand(UUID, 5000, UUID);
    expect(c.type).toBe('vendor.saga.record_payout_stats');
    expect(c.amount).toBe(5000);
  });
});
