# 🏗️ Architecture Documentation

Detailed architecture documentation, diagrams, and decision records.

## 📋 Contents

This folder will contain:

- **Architecture Decision Records (ADRs)** — why we chose X over Y
- **Sequence diagrams** — request flows, saga orchestrations
- **Component diagrams** — module relationships
- **Data flow diagrams** — event publishing, queue processing

## 🎯 Current Architecture

For a complete architecture overview, see [`../../ARCHITECTURE.md`](../../ARCHITECTURE.md).

## 📐 Layer Summary

| Layer | Files | LOC | Tests |
|-------|-------|-----|-------|
| Domain | 185 | ~14K | 1839 |
| Application | ~325 | ~8.7K | 442 |
| Infrastructure | 188 | ~11K | 1443 |
| Interfaces | ~86 | ~6K | 298 |
| Modules | ~76 | ~2K | 140 |
| **Total** | **~860** | **~42K** | **~4162** |

## 🔗 Related Documents

- [`../../ARCHITECTURE.md`](../../ARCHITECTURE.md) — main architecture guide
- [`../api/README.md`](../api/README.md) — API design patterns

## 🎯 Coming Soon

- C4 diagrams (context, container, component, code)
- Event flow diagrams (saga orchestration)
- State machine diagrams (notification lifecycle, schedule, broadcast)
