/**
 * Jest setup — loads reflect-metadata for NestJS decorators
 * @module test/unit
 */
import 'reflect-metadata';

process.env['NODE_ENV'] = 'test';
process.env['DISABLE_AUTH'] = 'true';
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';
process.env['JWT_SECRET'] = 'test-secret-minimum-32-characters-long';
