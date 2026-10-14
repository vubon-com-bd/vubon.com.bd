# Architecture — Vendor Service

## 5 Layers

### 1. Domain (188 files)
Pure business logic. Entities, VOs, Events, Specs, Services.
No NestJS, no Prisma, no HTTP.

### 2. Application (351 files)
CQRS orchestration. Commands, Queries, Sagas, Mappers.
Imports domain only.

### 3. Infrastructure (150 files)
Adapters. Prisma, Redis, Queues, Workers, External HTTP.

### 4. Interfaces (82 files)
HTTP entry. REST controllers, GraphQL resolvers, Guards, DTOs.

### 5. Modules (131 files)
NestJS wiring. Feature modules, AppModule.

## Dependency Rules
domain -> shared-kernel only
application -> domain only
infrastructure -> domain + application interfaces
interfaces -> application + domain types
modules -> everything (wiring only)

## Pattern Rules
1. Typed errors everywhere
2. reconstitute() on every VO + Entity
3. assertInvariants() separate method
4. assertTransitionTo() for state machines
5. emitStatusChange() for state mutations
6. Rich predicates
7. Business methods on entities
8. DI tokens via Symbol()
9. Multi-shape response DTOs
10. Domain events for every change

## Stats
domain: 188 files, 21063 lines
application: 351 files, 11221 lines
infrastructure: 150 files, 10348 lines
interfaces: 82 files, 3920 lines
modules: 131 files, 1591 lines
Total: 902 files, 48143 lines
