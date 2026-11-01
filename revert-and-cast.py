#!/usr/bin/env python3
"""
Fix jest.fn() with proper `as jest.Mock` cast (no `any`).

Transforms:
  jest.fn<(...args: unknown[]) => unknown>()   ->  jest.fn() as jest.Mock
  jest.fn()                                     ->  jest.fn() as jest.Mock
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

# Order matters: first fix generic version, then bare jest.fn()
PATTERNS = [
    (re.compile(r"jest\.fn<\(\.\.\.args: unknown\[\]\) => unknown>\(\)"),
     "jest.fn() as jest.Mock"),
    (re.compile(r"\bjest\.fn\(\)(?!\s+as\s)"),
     "jest.fn() as jest.Mock"),
]


def process_file(file_path: Path) -> int:
    try:
        content = file_path.read_text(encoding="utf-8")
    except Exception:
        return 0

    total_changes = 0
    for regex, replacement in PATTERNS:
        matches = regex.findall(content)
        if matches:
            content = regex.sub(replacement, content)
            total_changes += len(matches)

    if total_changes > 0:
        file_path.write_text(content, encoding="utf-8")
    return total_changes


def main():
    print(f"🔧 Reverting generics → 'as jest.Mock'")
    print(f"📁 {SRC_DIR}")
    print()

    total_files = 0
    total_changes = 0

    for ts_file in SRC_DIR.rglob("*.spec.ts"):
        changes = process_file(ts_file)
        if changes > 0:
            total_files += 1
            total_changes += changes

    print(f"📊 Files modified: {total_files}")
    print(f"📊 jest.fn() fixed: {total_changes}")


if __name__ == "__main__":
    main()
