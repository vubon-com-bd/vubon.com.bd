# Notification Service Documentation

Central hub for all docs.

## Quick Navigation

### Setup
- [Provider Setup](setup/PROVIDER-SETUP.md) — Configure Resend, SMTP, Twilio, FCM, Web Push

### Architecture
- [Architecture Overview](architecture/ARCHITECTURE.md) — Layers, data flow, aggregates
- [Glossary](architecture/GLOSSARY.md) — Domain + technical terms

### Guides
- [API Reference](guides/API-REFERENCE.md) — All HTTP endpoints
- [Local Development](guides/LOCAL-DEVELOPMENT.md) — Dev environment setup
- [Testing](guides/TESTING.md) — Unit + E2E tests
- [Deployment](guides/DEPLOYMENT.md) — Production deployment
- [Changelog](CHANGELOG.md) — Version history

## By Role

**New developer:**
1. Read [README](../README.md)
2. Read [Architecture](architecture/ARCHITECTURE.md)
3. Read [Glossary](architecture/GLOSSARY.md)
4. Set up [Local Development](guides/LOCAL-DEVELOPMENT.md)
5. Run [Tests](guides/TESTING.md)

**Integrator:**
1. Read [API Reference](guides/API-REFERENCE.md)
2. Configure [Providers](setup/PROVIDER-SETUP.md)
3. Verify [Health](../README.md#quick-start)

**Ops/DevOps:**
1. Read [Deployment](guides/DEPLOYMENT.md)
2. Set up monitoring + logs
3. Configure env vars
4. Run [Health probes](guides/API-REFERENCE.md#health)

**On-call:**
1. Check [Troubleshooting](guides/DEPLOYMENT.md#troubleshooting-deploy)
2. Read [Architecture](architecture/ARCHITECTURE.md) for mental model
3. Inspect queue depth: `redis-cli LLEN bull:email:wait`
4. Check [Provider Setup](setup/PROVIDER-SETUP.md#troubleshooting)

## By Task

| Task | Doc |
|------|-----|
| Send a notification | [API Reference](guides/API-REFERENCE.md#notifications) |
| Configure email | [Provider Setup](setup/PROVIDER-SETUP.md#email---resend-recommended) |
| Configure SMS | [Provider Setup](setup/PROVIDER-SETUP.md#sms---twilio) |
| Configure push | [Provider Setup](setup/PROVIDER-SETUP.md#push---fcm-android--web-100-free) |
| Add a new provider | [Local Development](guides/LOCAL-DEVELOPMENT.md#add-a-new-provider) |
| Fix a failing test | [Testing](guides/TESTING.md#debugging-failing-tests) |
| Deploy to production | [Deployment](guides/DEPLOYMENT.md) |
| Understand a status flow | [Architecture - State Machines](architecture/ARCHITECTURE.md#state-machines) |
| Add a domain event | [Architecture](architecture/ARCHITECTURE.md#sagas-cross-aggregate) |

## External Links

- Monorepo: https://github.com/your-org/vubon.com.bd
- Shared Kernel: `packages/shared-kernel/README.md`
- Issue Tracker: https://github.com/your-org/vubon.com.bd/issues
- Swagger UI (running service): http://localhost:4007/api/v1/docs

## Doc Maintenance

When adding/changing code:
- Update [API Reference](guides/API-REFERENCE.md) if HTTP surface changed
- Update [Architecture](architecture/ARCHITECTURE.md) if data flow changed
- Update [Glossary](architecture/GLOSSARY.md) if new term introduced
- Update [Changelog](CHANGELOG.md) for any release
- Update [Provider Setup](setup/PROVIDER-SETUP.md) if provider config changed

Keep docs close to code. Docs that lie are worse than no docs.
