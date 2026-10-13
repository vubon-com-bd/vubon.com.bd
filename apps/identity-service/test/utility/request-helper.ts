import supertest from 'supertest';
import { INestApplication } from '@nestjs/common';
import { getTestApp, closeTestApp } from './test-app';

let app: INestApplication | undefined;
let token: string | null = null;
let initPromise: Promise<void> | null = null;

async function ensureApp(){ if(!app){ app = await getTestApp(); } return app; }
export function getAuthToken(){ return token; }

async function init(){
  if(token) return;
  if(initPromise) return initPromise;
  initPromise = (async () => {
    await ensureApp();
    const creds = { email: 'admin@example.com', password: 'Test@1234', role: 'admin', name: 'Admin User' };
    await supertest(app!.getHttpServer()).post('/auth/register').send(creds).catch(()=>undefined);
    const loginRes = await supertest(app!.getHttpServer()).post('/auth/login').send({ email: creds.email, password: creds.password });
    if(loginRes.status === 200 || loginRes.status === 201){
      token = loginRes.body?.access_token || loginRes.body?.token || null;
    }
  })();
  await initPromise;
}
async function close(){ await closeTestApp(); app = undefined; token = null; initPromise = null; }
function authHeaders(){ return token ? { Authorization: `Bearer ${token}` } : {}; }
export const requestHelper: any = {
  init,
  close,
  getAuthToken,
  get: async (p:string)=> { await init(); return supertest((await ensureApp()).getHttpServer()).get(p).set(authHeaders()); },
  post: async (p:string,b:any)=> { await init(); return supertest((await ensureApp()).getHttpServer()).post(p).set(authHeaders()).send(b); },
  put: async (p:string,b:any)=> { await init(); return supertest((await ensureApp()).getHttpServer()).put(p).set(authHeaders()).send(b); },
  delete: async (p:string)=> { await init(); return supertest((await ensureApp()).getHttpServer()).delete(p).set(authHeaders()); },
};
