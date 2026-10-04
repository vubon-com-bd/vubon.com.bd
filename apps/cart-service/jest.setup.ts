import 'reflect-metadata';

jest.setTimeout(30000);

beforeAll(() => {
  process.env.LOG_LEVEL = 'error';
  process.env.NODE_ENV = 'test';
});
