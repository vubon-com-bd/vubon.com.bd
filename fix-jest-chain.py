#!/usr/bin/env python3
"""
Fix broken pattern: jest.fn() as jest.Mock.mockXxx(...)
            to:    jest.fn().mockXxx(...) as jest.Mock
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

# Match: jest.fn() as jest.Mock.mockSomething(...)
# Capture the ".mockSomething(...)" part
BROKEN_RE = re.compile(
    r"jest\.fn\(\)\s+as\s+jest\.Mock(\.mock\w+\([^)]*\))"
)


def process_file(file_path: Path) -> int:
    try:
        content = file_path.read_text(encoding="utf-8")
    except Exception:
        return 0

    matches = BROKEN_RE.findall(content)
    if matches:
        content = BROKEN_RE.sub(r"jest.fn()\1 as jest.Mock", content)
        file_path.write_text(content, encoding="utf-8")
        return len(matches)
    return 0


def main():
    print(f"🔧 Fixing jest.fn() as jest.Mock.mockXxx() chains")
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
