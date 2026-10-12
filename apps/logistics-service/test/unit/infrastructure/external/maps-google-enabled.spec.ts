/**
 * GoogleMapsService — enabled-path branch coverage.
 *
 * NOTE: ESM jest.mock on external packages is unreliable in this monorepo.
 * Real httpGet fails (no network), so we exercise the try+catch path.
 * The success-return lines remain uncovered (small drag, acceptable).
 */
import { describe, it, expect } from '@jest/globals';
import { GoogleMapsService } from '@infrastructure/external/maps/google-maps.service.js';

describe('GoogleMapsService — enabled-path branch coverage', () => {
  const svc = new GoogleMapsService();

  it('calculateDistance — API error → Haversine fallback', async () => {
    const r = await svc.calculateDistance({ lat: 23.8, lng: 90.4 }, { lat: 24.0, lng: 90.6 });
    expect(r.distanceKm).toBeGreaterThan(0);
    expect(r.durationMinutes).toBeGreaterThan(0);
  });

  it('calculateDistance — same point → zero distance', async () => {
    const r = await svc.calculateDistance({ lat: 23.8, lng: 90.4 }, { lat: 23.8, lng: 90.4 });
    expect(r.distanceKm).toBe(0);
    expect(r.durationMinutes).toBe(0);
  });

  it('geocode — API error → null', async () => {
    const r = await svc.geocode('Dhaka');
    expect(r).toBeNull();
  });

  it('geocode — empty address → null', async () => {
    const r = await svc.geocode('');
    expect(r).toBeNull();
  });
});

describe('OpenStreetMapService — enabled-path branch coverage', () => {
  it('calculateDistance falls back to Haversine', async () => {
    const { OpenStreetMapService } = await import('@infrastructure/external/maps/openstreetmap.service.js');
    const o = new OpenStreetMapService();
    const r = await o.calculateDistance({ lat: 23.8, lng: 90.4 }, { lat: 24.0, lng: 90.6 });
    expect(r.distanceKm).toBeGreaterThan(0);
  });
});
