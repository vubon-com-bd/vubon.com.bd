import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';

let app: INestApplication | undefined;
export async function getTestApp(): Promise<INestApplication>{
  if(app) return app;
  const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = moduleFixture.createNestApplication();
  await app.init();
  return app;
}
export async function closeTestApp(){ if(app){ await app.close(); app = undefined; } }
