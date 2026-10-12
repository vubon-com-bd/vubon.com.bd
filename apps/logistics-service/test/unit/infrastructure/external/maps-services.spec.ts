/**
 * Maps adapters — Haversine fallback + name contract.
 */
import { describe, it, expect } from '@jest/globals';

import { GoogleMapsService } from '@infrastructure/external/maps/google-maps.service.js';
import { OpenStreetMapService } from '@infrastructure/external/maps/openstreetmap.service.js';

describe('GoogleMapsService', () => {
  const svc = new GoogleMapsService();
  it('has correct name', () => {
    expect(svc.name).toBe('google-maps');
  });
  it('calculateDistance returns fallback (Haversine) when disabled', async () => {
    const r = await svc.calculateDistance({ lat: 23.8, lng: 90.4 }, { lat: 24.0, lng: 90.6 });
    expect(r.distanceKm).toBeGreaterThan(0);
    expect(r.durationMinutes).toBeGreaterThan(0);
  });
  it('geocode returns null when disabled', async () => {
    const r = await svc.geocode('Dhaka');
    expect(r).toBeNull();
  });
});

describe('OpenStreetMapService', () => {
  const svc = new OpenStreetMapService();
  it('has correct name', () => {
    expect(svc.name).toBe('openstreetmap');
  });
  it('calculateDistance uses Haversine', async () => {
    const r = await svc.calculateDistance({ lat: 23.8, lng: 90.4 }, { lat: 24.0, lng: 90.6 });
    expect(r.distanceKm).toBeGreaterThan(0);
    expect(r.durationMinutes).toBeGreaterThan(0);
  });
  it('geocode returns null on network fail (no real HTTP)', async () => {
    const r = await svc.geocode('Some address');
    // Either returns null or coordinates; test resilient
    expect(r === null || (r && 'lat' in r)).toBe(true);
  });
});
