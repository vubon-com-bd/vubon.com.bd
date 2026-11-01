# Architecture Diagrams

Place architecture diagrams here (PNG/SVG/Mermaid).

## Recommended Diagrams

1. **High-level** — 5-layer overview
2. **Domain** — Entities + VOs + Aggregates
3. **Application** — CQRS flow + Sagas
4. **Infrastructure** — Persistence + Queue + Cache
5. **Request flow** — Request → Controller → Service → Repo → DB
6. **Database** — ER diagram (12 tables)

## Mermaid Example

\`\`\`mermaid
graph TD
  A[Client] --> B[Controller]
  B --> C[Guard]
  C --> D[Interceptor]
  D --> E[Service]
  E --> F[Repository]
  F --> G[(DB)]
\`\`\`
