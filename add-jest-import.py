#!/usr/bin/env python3
"""
Add `import { jest } from '@jest/globals';` to test files that use `jest.*`
but don't import it (ESM requirement).
"""

import re
import sys
from pathlib import Path

ROOT = Path.home() / "vubon.com.bd"
PACKAGE = sys.argv[1] if len(sys.argv) > 1 else "apps/auth-service"
SRC_DIR = ROOT / PACKAGE / "src"

if not SRC_DIR.exists():
    print(f"❌ Not found: {SRC_DIR}")
    sys.exit(1)

JEST_GLOBAL_RE = re.compile(r"\bjest\.")
JEST_IMPORT_RE = re.compile(r"""from\s+['"]@jest/globals['"]""")


def process_file(file_path: Path) -> bool:
    try:
        content = file_path.read_text(encoding="utf-8")
    except Exception as e:
        print(f"  ⚠️  {file_path}: {e}")
        return False

    if JEST_IMPORT_RE.search(content):
        return False

    if not JEST_GLOBAL_RE.search(content):
        return False

    lines = content.split("\n")
    insert_idx = 0

    for i, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith("import ") or stripped.startswith("from "):
            insert_idx = i
            break
        if stripped.startswith("/**") or stripped.startswith("*") or stripped.startswith("//") or stripped == "":
            continue
        insert_idx = i
        break

    new_lines = (
        lines[:insert_idx]
        + ["import { jest } from '@jest/globals';", ""]
        + lines[insert_idx:]
    )

    file_path.write_text("\n".join(new_lines), encoding="utf-8")
    return True


def main():
    print("═" * 60)
    print(f"🔧 Adding 'jest' import to test files")
    print(f"📁 Target: {SRC_DIR}")
    print("═" * 60)
    print()

    modified = 0
    for ts_file in SRC_DIR.rglob("*.spec.ts"):
        if process_file(ts_file):
            modified += 1

    print(f"📊 Files modified: {modified}")
    print("═" * 60)


if __name__ == "__main__":
    main()
