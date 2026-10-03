#!/usr/bin/env python3
"""
Replace jest.fn<(...args: unknown[]) => unknown>() 
     with jest.fn<(...args: any[]) => any>()
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

# Match the current generic
OLD_RE = re.compile(
    r"jest\.fn<\(\.\.\.args: unknown\[\]\) => unknown>\(\)"
)


def process_file(file_path: Path) -> int:
    try:
        content = file_path.read_text(encoding="utf-8")
    except Exception:
        return 0

    changes = [0]

    def replacer(match):
        changes[0] += 1
        return "jest.fn<(...args: any[]) => any>()"

    new_content = OLD_RE.sub(replacer, content)

    if changes[0] > 0:
        file_path.write_text(new_content, encoding="utf-8")
        return changes[0]
    return 0


def main():
    print(f"🔧 V2: unknown → any in jest.fn generics")
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
