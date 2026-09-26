// ═══════════════════════════════════════════════════════
// Interfaces Layer — Root Barrel Export
// ═══════════════════════════════════════════════════════

// Controllers
export * from './controllers/rest';
// GraphQL resolvers are optional — uncomment if @nestjs/graphql is used
// export * from './controllers/graphql';

// DTOs
export * from './dtos/requests';
export * from './dtos/responses';

// Guards
export * from './guards';

// Interceptors
export * from './interceptors';

// Decorators
export * from './decorators';

// Mappers
export * from './mappers';

// Validators
export * from './validators';

// Middlewares
export * from './middlewares';

// Swagger
export * from './swagger';
