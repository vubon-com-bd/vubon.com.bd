/**
 * Bulk Prisma mappers — Suspension, SuspensionLog, TeamMember, TeamInvite
 */
import { VendorSuspensionPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor-suspension.prisma-mapper.js';
import { VendorSuspensionLogPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor-suspension-log.prisma-mapper.js';
import { VendorTeamMemberPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor-team-member.prisma-mapper.js';
import { VendorTeamInvitePrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor-team-invite.prisma-mapper.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date('2026-01-01T00:00:00Z');
const FUTURE = new Date('2027-01-01T00:00:00Z');

describe('VendorSuspensionPrismaMapper', () => {
  const row = {
    id: UUID, vendorId: UUID, reason: 'poor_performance',
    suspendedAt: NOW, suspendedBy: UUID, durationDays: 30,
    notes: null, appealDeadline: FUTURE, appealSubmittedAt: null,
    appealReason: null, liftedAt: null, liftedBy: null,
    autoLiftOnResolution: true,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;

  it('toDomain maps all fields', () => {
    const e = VendorSuspensionPrismaMapper.toDomain(row);
    expect(e.id).toBe(UUID);
    expect(e.reason.value).toBe('poor_performance');
    expect(e.durationDays).toBe(30);
  });

  it('toPersistence roundtrip', () => {
    const d = VendorSuspensionPrismaMapper.toDomain(row);
    const p = VendorSuspensionPrismaMapper.toPersistence(d);
    expect(p.id).toBe(UUID);
    expect(p.reason).toBe('poor_performance');
  });
});

describe('VendorSuspensionLogPrismaMapper', () => {
  const row = {
    id: UUID, vendorId: UUID, suspensionId: UUID,
    event: 'issued', actorId: UUID,
    reason: 'policy violation', metadata: null,
    occurredAt: NOW,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;

  it('toDomain maps all fields', () => {
    const e = VendorSuspensionLogPrismaMapper.toDomain(row);
    expect(e.id).toBe(UUID);
    expect(e.event).toBe('issued');
    expect(e.actorId).toBe(UUID);
  });

  it('toPersistence roundtrip', () => {
    const d = VendorSuspensionLogPrismaMapper.toDomain(row);
    const p = VendorSuspensionLogPrismaMapper.toPersistence(d);
    expect(p.id).toBe(UUID);
    expect(p.event).toBe('issued');
  });
});

describe('VendorTeamMemberPrismaMapper', () => {
  const row = {
    id: UUID, vendorId: UUID, userId: UUID,
    email: 'member@acme.com', name: 'Md Member',
    role: 'vendor_viewer', status: 'active',
    permissions: ['vendor:product:view'],
    joinedAt: NOW, lastActiveAt: null, invitedBy: null,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;

  it('toDomain maps all fields', () => {
    const e = VendorTeamMemberPrismaMapper.toDomain(row);
    expect(e.id).toBe(UUID);
    expect(e.email.value).toBe('member@acme.com');
    expect(e.role.value).toBe('vendor_viewer');
    expect(e.permissions).toHaveLength(1);
  });

  it('toPersistence roundtrip', () => {
    const d = VendorTeamMemberPrismaMapper.toDomain(row);
    const p = VendorTeamMemberPrismaMapper.toPersistence(d);
    expect(p.id).toBe(UUID);
    expect(p.email).toBe('member@acme.com');
  });
});

describe('VendorTeamInvitePrismaMapper', () => {
  const row = {
    id: UUID, vendorId: UUID,
    email: 'invitee@acme.com', role: 'vendor_viewer',
    status: 'pending', token: 'ABCDEFGHIJKLMNOP1234',
    invitedBy: UUID, invitedAt: NOW,
    expiresAt: FUTURE, acceptedAt: null, acceptedBy: null,
    rejectedAt: null, message: null,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;

  it('toDomain maps all fields', () => {
    const e = VendorTeamInvitePrismaMapper.toDomain(row);
    expect(e.id).toBe(UUID);
    expect(e.email.value).toBe('invitee@acme.com');
    expect(e.status.value).toBe('pending');
    expect(e.token.value).toBe('ABCDEFGHIJKLMNOP1234');
  });

  it('toPersistence roundtrip', () => {
    const d = VendorTeamInvitePrismaMapper.toDomain(row);
    const p = VendorTeamInvitePrismaMapper.toPersistence(d);
    expect(p.id).toBe(UUID);
    expect(p.email).toBe('invitee@acme.com');
  });
});
