#!/usr/bin/env python3
"""
Replace any-based jest.fn generics with clean `as jest.Mock` cast (no `any`).
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

# Match current state: jest.fn<(...args: any[]) => any>()
GENERIC_RE = re.compile(
    r"jest\.fn<\(\.\.\.args: any\[\]\) => any>\(\)"
)


def process_file(file_path: Path) -> int:
    try:
        content = file_path.read_text(encoding="utf-8")
    except Exception:
        return 0

    matches = GENERIC_RE.findall(content)
    if matches:
        content = GENERIC_RE.sub("jest.fn() as jest.Mock", content)
        file_path.write_text(content, encoding="utf-8")
        return len(matches)
    return 0


def main():
    print(f"🔧 Replacing any-generics with `as jest.Mock`")
    print(f"📁 {SRC_DIR}")
    print()

    total_files = 0
    total_changes = 0

    for ts_file in SRC_DIR.rglob("*.spec.ts"):
        changes = process_file(ts_file)
        if changes > 0:
            total_files += 1
            total_changes += changes

    print(f"📊 Files: {total_files}")
    print(f"📊 Calls: {total_changes}")


if __name__ == "__main__":
    main()
