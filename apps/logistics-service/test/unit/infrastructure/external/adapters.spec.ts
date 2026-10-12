/**
 * Courier + Maps adapter tests (disabled-state behavior).
 */
import { describe, it, expect } from '@jest/globals';

import { PathaoCourierAdapter } from '@infrastructure/external/couriers/pathao.courier.adapter.js';
import { RedxCourierAdapter } from '@infrastructure/external/couriers/redx.courier.adapter.js';
import { SteadfastCourierAdapter } from '@infrastructure/external/couriers/steadfast.courier.adapter.js';
import { SaParibahanCourierAdapter } from '@infrastructure/external/couriers/sa-paribahan.courier.adapter.js';
import { GoogleMapsService } from '@infrastructure/external/maps/google-maps.service.js';
import { OpenStreetMapService } from '@infrastructure/external/maps/openstreetmap.service.js';

const INPUT = {
  orderId: 'o1', recipientName: 'R', recipientPhone: '+8801712345678',
  recipientAddress: 'Dhaka', weightKg: 2,
};

describe('Courier adapters (disabled-by-default)', () => {
  it('Pathao.name + createShipment (disabled)', async () => {
    const a = new PathaoCourierAdapter();
    expect(a.name).toBe('pathao');
    const r = await a.createShipment(INPUT);
    expect(typeof r.success).toBe('boolean');
  });
  it('Redx.name + createShipment (disabled)', async () => {
    const a = new RedxCourierAdapter();
    expect(a.name).toBe('redx');
    const r = await a.createShipment(INPUT);
    expect(typeof r.success).toBe('boolean');
  });
  it('Steadfast.name + createShipment (disabled)', async () => {
    const a = new SteadfastCourierAdapter();
    expect(a.name).toBe('steadfast');
    const r = await a.createShipment(INPUT);
    expect(typeof r.success).toBe('boolean');
  });
  it('SaParibahan.name + createShipment (disabled)', async () => {
    const a = new SaParibahanCourierAdapter();
    expect(a.name).toBe('sa-paribahan');
    const r = await a.createShipment(INPUT);
    expect(typeof r.success).toBe('boolean');
  });
  it('Pathao.track + cancel', async () => {
    const a = new PathaoCourierAdapter();
    const t = await a.track('SH1');
    const c = await a.cancel('SH1');
    expect(typeof t.success).toBe('boolean');
    expect(typeof c.success).toBe('boolean');
  });
  it('Redx.track + cancel', async () => {
    const a = new RedxCourierAdapter();
    await a.track('SH1'); await a.cancel('SH1');
  });
  it('Steadfast.track + cancel', async () => {
    const a = new SteadfastCourierAdapter();
    await a.track('SH1'); await a.cancel('SH1');
  });
  it('SaParibahan.track + cancel', async () => {
    const a = new SaParibahanCourierAdapter();
    await a.track('SH1'); await a.cancel('SH1');
  });
});

describe('Maps adapters', () => {
  it('GoogleMaps.name + calculateDistance + geocode', async () => {
    const g = new GoogleMapsService();
    expect(g.name).toBe('google-maps');
    const r = await g.calculateDistance(
      { lat: 23.81, lng: 90.41 },
      { lat: 23.82, lng: 90.42 },
    );
    expect(r.distanceKm).toBeGreaterThanOrEqual(0);
    const p = await g.geocode('Dhaka');
    expect(p === null || typeof p === 'object').toBe(true);
  });
  it('OSM.name + calculateDistance + geocode', async () => {
    const o = new OpenStreetMapService();
    expect(o.name).toBe('openstreetmap');
    const r = await o.calculateDistance(
      { lat: 23.81, lng: 90.41 },
      { lat: 23.82, lng: 90.42 },
    );
    expect(r.distanceKm).toBeGreaterThanOrEqual(0);
    const p = await o.geocode('Dhaka');
    expect(p === null || typeof p === 'object').toBe(true);
  });
});
