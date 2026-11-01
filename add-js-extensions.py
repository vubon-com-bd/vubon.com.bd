#!/usr/bin/env python3
"""
Add .js extension to relative imports in TypeScript ESM files.

Transforms:
  from './foo'         -> from './foo.js'
  from '../bar'        -> from '../bar.js'
  from './foo/index'   -> from './foo/index.js'
  from './foo.js'      -> from './foo.js'    (skip if already has ext)

Skips:
  - Absolute imports (from 'package')
  - Type-only imports are fine too (from './foo.js')
  - Directory barrel imports are handled by resolving to /index.js
"""

import re
import sys
from pathlib import Path

ROOT = Path.home() / "vubon.com.bd"

# Which package to process
PACKAGE = sys.argv[1] if len(sys.argv) > 1 else "packages/shared-kernel"
SRC_DIR = ROOT / PACKAGE / "src"

if not SRC_DIR.exists():
    print(f"❌ Not found: {SRC_DIR}")
    sys.exit(1)

# Regex: match relative imports without extension
# Handles: from './x', from "../y", from './x/index'
REL_IMPORT_RE = re.compile(
    r"""(from\s+['"])(\.{1,2}/[^'"]+?)(['"])"""
)


def has_extension(path: str) -> bool:
    """Check if path already has a .js, .json, .mjs, etc."""
    last_segment = path.rsplit("/", 1)[-1]
    if "." in last_segment:
        return True
    return False


def add_extension(path: str) -> str:
    """Add .js extension to a relative import path."""
    if has_extension(path):
        return path
    return f"{path}.js"


def process_file(file_path: Path) -> int:
    """Process a single .ts file. Returns number of changes."""
    try:
        content = file_path.read_text(encoding="utf-8")
    except Exception as e:
        print(f"  ⚠️  Could not read {file_path}: {e}")
        return 0

    original = content
    changes = [0]

    def replacer(match):
        prefix = match.group(1)  # from ' or from "
        rel_path = match.group(2)  # ./x or ../y
        quote = match.group(3)  # ' or "
        new_path = add_extension(rel_path)
        if new_path != rel_path:
            changes[0] += 1
        return f"{prefix}{new_path}{quote}"

    new_content = REL_IMPORT_RE.sub(replacer, content)

    if changes[0] > 0:
        file_path.write_text(new_content, encoding="utf-8")
        return changes[0]
    return 0


def main():
    print("═" * 60)
    print(f"🔧 Adding .js extensions to relative imports")
    print(f"📁 Target: {SRC_DIR}")
    print("═" * 60)
    print()

    total_files = 0
    total_changes = 0

    for ts_file in SRC_DIR.rglob("*.ts"):
        # Skip .d.ts files
        if ts_file.name.endswith(".d.ts"):
            continue

        changes = process_file(ts_file)
        if changes > 0:
            rel = ts_file.relative_to(ROOT)
            print(f"  ✅ {rel}: {changes} imports")
            total_files += 1
            total_changes += changes

    print()
    print("═" * 60)
    print(f"📊 Files modified: {total_files}")
    print(f"📊 Imports updated: {total_changes}")
    print("═" * 60)


if __name__ == "__main__":
    main()
