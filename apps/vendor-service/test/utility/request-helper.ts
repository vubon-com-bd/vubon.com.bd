/**
 * Request Helper — supertest wrapper with shared app + auth token
 * @module vendor-service/test/utility
 */
import supertest from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { getTestApp, closeTestApp } from './test-app.js';

let app: INestApplication | undefined;
let token: string | null = null;
let initPromise: Promise<void> | null = null;

async function ensureApp(): Promise<INestApplication> {
  if (!app) {
    app = await getTestApp();
  }
  return app;
}

export function getAuthToken(): string | null {
  return token;
}

async function init(): Promise<void> {
  if (token) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    await ensureApp();
    // Product service doesn't host auth — token stays null in degraded mode.
    // Real token can be set externally via setAuthToken().
  })();

  await initPromise;
}

export function setAuthToken(t: string | null): void {
  token = t;
}

async function close(): Promise<void> {
  await closeTestApp();
  app = undefined;
  token = null;
  initPromise = null;
}

function authHeaders(): Record<string, string> {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const requestHelper = {
  init,
  close,
  getAuthToken,
  setAuthToken,

  get: async (path: string) => {
    await init();
    const a = await ensureApp();
    return supertest(a.getHttpServer()).get(path).set(authHeaders());
  },

  post: async (path: string, body: unknown) => {
    await init();
    const a = await ensureApp();
    return supertest(a.getHttpServer()).post(path).set(authHeaders()).send(body);
  },

  put: async (path: string, body: unknown) => {
    await init();
    const a = await ensureApp();
    return supertest(a.getHttpServer()).put(path).set(authHeaders()).send(body);
  },

  patch: async (path: string, body: unknown) => {
    await init();
    const a = await ensureApp();
    return supertest(a.getHttpServer()).patch(path).set(authHeaders()).send(body);
  },

  delete: async (path: string) => {
    await init();
    const a = await ensureApp();
    return supertest(a.getHttpServer()).delete(path).set(authHeaders());
  },
};
