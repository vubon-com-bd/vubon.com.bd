import { ModelVersionVO } from '../value-objects/primitives/model-version.vo';

export class ModelVersioningService {
  /**
   * Determine if newVersion is a major/minor/patch bump from current.
   */
  compare(current: ModelVersionVO, next: ModelVersionVO): 'major' | 'minor' | 'patch' | 'none' {
    if (current.major !== next.major) return 'major';
    if (current.minor !== next.minor) return 'minor';
    if (current.patch !== next.patch) return 'patch';
    return 'none';
  }

  /**
   * Compute next patch version.
   */
  bumpPatch(version: ModelVersionVO): ModelVersionVO {
    return ModelVersionVO.create(`${version.major}.${version.minor}.${version.patch + 1}`);
  }

  bumpMinor(version: ModelVersionVO): ModelVersionVO {
    return ModelVersionVO.create(`${version.major}.${version.minor + 1}.0`);
  }

  bumpMajor(version: ModelVersionVO): ModelVersionVO {
    return ModelVersionVO.create(`${version.major + 1}.0.0`);
  }

  isNewer(current: ModelVersionVO, candidate: ModelVersionVO): boolean {
    if (candidate.major !== current.major) return candidate.major > current.major;
    if (candidate.minor !== current.minor) return candidate.minor > current.minor;
    return candidate.patch > current.patch;
  }
}
