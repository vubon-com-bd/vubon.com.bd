## 📋 Summary

<!-- Brief description of what this PR changes -->

## 🎯 Type of Change

- [ ] 🐛 Bug fix
- [ ] ✨ New feature
- [ ] 💥 Breaking change
- [ ] 📝 Documentation
- [ ] ♻️ Refactor
- [ ] 🧪 Test
- [ ] 🔧 Chore

## 📦 Affected Areas

<!-- Which packages / apps does this touch? -->

- [ ] `apps/auth-service`
- [ ] `apps/user-service`
- [ ] `packages/shared-kernel`
- [ ] `packages/shared-constants`
- [ ] `packages/shared-types`
- [ ] `packages/shared-schemas`
- [ ] `packages/shared-utils`
- [ ] `packages/shared-config`
- [ ] `packages/shared-api`
- [ ] Root configs / CI

## 🧪 Test Plan

<!-- How did you verify this change? Include commands. -->

## ✅ Checklist

- [ ] `pnpm -r run type-check` passes (or at least affected package)
- [ ] `pnpm -r run test` passes (or at least affected package)
- [ ] `pnpm -r run build` passes
- [ ] No `console.log` in production code
- [ ] No `any` types introduced
- [ ] Layer rules respected (Domain ← Application ← Infra ← Interfaces)
- [ ] Prisma schema updated (if DB changed)
- [ ] Environment variables documented (if new env vars)
- [ ] Docs updated (if behavior changed)

## 📸 Screenshots (if applicable)

## 🔗 Related Issues

Closes #
