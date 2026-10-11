<!-- See docs/guides/TESTING.md for the full guide. -->

# Notification Service — Testing

## Test pyramid

    E2E:   19 suites / 204 tests  (~135s)
    Unit: 244 suites / 2554 tests (~100s)
    Total: 2758 tests — 94% coverage

## Commands

    # Unit tests
    NODE_OPTIONS=--experimental-vm-modules pnpm jest test/unit

    # E2E tests
    NODE_OPTIONS=--experimental-vm-modules pnpm jest --config ./test/jest-e2e.json --runInBand

    # Coverage
    NODE_OPTIONS=--experimental-vm-modules pnpm jest test/unit --coverage

    # Provider tests only
    NODE_OPTIONS=--experimental-vm-modules pnpm jest test/unit/infrastructure/providers

Note: NODE_OPTIONS=--experimental-vm-modules is required (ESM mode).

Full guide: [docs/guides/TESTING.md](docs/guides/TESTING.md)
