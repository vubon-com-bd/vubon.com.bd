#!/usr/bin/env python3
"""
Add generic type param to jest.fn() calls in .spec.ts files.

  jest.fn()   ->  jest.fn<(...args: unknown[]) => unknown>()
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

# Match: jest.fn() that doesn't already have generic <...>
# This works for both `jest.fn()` and `jest.fn()  ` (with optional trailing spaces)
JEST_FN_RE = re.compile(r"\bjest\.fn\(\)")


def process_file(file_path: Path) -> int:
    try:
        content = file_path.read_text(encoding="utf-8")
    except Exception as e:
        return 0

    # Skip if already has generic jest.fn<...>
    if re.search(r"jest\.fn<", content):
        # Check specifically for jest.fn() without generic
        if not JEST_FN_RE.search(content):
            return 0

    changes = [0]

    def replacer(match):
        changes[0] += 1
        return "jest.fn<(...args: unknown[]) => unknown>()"

    new_content = JEST_FN_RE.sub(replacer, content)

    if changes[0] > 0:
        file_path.write_text(new_content, encoding="utf-8")
        return changes[0]
    return 0


def main():
    print(f"🔧 Fixing jest.fn() generics in {SRC_DIR}")
    print()

    total_files = 0
    total_changes = 0

    for ts_file in SRC_DIR.rglob("*.spec.ts"):
        changes = process_file(ts_file)
        if changes > 0:
            total_files += 1
            total_changes += changes

    print(f"📊 Files modified: {total_files}")
    print(f"📊 jest.fn() calls fixed: {total_changes}")


if __name__ == "__main__":
    main()
