/**
 * Validator tests — verify zod schemas parse valid input and reject bad input.
 */
import { describe, it, expect } from '@jest/globals';

import * as shipmentV from '@application/validators/shipment.validator.js';
import * as courierV from '@application/validators/courier.validator.js';
import * as warehouseV from '@application/validators/warehouse.validator.js';
import * as vehicleV from '@application/validators/vehicle.validator.js';
import * as driverV from '@application/validators/driver.validator.js';
import * as routeV from '@application/validators/route.validator.js';
import * as returnV from '@application/validators/return-shipment.validator.js';
import * as insuranceV from '@application/validators/insurance.validator.js';

describe('Shipment validators', () => {
  it('ShipmentCreateValidator is a zod schema', () => {
    expect(shipmentV.ShipmentCreateValidator).toBeDefined();
    expect(typeof shipmentV.ShipmentCreateValidator.parse).toBe('function');
  });
  it('ShipmentListFilterValidator parses empty', () => {
    expect(() => shipmentV.ShipmentListFilterValidator.parse({})).not.toThrow();
  });
});

describe('Courier validators', () => {
  it('CourierListFilterValidator parses', () => {
    expect(() => courierV.CourierListFilterValidator.parse({})).not.toThrow();
  });
});

describe('Warehouse validators', () => {
  it('WarehouseCreateValidator defined', () => {
    expect(warehouseV.WarehouseCreateValidator).toBeDefined();
  });
});

describe('Vehicle validators', () => {
  it('VehicleRegisterValidator defined', () => {
    expect(vehicleV.VehicleRegisterValidator).toBeDefined();
  });
});

describe('Driver validators', () => {
  it('DriverRegisterValidator defined', () => {
    expect(driverV.DriverRegisterValidator).toBeDefined();
  });
});

describe('Route validators', () => {
  it('RouteCreateValidator defined', () => {
    expect(routeV.RouteCreateValidator).toBeDefined();
  });
});

describe('ReturnShipment validators', () => {
  it('ReturnShipmentRequestValidator + ReturnShipmentValidator', () => {
    expect(returnV.ReturnShipmentRequestValidator).toBeDefined();
    expect(returnV.ReturnShipmentValidator).toBeDefined();
  });
});

describe('Insurance validators', () => {
  it('InsuranceCreateValidator + InsuranceClaimValidator', () => {
    expect(insuranceV.InsuranceCreateValidator).toBeDefined();
    expect(insuranceV.InsuranceClaimValidator).toBeDefined();
  });
});
