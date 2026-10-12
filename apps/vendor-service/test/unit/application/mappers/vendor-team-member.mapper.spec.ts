import { VendorTeamMemberMapper } from '../../../../src/module/application/mappers/vendor-team-member.mapper.js';
import { VendorTeamMemberEntity } from '../../../../src/module/domain/entities/vendor-team-member.entity.js';
import { MemberEmailVO } from '../../../../src/module/domain/value-objects/primitives/member-email.vo.js';
import { MemberNameVO } from '../../../../src/module/domain/value-objects/primitives/member-name.vo.js';
import { MemberRoleVO } from '../../../../src/module/domain/value-objects/primitives/member-role.vo.js';
import { MemberPermissionVO } from '../../../../src/module/domain/value-objects/primitives/member-permission.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeMember(): VendorTeamMemberEntity {
  return VendorTeamMemberEntity.create({
    id: UUID,
    now: NOW,
    props: {
      vendorId: UUID,
      userId: UUID,
      email: MemberEmailVO.create('member@acme.com'),
      name: MemberNameVO.create('Md Member'),
      role: MemberRoleVO.create('vendor_viewer'),
      permissions: [MemberPermissionVO.create('vendor:product:view')],
    },
  });
}

describe('VendorTeamMemberMapper', () => {
  it('toResponse maps all fields', () => {
    const r = VendorTeamMemberMapper.toResponse(makeMember());
    expect(r.id).toBe(UUID);
    expect(r.email).toBe('member@acme.com');
    expect(r.name).toBe('Md Member');
    expect(r.role).toBe('vendor_viewer');
    expect(r.status).toBe('active');
    expect(r.permissions).toContain('vendor:product:view');
  });

  it('toPublic maps public fields', () => {
    const r = VendorTeamMemberMapper.toPublic(makeMember());
    expect(r.userId).toBe(UUID);
    expect(r.email).toBe('member@acme.com');
  });

  it('toResponseList maps multiple', () => {
    expect(VendorTeamMemberMapper.toResponseList([makeMember()])).toHaveLength(1);
  });

  it('toPublicList maps multiple', () => {
    expect(VendorTeamMemberMapper.toPublicList([makeMember()])).toHaveLength(1);
  });
});
