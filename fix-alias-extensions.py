#!/usr/bin/env python3
"""
Remove .js extensions from ALIAS imports (e.g. @application/..., @domain/...).

Alias imports must NOT have .js extension because they are resolved by
TypeScript `paths` config, not by Node ESM resolver.

  '@application/commands/user.js'  ->  '@application/commands/user'
  '../../interfaces/foo.js'         ->  '../../interfaces/foo.js'  (keep)
"""

import re
import sys
from pathlib import Path

ROOT = Path.home() / "vubon.com.bd"
PACKAGE = sys.argv[1] if len(sys.argv) > 1 else "apps/user-service"
SRC_DIR = ROOT / PACKAGE / "src"

if not SRC_DIR.exists():
    print(f"❌ Not found: {SRC_DIR}")
    sys.exit(1)

# Match: from '@alias/...js'  or  from '@alias/...js"
ALIAS_IMPORT_RE = re.compile(
    r"""(from\s+['"])(@[^'"]+?)\.js(['"])"""
)


def process_file(file_path: Path) -> int:
    try:
        content = file_path.read_text(encoding="utf-8")
    except Exception as e:
        print(f"  ⚠️  {file_path}: {e}")
        return 0

    changes = [0]

    def replacer(match):
        prefix = match.group(1)   # from '
        alias_path = match.group(2)  # @application/...
        quote = match.group(3)    # '
        changes[0] += 1
        return f"{prefix}{alias_path}{quote}"

    new_content = ALIAS_IMPORT_RE.sub(replacer, content)

    if changes[0] > 0:
        file_path.write_text(new_content, encoding="utf-8")
        return changes[0]
    return 0


def main():
    print("═" * 60)
    print(f"🔧 Removing .js from alias imports")
    print(f"📁 Target: {SRC_DIR}")
    print("═" * 60)
    print()

    total_files = 0
    total_changes = 0

    for ts_file in SRC_DIR.rglob("*.ts"):
        if ts_file.name.endswith(".d.ts"):
            continue

        changes = process_file(ts_file)
        if changes > 0:
            rel = ts_file.relative_to(ROOT)
            print(f"  ✅ {rel}: {changes}")
            total_files += 1
            total_changes += changes

    print()
    print("═" * 60)
    print(f"📊 Files modified: {total_files}")
    print(f"📊 Alias imports fixed: {total_changes}")
    print("═" * 60)


if __name__ == "__main__":
    main()
