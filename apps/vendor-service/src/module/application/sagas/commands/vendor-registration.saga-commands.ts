/**
 * Vendor Registration Saga Commands
 * @module vendor-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class InitializeVendorSettingsSagaCommand extends BaseSagaCommand {
  readonly type = 'vendor.saga.initialize_settings';
  constructor(
    public readonly vendorId: string,
    public readonly currency: string,
    public readonly sagaId: string,
  ) { super(); }
}

export class InitializeVendorShippingSagaCommand extends BaseSagaCommand {
  readonly type = 'vendor.saga.initialize_shipping';
  constructor(
    public readonly vendorId: string,
    public readonly sagaId: string,
  ) { super(); }
}

export class InitializeVendorReturnPolicySagaCommand extends BaseSagaCommand {
  readonly type = 'vendor.saga.initialize_return_policy';
  constructor(
    public readonly vendorId: string,
    public readonly sagaId: string,
  ) { super(); }
}

export class InitializeVendorWarrantySagaCommand extends BaseSagaCommand {
  readonly type = 'vendor.saga.initialize_warranty';
  constructor(
    public readonly vendorId: string,
    public readonly sagaId: string,
  ) { super(); }
}

export class InitializeVendorRatingSagaCommand extends BaseSagaCommand {
  readonly type = 'vendor.saga.initialize_rating';
  constructor(
    public readonly vendorId: string,
    public readonly sagaId: string,
  ) { super(); }
}
